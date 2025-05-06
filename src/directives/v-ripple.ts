import type { DirectiveBinding } from "vue";

const createRipple = (
  event: PointerEvent | MouseEvent | TouchEvent,
  el: HTMLElement,
  rippleColor: string
) => {
  const ripple = document.createElement("span");
  ripple.className = "ripple";

  const rect = el.getBoundingClientRect();
  let x: number, y: number;

  if ("touches" in event && event.touches.length > 0) {
    x = event.touches[0].clientX - rect.left;
    y = event.touches[0].clientY - rect.top;
  } else if ("clientX" in event) {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  } else {
    return;
  }

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.backgroundColor = rippleColor;

  el.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
};

const getRippleColor = (el: HTMLElement): string => {
  const style = getComputedStyle(el);
  const color = style.getPropertyValue("--ripple-color").trim();
  return color || "rgba(0, 0, 0, 0.2)";
};

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.position = el.style.position || "relative";
    el.style.overflow = "hidden";
    
    const rippleColor = getRippleColor(el);

    type HandlerType = (e: Event) => void;
    const handler: HandlerType = (event) => {
      if (
        event instanceof PointerEvent ||
        event instanceof MouseEvent ||
        event instanceof TouchEvent
      ) {
        createRipple(event, el, rippleColor);
      }
    };

    el.__rippleHandler__ = handler;

    el.addEventListener("pointerdown", handler, { passive: true });
    el.addEventListener("touchstart", handler, { passive: true });
    el.addEventListener("mousedown", handler, { passive: true });
  },
  unmounted(el: HTMLElement) {
    const handler = el.__rippleHandler__;
    if (handler) {
      el.removeEventListener("pointerdown", handler);
      el.removeEventListener("touchstart", handler);
      el.removeEventListener("mousedown", handler);
    }
    delete el.__rippleHandler__;
  },
};
