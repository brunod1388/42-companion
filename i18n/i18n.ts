import { I18n, Scope } from 'i18n-js';

import en from './en.json';
import fr from './fr.json';

const i18n = new I18n({
  en: en,
  fr: fr
});

const t = (key: Scope) => i18n.t(key);

export { i18n, t };
