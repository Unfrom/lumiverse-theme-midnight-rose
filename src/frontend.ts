/**
 * Midnight Rose Theme - Lumiverse Spindle Extension
 * Inspired by the cozy "Pastel Goth / Kawaii Dark Mode" aesthetic.
 *
 * Features:
 * - Deep aubergine/midnight plum base canvas (#140d18)
 * - Translucent repeating heart watermark background
 * - Rounded chat speech bubbles (18-20px) with delicate dusty rose outlines (#a05978)
 * - Sweet pastel pink accent highlights (#f285ad)
 * - Soft lilac-tinted white body typography (#f0e8f2)
 * - Drawer Tab control panel with customizable accents, opacity, and typography
 */

interface SpindleFrontendContext {
  ui: {
    registerDrawerTab(opts: {
      id: string;
      title: string;
      shortName?: string;
      description?: string;
      keywords?: string[];
      headerTitle?: string;
      iconSvg?: string;
    }): { root: HTMLElement; unregister?: () => void };
    showModal?(opts: any): any;
    showContextMenu?(opts: any): any;
  };
  sendToBackend?: (payload: any) => void;
  onBackendMessage?: (handler: (payload: any) => void) => () => void;
}

interface ThemeSettings {
  enabled: boolean;
  accentColor: string;
  heartPattern: boolean;
  heartOpacity: number;
  bubbleRadius: number;
  fontChoice: 'quicksand' | 'comfortaa' | 'default';
  heartDecorations: boolean;
  glowEffect: boolean;
}

const STORAGE_KEY = 'lumiverse_theme_midnight_rose_v1';

const DEFAULT_SETTINGS: ThemeSettings = {
  enabled: true,
  accentColor: '#f285ad',
  heartPattern: true,
  heartOpacity: 0.04,
  bubbleRadius: 18,
  fontChoice: 'quicksand',
  heartDecorations: true,
  glowEffect: true,
};

function loadSettings(): ThemeSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn('[Midnight Rose] Failed to read stored settings:', e);
  }
  return { ...DEFAULT_SETTINGS };
}

function saveSettings(settings: ThemeSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('[Midnight Rose] Failed to save settings:', e);
  }
}

