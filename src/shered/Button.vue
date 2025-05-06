<script setup lang="ts">
const props = defineProps<{
  text: string;
  rippleColor?: string;
  backgroundColor?: string;
  color?: string;
}>();

const style = {
  "--ripple-color": props.rippleColor ?? "var(--color-primary)",
  "--background-color": props.backgroundColor ?? "var(--color-on-primary)",
  "--color": props.color ?? "var(--color-primary)",
};
</script>

<template>
  <section>
    <button :style="style" v-ripple>
      {{ props.text }}
    </button>
  </section>
</template>

<style scoped>
button {
  border: none;
  position: relative;
  overflow: hidden;
  background-color: var(--background-color);
  color: var(--color);
  padding: var(--space-md);
  letter-spacing: 0.07em;
}

button::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 0.5px var(--color-outline);
}
</style>
