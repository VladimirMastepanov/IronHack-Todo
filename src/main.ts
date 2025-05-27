import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import { i18n } from './config/i18n'
import vRipple from './config/directives/vRipple'
import { createPinia } from 'pinia'
import router from './router'
import vFocus from './config/directives/vFocus'

const app = createApp(App)
app
  .directive('ripple', vRipple)
  .directive('focus', vFocus)
  .use(i18n)
  .use(createPinia())
  .use(router)
  .mount('#app')
