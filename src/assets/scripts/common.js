import ThemeToggle from './modules/theme-toggle';

(function () {
  console.log('init common.js');
  
  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = new ThemeToggle({
      buttonSelector: '#themeToggle',
      iconSelector: '.button-icon',
      dataAttribute: 'data-theme',
      storageKey: 'theme',
    });
  });
})();

