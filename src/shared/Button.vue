<script setup lang="ts">
const props = defineProps<{
  rippleColor?: string
  backgroundColor?: string
  color?: string
}>()

const style = {
  '--ripple-color': props.rippleColor ?? 'var(--color-on-secondary)',
  '--background-color': props.backgroundColor ?? 'var(--color-secondary)',
  '--color': props.color ?? 'var(--color-on-secondary)',
}
</script>

<template>
  <section>
    <button :style="style" v-ripple>
      <slot />
    </button>
  </section>
</template>

<style scoped>
button {
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: var(--font-size-lg);
  position: relative;
  overflow: hidden;
  background-color: var(--background-color);
  color: var(--color);
  padding: var(--font-size-xxs) var(--font-size-sm);
}

button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 0.5px var(--color-outline);
}
</style>
