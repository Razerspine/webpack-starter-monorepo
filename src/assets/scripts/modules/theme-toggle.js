export default class ThemeToggle {
  /**
   * @param {Object} options
   * @param {string} options.buttonSelector - selector for the theme toggle button
   * @param {string} options.iconSelector - selector for the icon inside the button
   * @param {string} options.dataAttribute - attribute used to store the theme on the root element (e.g., 'data-theme')
   * @param {string} options.storageKey - key in localStorage
   */
  constructor(
    {
      buttonSelector = '#theme-toggle',
      iconSelector = '.button-icon',
      dataAttribute = 'data-theme',
      storageKey = 'theme',
    } = {}) {
    this.buttonSelector = buttonSelector;
    this.iconSelector = iconSelector;
    this.dataAttribute = dataAttribute;
    this.storageKey = storageKey;

    this.root = document.documentElement;
    this.button = null;
    this._onClick = this._onClick.bind(this);

    this.init();
  }

  init() {
    this.button = document.querySelector(this.buttonSelector);

    const theme = this._getInitialTheme();
    this._applyTheme(theme);

    if (!this.button) {
      console.warn(`ThemeToggle: button not found by selector "${this.buttonSelector}"`);
      return;
    }

    this._updateIcon(theme);
    this.button.addEventListener('click', this._onClick);
  }

  _onClick() {
    const current = this.root.getAttribute(this.dataAttribute) || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this._applyTheme(next);
    this._saveTheme(next);
    this._updateIcon(next);
  }

  _getInitialTheme() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  _applyTheme(theme) {
    if (!theme) return;
    this.root.setAttribute(this.dataAttribute, theme);
  }

  _updateIcon(theme) {
    if (!this.button) return;
    const icon = this.button.querySelector(this.iconSelector);
    if (!icon) return;
    icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  }

  _saveTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (e) {
      console.warn('Failed to save theme', e);
    }
  }
}
