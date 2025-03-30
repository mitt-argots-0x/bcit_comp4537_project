import translations from '../app/locales/en.json';

export function useTranslations(namespace) {
  return (key, vars = {}) => {
    const keys = key.split('.');
    let value = translations;

    if (namespace) keys.unshift(namespace);

    for (const k of keys) {
      if (!value[k]) return key; // fallback
      value = value[k];
    }

    if (typeof value !== 'string') return key;

    return Object.entries(vars).reduce(
      (acc, [varKey, varValue]) => acc.replace(`{{${varKey}}}`, varValue),
      value
    );
  };
}