import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import config from '~/next-i18next.config';

export async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: any,
  resources?: any
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../data/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    ...config,
    lng: locale,
    ns: namespaces,
    resources,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}