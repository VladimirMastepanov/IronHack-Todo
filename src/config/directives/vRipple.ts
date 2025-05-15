import type { Directive, DirectiveBinding } from "vue";

interface RippleOptions {
  size?: number;
  color?: string;
}

const handleRipple = (
  element: HTMLElement,
  binding: DirectiveBinding<RippleOptions>,
  event: PointerEvent
) => {
  // Получаем размеры элемента и позицию клика
  const rect = element.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  // Определяем максимальный размер эффекта
  const size = binding.value?.size || 50;
  
  // Получаем цвет из параметров директивы или CSS переменной
  const customColor = binding.value?.color;
  const cssColor = getComputedStyle(element).getPropertyValue("--ripple-color").trim();
  const rippleColor = customColor || cssColor || "rgba(0, 0, 0, 0.2)";

  // Создаем элемент для эффекта
  const ripple = document.createElement("span");
  ripple.classList.add("v-ripple-effect");
  
  // Устанавливаем стили для ripple
  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.pointerEvents = "none";
  ripple.style.backgroundColor = rippleColor;
  ripple.style.left = `${offsetX}px`;
  ripple.style.top = `${offsetY}px`;
  ripple.style.width = "5px";
  ripple.style.height = "5px";
  ripple.style.transform = "scale(1)";
  ripple.style.opacity = "0.6";
  
  // Настраиваем анимацию через CSS transitions
  ripple.style.transition = `transform 0.5s ease-out, opacity 0.5s ease-out`;
  
  // Добавляем ripple к элементу
  element.appendChild(ripple);
  
  // Запускаем анимацию в следующем кадре для стабильности
  requestAnimationFrame(() => {
    ripple.style.transform = `scale(${size})`;
    ripple.style.opacity = "0";
  });
  
  // Удаляем ripple после завершения анимации
  setTimeout(() => {
    ripple.remove();
  }, 500);
};

const vRipple: Directive<HTMLElement, RippleOptions> = {
  mounted(el, binding) {
    // Настраиваем стили для корректного отображения эффекта
    const position = getComputedStyle(el).position;
    if (position === "static" || !position) {
      el.style.position = "relative";
    }
    
    el.style.overflow = "hidden";
    el.style.userSelect = "none";
    // Используем нетипизированное свойство для webkit-tap-highlight-color
    (el.style as any)["-webkit-tap-highlight-color"] = "transparent";
    
    // Используем pointer-events для лучшей кроссбраузерности
    el.addEventListener("pointerdown", (event) => handleRipple(el, binding, event), {
      passive: true
    });
  }
};

export default vRipple;