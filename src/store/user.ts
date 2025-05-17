import { defineStore } from "pinia";
import { supabase } from "./supabase";
import { ref } from "vue";
import type { UserDescription } from "../types/types";

export const useThemeStore = defineStore("theme", () => {
  //STATE
  const isAuth = ref<boolean>(false);
  const user = ref<UserDescription | null>(null);
  const authError = ref<string | null>(null);

  //ACTIONS

  const signUpUser = async (
    name: string,
    email: string,
    password: string,
    avatar: File
  ) => {
    try {
      authError.value = null;
      const { data, error: signError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signError || !data.user) {
        if (signError) authError.value = signError.message;
        throw signError;
      }

      const avatarExt = avatar.name.split(".").pop();
      const avatarPath = `${data.user.id}.${avatarExt}`;
      const { error: avatarUploadError } = await supabase.storage
        .from("avatars")
        .upload(avatarPath, avatar);

      if (avatarUploadError) {
        authError.value = avatarUploadError.message;
        throw avatarUploadError;
      }

      const {
        data: { publicUrl },
      } = await supabase.storage.from("avatars").getPublicUrl(avatarPath);

      const { error: uploadUserError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          name,
          email,
          image: publicUrl,
        },
      ]);
      if (uploadUserError) {
        authError.value = uploadUserError.message;
        throw uploadUserError;
      }

      user.value = {
        id: data.user.id,
        name,
        email,
        image: publicUrl,
        createdAt: data.user.created_at,
      };
      isAuth.value = true;
    } catch (error) {
      console.error("signUpUser error:", error);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      authError.value = null;

      const { data: autehntificatedUser, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (loginError || !autehntificatedUser.user) {
        if (loginError) authError.value = loginError.message;
        throw loginError;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", autehntificatedUser.user.id)
        .single();

      if (error || !data) {
        if (error) authError.value = error.message;
        throw error;
      }
      user.value = data;
      isAuth.value = true;
    } catch (err) {
      console.error("login error:", err);
    }
  };

  const logOutUser = async () => {
    try {
    const {error} = await supabase.auth.signOut(); 
    if (error) {
      throw error;
    } 
    isAuth.value = false;
    user.value = null;

    } catch (err) {
      console.error('logout user error:', err);
    }
  }

  return {
    isAuth,
    user,
    authError,
    signUpUser,
    loginUser,
    logOutUser,
  };
});
