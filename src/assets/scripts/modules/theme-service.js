/**
 * ThemeService
 *
 * Responsibilities:
 * - manage current theme state ('dark' | 'light')
 * - persist selection to storage (localStorage by default)
 * - determine initial theme (stored -> prefers-color-scheme -> fallback)
 * - notify subscribers about changes
 *
 * Options:
 * - storageKey: key in storage (default 'theme')
 * - storage: object implementing getItem/setItem/removeItem (default localStorage or null to disable)
 * - autoApply: if true, service will set data attribute on document.documentElement (default true)
 * - dataAttribute: attribute name to set on root when autoApply is true (default 'data-theme')
 */
export default class ThemeService {
  static DEFAULT_KEY = 'theme';

  constructor(options = {}) {
    const {
      storageKey = ThemeService.DEFAULT_KEY,
      storage = (typeof localStorage !== 'undefined' ? localStorage : null),
      autoApply = true,
      dataAttribute = 'data-theme',
      fallback = 'light'
    } = options;

    /** @private */
    this.storageKey = storageKey;
    /** @private */
    this.storage = storage;
    /** @private */
    this.autoApply = Boolean(autoApply);
    /** @private */
    this.dataAttribute = dataAttribute;
    /** @private */
    this.fallback = fallback === 'dark' ? 'dark' : 'light';

    /** @private {'dark'|'light'|null} */
    this.current = null;

    /** @private {Set<Function>} */
    this._listeners = new Set();
  }

  /**
   * Initialize service: determine and apply initial theme.
   * Safe to call multiple times.
   */
  init() {
    const initial = this._getStoredTheme() || this._detectSystemTheme() || this.fallback;
    this._apply(initial, {persist: false, notify: true, applyToDom: this.autoApply});
  }

  /**
   * Get current theme
   * @returns {'dark'|'light'|null}
   */
  getTheme() {
    return this.current;
  }

  /**
   * Set theme programmatically
   * @param {'dark'|'light'} theme
   */
  setTheme(theme) {
    if (theme !== 'dark' && theme !== 'light') return;
    this._apply(theme, {persist: true, notify: true, applyToDom: this.autoApply});
  }

  /**
   * Subscribe to theme changes. Returns unsubscribe function.
   * callback receives new theme string.
   * @param {Function} cb
   * @returns {Function}
   */
  onChange(cb) {
    if (typeof cb !== 'function') return () => {
    };
    this._listeners.add(cb);
    return () => this._listeners.delete(cb);
  }

  /**
   * Remove all listeners and reset state
   */
  destroy() {
    this._listeners.clear();
    this.current = null;
  }

  /**
   * Internal: apply theme to state, persist, notify and optionally apply to DOM
   * options: { persist: boolean, notify: boolean, applyToDom: boolean }
   */
  _apply(theme, {persist = true, notify = true, applyToDom = true} = {}) {
    if (!theme || (theme !== 'dark' && theme !== 'light')) return;
    if (this.current === theme && !persist) {
      // still may need to apply to DOM or notify; continue
    }
    this.current = theme;

    if (persist) this._saveTheme(theme);

    if (applyToDom && typeof document !== 'undefined' && document.documentElement) {
      try {
        document.documentElement.setAttribute(this.dataAttribute, theme);
      } catch {
        // ignore DOM errors
      }
    }

    if (notify) {
      for (const cb of Array.from(this._listeners)) {
        try {
          cb(theme);
        } catch {
        }
      }
    }
  }

  /**
   * Read stored theme from storage safely
   * @returns {'dark'|'light'|null}
   */
  _getStoredTheme() {
    if (!this.storage) return null;
    try {
      const v = this.storage.getItem(this.storageKey);
      return v === 'dark' || v === 'light' ? v : null;
    } catch {
      return null;
    }
  }

  /**
   * Persist theme to storage safely
   * @param {'dark'|'light'} theme
   */
  _saveTheme(theme) {
    if (!this.storage) return;
    try {
      this.storage.setItem(this.storageKey, theme);
    } catch {
      // ignore storage errors
    }
  }

  /**
   * Detect system preference for dark mode
   * @returns {'dark'|'light'|null}
   */
  _detectSystemTheme() {
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch {
      // ignore
    }
    return null;
  }
}
