import type { Directive, DirectiveBinding } from 'vue'

interface RippleOptions {
  size?: number
  color?: string
}

const handleRipple = (
  element: HTMLElement,
  binding: DirectiveBinding<RippleOptions>,
  event: PointerEvent
) => {
  const rect = element.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const offsetY = event.clientY - rect.top

  const size = binding.value?.size || 50

  const customColor = binding.value?.color
  const cssColor = getComputedStyle(element)
    .getPropertyValue('--ripple-color')
    .trim()
  const rippleColor =
    customColor || cssColor || 'var(--color-on-primary-container)'

  const ripple = document.createElement('span')
  ripple.classList.add('v-ripple-effect')

  ripple.style.position = 'absolute'
  ripple.style.borderRadius = '50%'
  ripple.style.pointerEvents = 'none'
  ripple.style.backgroundColor = rippleColor
  ripple.style.left = `${offsetX}px`
  ripple.style.top = `${offsetY}px`
  ripple.style.width = '5px'
  ripple.style.height = '5px'
  ripple.style.transform = 'scale(1)'
  ripple.style.opacity = '0.6'

  ripple.style.transition = `transform 0.5s ease-out, opacity 0.5s ease-out`

  element.appendChild(ripple)

  requestAnimationFrame(() => {
    ripple.style.transform = `scale(${size})`
    ripple.style.opacity = '0'
  })

  setTimeout(() => {
    ripple.remove()
  }, 500)
}

const vRipple: Directive<HTMLElement, RippleOptions> = {
  mounted(el, binding) {
    const position = getComputedStyle(el).position
    if (position === 'static' || !position) {
      el.style.position = 'relative'
    }
    el.style.overflow = 'hidden'
    el.style.userSelect = 'none'
    ;(el.style as any)['-webkit-tap-highlight-color'] = 'transparent'

    el.addEventListener(
      'pointerdown',
      (event) => handleRipple(el, binding, event),
      {
        passive: true,
      }
    )
  },
}

export default vRipple
