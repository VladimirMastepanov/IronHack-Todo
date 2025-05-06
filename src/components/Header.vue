<script setup lang="ts">
import Button from "../shered/Button.vue";
const buttonText = 'Log out'
</script>

<template>
  <section>
    <header>
      <img src="../assets/avatar.jpg" alt="аватар" />
      <p>Tasks of Vladimir</p>
      <Button :text="buttonText" />
    </header>
  </section>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-sm);
}
img {
  width: 4rem;
  height: auto;
  border-radius: var(--radius-round);
}
p {
  font-weight: var(--font-weight-light);
}

</style>
