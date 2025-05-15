<script setup lang="ts">
import Button from "../shared/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToLogin = (): void => {
  router.push("/login");
};

const navigateToSignIn = (): void => {
  router.push("/signin");
};
</script>

<template>
  <section>
    <div class="auth-main">
      <div>
        <p>Есть регистрация?</p>
        <Button @click="navigateToLogin">Login</Button>
      </div>

      <div>
        <p>Здесь первый раз?</p>
        <Button @click="navigateToSignIn">Signin</Button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auth-main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  padding: var(--space-md);
  gap: var(--space-md);
}
.auth-main div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
