<script setup lang="ts">
import type { RouterLink } from "vue-router";
import Button from "../shered/Button.vue";
</script>

<template>
  <section>
    <main>
      <div class="auth-main">
        <div>
          <p>Есть регистрация?</p>
          
          <Button><router-link to="">Login</router-link></Button>
        </div>
        <div>
          <p>Здесь первый раз?</p>
          
          <Button><router-link to="">Signin</router-link></Button>
        </div>
      </div>
    </main>
  </section>
</template>

<style scoped>
main {
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: var(--radius-md);
  background-color: var(--color-tertiary);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  height: 100%;
  width: 100%;
  margin-top: var(--space-md);
}
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
