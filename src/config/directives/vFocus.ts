import type { Directive } from "vue";


const vFocus: Directive<HTMLElement, boolean> = {
  mounted(el, binding) {
    if (binding.value === false) return
    el.focus();
  }
};

export default vFocus;
