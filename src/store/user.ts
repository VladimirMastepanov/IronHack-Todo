import { defineStore } from 'pinia'
import { supabase } from './supabase'
import { ref } from 'vue'
import type { UserDescription } from '../types/types'

const getAvatarUrl = async (avatar: File, id: string): Promise<string> => {
  const avatarExt = avatar.name.split('.').pop()
  const avatarPath = `${id}.${avatarExt}`
  const { error: avatarUploadError } = await supabase.storage
    .from('avatars')
    .upload(avatarPath, avatar)

  if (avatarUploadError) {
    throw avatarUploadError
  }

  const { data: publicData } = await supabase.storage
    .from('avatars')
    .getPublicUrl(avatarPath)
  if (!publicData?.publicUrl) {
    throw new Error('Avatar public URL not found')
  }
  return publicData.publicUrl
}

const getUserFromDb = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    throw error
  }
  return data
}

export const useUser = defineStore('user', () => {
  //STATE
  const isAuth = ref<boolean>(false)
  const user = ref<UserDescription | null>(null)
  const authError = ref<string | null>(null)

  //ACTIONS

  const getUser = async () => {
    try {
      if (user.value && isAuth.value) return true
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser()

      if (!authUser || !authUser.id || error) {
        isAuth.value = false
        user.value = null
        return false
      }
      try {
        const userFromDb = await getUserFromDb(authUser.id)
        isAuth.value = true
        user.value = userFromDb
      } catch (err) {
        isAuth.value = false
        user.value = null
        return false
      }
    } catch (err) {
      console.error('getUser error:', err)
      isAuth.value = false
      user.value = null
      return false
    }
  }

  const signUpUser = async (
    name: string,
    email: string,
    password: string,
    avatar: File | null
  ) => {
    try {
      authError.value = null
      const { data, error: signError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signError || !data.user) {
        if (signError) authError.value = signError.message
        throw signError
      }

      let avatarUrl = ''
      if (avatar) {
        avatarUrl = await getAvatarUrl(avatar, data.user.id)
      }

      const { error: uploadUserError } = await supabase.from('users').insert([
        {
          id: data.user.id,
          name,
          email,
          image: avatarUrl,
        },
      ])
      if (uploadUserError) {
        authError.value = uploadUserError.message
        throw uploadUserError
      }

      const userFromDb = await getUserFromDb(data.user.id)
      user.value = userFromDb
      isAuth.value = true
    } catch (error) {
      console.error('signUpUser error:', error)
    }
  }

  const loginUser = async (email: string, password: string) => {
    try {
      authError.value = null

      const { data: authData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })
      if (loginError || !authData.user) {
        if (loginError) authError.value = loginError.message
        throw loginError
      }

      const data = await getUserFromDb(authData.user.id)

      user.value = data
      isAuth.value = true
    } catch (err) {
      console.error('login error:', err)
    }
  }

  const logOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      isAuth.value = false
      user.value = null
    } catch (err) {
      console.error('logout user error:', err)
    }
  }

  const recoverPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://ironhack-secondproject.netlify.app/newpassword',
      })
      if (error || !data) {
        throw error
      }
    } catch (err) {
      console.error('recoverPassword error:', err)
    }
  }

  const updateUser = async (newPassword: string) => {
    authError.value = null
    try {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (!authUser || !authUser.id || error) {
        isAuth.value = false
        user.value = null
        return false
      }
      try {
        const userFromDb = await getUserFromDb(authUser.id)
        isAuth.value = true
        user.value = userFromDb
      } catch (err) {
        isAuth.value = false
        user.value = null
        return false
      }
    } catch (err) {
      console.error('updateUser error:', err)
    }
  }

  return {
    isAuth,
    user,
    authError,
    signUpUser,
    loginUser,
    logOutUser,
    getUser,
    recoverPassword,
    updateUser,
  }
})
