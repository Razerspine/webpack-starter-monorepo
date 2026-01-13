import ThemeToggle from '@scripts/modules/theme-toggle';
import TranslationService from '@scripts/modules/translation-service';
import LanguageSwitcher from '@scripts/modules/language-switcher';
import ConsoleLogger from '@scripts/utils/console-logger';

(function () {
  const logger = new ConsoleLogger();
  logger.success('common.js successfully initialized and is now active!');

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = new ThemeToggle({
      buttonSelector: '#themeToggle',
      iconSelector: '.button-icon',
      dataAttribute: 'data-theme',
      storageKey: 'theme',
    });

    const translationService = new TranslationService();
    translationService.init();

    const languageSwitcher = new LanguageSwitcher(translationService);
    languageSwitcher.init();
  });
})();

