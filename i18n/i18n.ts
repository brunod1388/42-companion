import { I18n, Scope, TranslateOptions } from "i18n-js"

import en from "./en.json"
import fr from "./fr.json"

const i18n = new I18n({
  en: en,
  fr: fr,
})

const t = (key: Scope, options?: TranslateOptions | undefined) => i18n.t(key, options)

export { i18n, t }
