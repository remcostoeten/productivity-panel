import 'server-only';

const dictionaries = {
  en: () => import('../data/locales/en.json').then((module) => module.default),
  nl: () => import('../data/locales/nl.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();