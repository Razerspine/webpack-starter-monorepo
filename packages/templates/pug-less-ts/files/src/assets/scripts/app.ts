import ThemeService from '@scripts/modules/theme-service';
import TranslationService from '@scripts/modules/translation-service';
import ConsoleLogger from '@scripts/utils/console-logger';
import en from '../i18n/en.json';
import uk from '../i18n/uk.json';

type Locales = {
  [key: string]: Record<string, unknown>;
};

(function () {
  const logger = new ConsoleLogger();
  const locales: Locales = { en, uk };
  const translationService = new TranslationService(locales, 'en');
  const themeService = new ThemeService({
    storageKey: 'theme',
    autoApply: true,
  });

  logger.success('app.ts successfully initialized and is now active!');

  document.addEventListener('DOMContentLoaded', () => {
    translationService.init();
    themeService.init();

    const select = document.getElementById(
      'languageSwitcher',
    ) as HTMLSelectElement | null;

    if (select) {
      select.value = translationService.getCurrentLang();
      select.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLSelectElement | null;
        if (!target) return;
        const lang = target.value;
        translationService.setLanguage(lang);
      });
    }

    const switcher = document.getElementById(
      'themeSwitcher',
    ) as HTMLElement | null;

    if (!switcher) return;
    const initial =
      themeService.getTheme() ||
      document.documentElement.getAttribute('data-theme') ||
      "light";
    const iconSelector = '.button-icon use';

    const setIcon = (theme: 'dark' | 'light') => {
      const useEl = switcher.querySelector(
        iconSelector,
      ) as SVGUseElement | null;
      if (!useEl) return;
      const id = theme === 'dark' ? '#icon-light-mode' : '#icon-dark-mode';
      try {
        // setAttributeNS for older SVG xlink support
        useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', id);
        // modern fallback
        useEl.setAttribute('href', id);
      } catch {
        // ignore
      }
    };

    setIcon(initial as 'dark' | 'light');
    switcher.setAttribute(
      "aria-pressed",
      initial === "dark" ? "true" : "false",
    );

    switcher.addEventListener('click', () => {
      const now = themeService.getTheme() || 'light';
      const next = now === 'dark' ? 'light' : 'dark';
      themeService.setTheme(next);
      setIcon(next);
      switcher.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    });
  });
})();