export function setup(ctx: SpindleFrontendContext) {
  let settings = loadSettings();

  const STYLE_ID = 'spindle-theme-midnight-rose-style';
  const FONT_LINK_ID = 'spindle-theme-midnight-rose-fonts';

  // Inject Google fonts if needed
  let fontLink = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!fontLink) {
    fontLink = document.createElement('link');
    fontLink.id = FONT_LINK_ID;
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Quicksand:wght@500;600;700&display=swap';
    document.head.appendChild(fontLink);
  }

  // Inject primary theme stylesheet
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }

  function getFontFamily(): string {
    switch (settings.fontChoice) {
      case 'quicksand':
        return "'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      case 'comfortaa':
        return "'Comfortaa', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, cursive, sans-serif";
      default:
        return "inherit";
    }
  }

  function buildCss(): string {
    if (!settings.enabled) {
      return `/* Midnight Rose theme disabled */`;
    }

    const accent = settings.accentColor;
    const heartSvgData = settings.heartPattern
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70' viewBox='0 0 70 70'%3E%3Cpath d='M35 48 C35 48 22 37 15 29 C8 21 11 12 18 12 C23.5 12 30 16.5 35 22 C40 16.5 46.5 12 52 12 C59 12 62 21 55 29 C48 37 35 48 35 48 Z' fill='%23f285ad' fill-opacity='${settings.heartOpacity}'/%3E%3C/svg%3E")`
      : 'none';

    const glowStyle = settings.glowEffect
      ? `0 0 12px rgba(242, 133, 173, 0.22), 0 2px 8px rgba(0, 0, 0, 0.4)`
      : `0 2px 8px rgba(0, 0, 0, 0.3)`;

    const fontFamily = getFontFamily();

    return `
/* ========================================================
   Midnight Rose Theme for Lumiverse
   Kawaii Dark Mode / Pastel Goth Palette
   ======================================================== */

:root {
  /* Lumiverse Host Standard Variables */
  --lumiverse-bg: #140d18 !important;
  --lumiverse-bg-secondary: #1d1222 !important;
  --lumiverse-card: #281b2a !important;
  --lumiverse-card-secondary: #201323 !important;
  --lumiverse-card-hover: #332036 !important;
  --lumiverse-border: #a05978 !important;
  --lumiverse-border-subtle: rgba(160, 89, 120, 0.35) !important;
  --lumiverse-accent: ${accent} !important;
  --lumiverse-accent-hover: #ff9ebb !important;
  --lumiverse-accent-subtle: rgba(242, 133, 173, 0.16) !important;
  --lumiverse-text: #f0e8f2 !important;
  --lumiverse-text-dim: #9f8ba3 !important;
  --lumiverse-text-muted: #8a768e !important;
  --lumiverse-fill-subtle: #211425 !important;
  --lumiverse-input-bg: #1f1223 !important;

  /* Custom Extension Variables */
  --mr-bg: #140d18;
  --mr-bubble-other: #281b2a;
  --mr-bubble-user: #351f38;
  --mr-bubble-border: rgba(160, 89, 120, 0.55);
  --mr-accent: ${accent};
  --mr-text-main: #f0e8f2;
  --mr-text-sub: #8a768e;
  --mr-radius: ${settings.bubbleRadius}px;
}

/* App Canvas & Watermark Heart Pattern */
body, #app, #root, .lumiverse-app, [data-theme], main {
  background-color: #140d18 !important;
  background-image: ${heartSvgData} !important;
  background-repeat: repeat !important;
  background-attachment: fixed !important;
  color: #f0e8f2 !important;
  ${fontFamily !== 'inherit' ? `font-family: ${fontFamily} !important;` : ''}
}

/* Typography Enhancements */
h1, h2, h3, h4, h5, h6, .font-heading {
  color: #f0e8f2 !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
}

/* Chat Speech Bubbles */
.chat-message,
.message-bubble,
[data-message-role],
.prose-chat,
.chat-entry {
  border-radius: var(--mr-radius) !important;
  border: 1px solid var(--mr-bubble-border) !important;
  box-shadow: ${glowStyle} !important;
  backdrop-filter: blur(8px) !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Incoming / Character Messages */
.chat-message:not(.user-message),
.chat-message[data-role="assistant"],
.chat-message[data-role="bot"],
.message-incoming {
  background-color: var(--mr-bubble-other) !important;
  border-color: rgba(160, 89, 120, 0.45) !important;
  color: var(--mr-text-main) !important;
}

/* User Messages */
.chat-message.user-message,
.chat-message[data-role="user"],
.message-outgoing {
  background-color: var(--mr-bubble-user) !important;
  border-color: rgba(242, 133, 173, 0.6) !important;
  color: #ffffff !important;
}

/* Chat Message Input Pill Bar */
.chat-input-container,
.chat-input-bar,
textarea.chat-input,
input[type="text"].chat-input,
.composer-input {
  background-color: #1f1223 !important;
  border: 1px solid rgba(160, 89, 120, 0.5) !important;
  border-radius: 24px !important;
  color: #f0e8f2 !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35) !important;
}

.chat-input-container:focus-within,
textarea.chat-input:focus,
input[type="text"].chat-input:focus {
  border-color: var(--mr-accent) !important;
  box-shadow: 0 0 0 3px rgba(242, 133, 173, 0.25) !important;
  outline: none !important;
}

/* Cute Heart Badges & Dividers */
.badge-pill,
.role-badge,
.tag-badge {
  background-color: #2b1b31 !important;
  border: 1px solid rgba(160, 89, 120, 0.5) !important;
  color: #f0e8f2 !important;
  border-radius: 9999px !important;
  padding: 2px 10px !important;
  font-size: 0.8rem !important;
}

${
  settings.heartDecorations
    ? `
/* Unread bar / Demarcation Line with NEW ♥ badge */
.unread-divider,
.new-messages-bar {
  border-top: 1px solid var(--mr-accent) !important;
  position: relative !important;
  margin: 18px 0 !important;
}

.unread-divider::after,
.new-messages-bar::after {
  content: "NEW ♥";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--mr-accent);
  color: #140d18;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 1px 10px;
  border-radius: 9999px;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
`
    : ''
}

/* Modals & Panels */
.modal-content,
.dialog-content,
.card-panel,
.drawer-panel {
  background-color: #1d1222 !important;
  border: 1px solid rgba(160, 89, 120, 0.45) !important;
  border-radius: 16px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
}

/* Buttons */
button.primary-btn,
.btn-primary,
button[data-variant="primary"] {
  background: linear-gradient(135deg, ${accent} 0%, #db6591 100%) !important;
  color: #140d18 !important;
  font-weight: 600 !important;
  border: none !important;
  border-radius: 20px !important;
  box-shadow: 0 2px 8px rgba(242, 133, 173, 0.3) !important;
  transition: all 0.2s ease !important;
}

button.primary-btn:hover,
.btn-primary:hover,
button[data-variant="primary"]:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(242, 133, 173, 0.45) !important;
  filter: brightness(1.08) !important;
}

/* Custom Minimalist Rose Scrollbars */
::-webkit-scrollbar {
  width: 7px !important;
  height: 7px !important;
}

::-webkit-scrollbar-track {
  background: transparent !important;
}

::-webkit-scrollbar-thumb {
  background: #542e43 !important;
  border-radius: 10px !important;
}

::-webkit-scrollbar-thumb:hover {
  background: #a05978 !important;
}
`;
  }

  function applyStyles() {
    if (styleEl) {
      styleEl.textContent = buildCss();
    }
  }

  applyStyles();

  // Register Lumiverse Drawer Tab for theme settings and live preview
  let unregisterTab: (() => void) | undefined;
  if (ctx.ui && ctx.ui.registerDrawerTab) {
    const tab = ctx.ui.registerDrawerTab({
      id: 'midnight-rose-theme-settings',
      title: 'Midnight Rose',
      shortName: 'Theme ♡',
      description: 'Customize Midnight Rose kawaii dark palette, bubbles, and accents',
      keywords: ['theme', 'midnight', 'rose', 'kawaii', 'pink', 'dark', 'cute'],
      headerTitle: 'Midnight Rose Theme',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${settings.accentColor}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    });

    if (tab && tab.root) {
      renderSettingsPanel(tab.root);
    }
    unregisterTab = tab?.unregister;
  }

  function renderSettingsPanel(container: HTMLElement) {
    container.innerHTML = `
      <div style="padding: 16px; font-family: sans-serif; color: #f0e8f2; max-width: 440px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #542e43; padding-bottom: 12px;">
          <div>
            <div style="font-weight: 700; font-size: 1.15rem; color: #f0e8f2; display: flex; align-items: center; gap: 6px;">
              <span>Midnight Rose</span>
              <span style="color: ${settings.accentColor}; font-size: 1.2rem;">♥</span>
            </div>
            <div style="font-size: 0.8rem; color: #8a768e; margin-top: 2px;">Pastel Goth & Kawaii Dark Palette</div>
          </div>
          <label style="display: flex; align-items: center; cursor: pointer; gap: 8px;">
            <input type="checkbox" id="mr-toggle-enable" ${settings.enabled ? 'checked' : ''} style="accent-color: #f285ad; width: 18px; height: 18px;" />
            <span style="font-size: 0.9rem; font-weight: 600;">Active</span>
          </label>
        </div>

        <!-- Color Palette Presets -->
        <div style="margin-bottom: 18px;">
          <label style="font-size: 0.85rem; font-weight: 600; color: #f0e8f2; display: block; margin-bottom: 8px;">Accent Palette</label>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="mr-palette-chips">
            <button class="mr-color-btn" data-color="#f285ad" style="background: #f285ad; width: 32px; height: 32px; border-radius: 50%; border: 2px solid ${settings.accentColor === '#f285ad' ? '#fff' : 'transparent'}; cursor: pointer;" title="Baby Rose"></button>
            <button class="mr-color-btn" data-color="#ff9ebb" style="background: #ff9ebb; width: 32px; height: 32px; border-radius: 50%; border: 2px solid ${settings.accentColor === '#ff9ebb' ? '#fff' : 'transparent'}; cursor: pointer;" title="Blush"></button>
            <button class="mr-color-btn" data-color="#c787e8" style="background: #c787e8; width: 32px; height: 32px; border-radius: 50%; border: 2px solid ${settings.accentColor === '#c787e8' ? '#fff' : 'transparent'}; cursor: pointer;" title="Lavender"></button>
            <button class="mr-color-btn" data-color="#ff7096" style="background: #ff7096; width: 32px; height: 32px; border-radius: 50%; border: 2px solid ${settings.accentColor === '#ff7096' ? '#fff' : 'transparent'}; cursor: pointer;" title="Berry"></button>
            <button class="mr-color-btn" data-color="#99e2b4" style="background: #99e2b4; width: 32px; height: 32px; border-radius: 50%; border: 2px solid ${settings.accentColor === '#99e2b4' ? '#fff' : 'transparent'}; cursor: pointer;" title="Pastel Mint"></button>
          </div>
        </div>

        <!-- Font Choice -->
        <div style="margin-bottom: 18px;">
          <label style="font-size: 0.85rem; font-weight: 600; color: #f0e8f2; display: block; margin-bottom: 8px;">Typography Style</label>
          <select id="mr-font-select" style="width: 100%; background: #281b2a; color: #f0e8f2; border: 1px solid #542e43; padding: 8px 12px; border-radius: 12px; outline: none;">
            <option value="quicksand" ${settings.fontChoice === 'quicksand' ? 'selected' : ''}>Quicksand (Soft Rounded Sans)</option>
            <option value="comfortaa" ${settings.fontChoice === 'comfortaa' ? 'selected' : ''}>Comfortaa (Whimsical Geometric)</option>
            <option value="default" ${settings.fontChoice === 'default' ? 'selected' : ''}>Default Lumiverse Font</option>
          </select>
        </div>

        <!-- Heart Watermark Pattern -->
        <div style="margin-bottom: 18px; background: #201323; padding: 12px 14px; border-radius: 14px; border: 1px solid #47263b;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.85rem; font-weight: 600;">Floating Heart Pattern</span>
            <input type="checkbox" id="mr-heart-pattern-toggle" ${settings.heartPattern ? 'checked' : ''} style="accent-color: #f285ad;" />
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 0.75rem; color: #8a768e;">Opacity:</span>
            <input type="range" id="mr-heart-opacity" min="0.01" max="0.12" step="0.01" value="${settings.heartOpacity}" style="flex: 1; accent-color: #f285ad;" />
            <span id="mr-heart-opacity-val" style="font-size: 0.75rem; color: #f0e8f2; width: 35px; text-align: right;">${Math.round(settings.heartOpacity * 100)}%</span>
          </div>
        </div>

        <!-- Speech Bubble Roundedness -->
        <div style="margin-bottom: 18px; background: #201323; padding: 12px 14px; border-radius: 14px; border: 1px solid #47263b;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.85rem; font-weight: 600;">Bubble Corner Radius</span>
            <span id="mr-radius-val" style="font-size: 0.75rem; color: #f285ad; font-weight: 600;">${settings.bubbleRadius}px</span>
          </div>
          <input type="range" id="mr-bubble-radius" min="10" max="28" step="2" value="${settings.bubbleRadius}" style="width: 100%; accent-color: #f285ad;" />
        </div>

        <!-- Heart Decorators & Glow -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
          <label style="background: #201323; padding: 10px 12px; border-radius: 12px; border: 1px solid #47263b; display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="mr-heart-deco" ${settings.heartDecorations ? 'checked' : ''} style="accent-color: #f285ad;" />
            <span style="font-size: 0.8rem;">Heart Badges ♥</span>
          </label>
          <label style="background: #201323; padding: 10px 12px; border-radius: 12px; border: 1px solid #47263b; display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="mr-glow" ${settings.glowEffect ? 'checked' : ''} style="accent-color: #f285ad;" />
            <span style="font-size: 0.8rem;">Bubble Glow</span>
          </label>
        </div>

        <!-- Preview Card -->
        <div style="background: #140d18; border: 1px solid #a05978; border-radius: var(--mr-radius); padding: 14px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
          <div style="font-size: 0.75rem; color: #8a768e; margin-bottom: 6px; display: flex; justify-content: space-between;">
            <span>Preview Bubble</span>
            <span>10:34 AM</span>
          </div>
          <div style="font-size: 0.9rem; color: #f0e8f2; line-height: 1.4;">
            ty ty, im just trying to make a cute theme on lumiverse ♡
          </div>
        </div>

        <!-- Reset Button -->
        <button id="mr-reset-btn" style="width: 100%; padding: 8px; background: transparent; border: 1px dashed #542e43; color: #8a768e; border-radius: 10px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s;">
          Reset to Defaults
        </button>
      </div>
    `;

    // Event listeners
    const enableEl = container.querySelector('#mr-toggle-enable') as HTMLInputElement | null;
    enableEl?.addEventListener('change', () => {
      settings.enabled = enableEl.checked;
      saveSettings(settings);
      applyStyles();
    });

    const fontEl = container.querySelector('#mr-font-select') as HTMLSelectElement | null;
    fontEl?.addEventListener('change', () => {
      settings.fontChoice = fontEl.value as any;
      saveSettings(settings);
      applyStyles();
    });

    const heartPatternEl = container.querySelector('#mr-heart-pattern-toggle') as HTMLInputElement | null;
    heartPatternEl?.addEventListener('change', () => {
      settings.heartPattern = heartPatternEl.checked;
      saveSettings(settings);
      applyStyles();
    });

    const heartOpacityEl = container.querySelector('#mr-heart-opacity') as HTMLInputElement | null;
    const heartOpacityVal = container.querySelector('#mr-heart-opacity-val');
    heartOpacityEl?.addEventListener('input', () => {
      const val = parseFloat(heartOpacityEl.value);
      settings.heartOpacity = val;
      if (heartOpacityVal) heartOpacityVal.textContent = `${Math.round(val * 100)}%`;
      saveSettings(settings);
      applyStyles();
    });

    const radiusEl = container.querySelector('#mr-bubble-radius') as HTMLInputElement | null;
    const radiusVal = container.querySelector('#mr-radius-val');
    radiusEl?.addEventListener('input', () => {
      const val = parseInt(radiusEl.value, 10);
      settings.bubbleRadius = val;
      if (radiusVal) radiusVal.textContent = `${val}px`;
      saveSettings(settings);
      applyStyles();
    });

    const decoEl = container.querySelector('#mr-heart-deco') as HTMLInputElement | null;
    decoEl?.addEventListener('change', () => {
      settings.heartDecorations = decoEl.checked;
      saveSettings(settings);
      applyStyles();
    });

    const glowEl = container.querySelector('#mr-glow') as HTMLInputElement | null;
    glowEl?.addEventListener('change', () => {
      settings.glowEffect = glowEl.checked;
      saveSettings(settings);
      applyStyles();
    });

    // Palette chips
    const colorChips = container.querySelectorAll('.mr-color-btn');
    colorChips.forEach((btn) => {
      btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        if (color) {
          settings.accentColor = color;
          saveSettings(settings);
          applyStyles();
          colorChips.forEach((c) => ((c as HTMLElement).style.borderColor = 'transparent'));
          (btn as HTMLElement).style.borderColor = '#ffffff';
        }
      });
    });

    const resetBtn = container.querySelector('#mr-reset-btn');
    resetBtn?.addEventListener('click', () => {
      settings = { ...DEFAULT_SETTINGS };
      saveSettings(settings);
      applyStyles();
      renderSettingsPanel(container);
    });
  }

  // Cleanup handler returned to Lumiverse
  return () => {
    if (styleEl && styleEl.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }
    if (fontLink && fontLink.parentNode) {
      fontLink.parentNode.removeChild(fontLink);
    }
    if (unregisterTab) {
      unregisterTab();
    }
    console.log('[Midnight Rose Theme] Cleaned up.');
  };
}
