import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import es from "../locales/es.json";

type MessageSchema = typeof en

export const i18n = createI18n<[MessageSchema], 'en' | 'es'>({
  legacy: false,
  locale: 'en',
  messages: {
    'en': en,
    'es': es,
  },
});
