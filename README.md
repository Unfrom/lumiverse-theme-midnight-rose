# Midnight Rose Theme for Lumiverse Spindle

A cute, cozy **Pastel Goth / Kawaii Dark Mode** theme extension for Lumiverse Spindle, matching the Discord custom aesthetic.

## Features & Aesthetic Design

- **Deep Plum Canvas**: `#140d18` base with subtle midnight aubergine `#1d1222` panels.
- **Heart Watermark Pattern**: Floating translucent heart backdrop pattern.
- **Rounded Chat Bubbles**: 18px–20px radius with 1px dusty mauve outlines (`#a05978`) and subtle ambient glow.
- **Pastel Pink Accents**: Vibrant baby rose (`#f285ad`) highlights, pill badges, and active controls.
- **`NEW ♥` Demarcation Line**: Styled unread message divider.
- **Pill Input Composer**: Deep aubergine rounded input bar with docked heart indicators.
- **Curated Typography**: Optional Google Fonts (*Quicksand* / *Comfortaa*) for rounded, whimsical letterforms.
- **In-App Drawer Tab Controls**:
  - Live enable/disable toggle
  - Accent color picker (Baby Rose, Blush Pink, Lavender, Berry Sorbet, Pastel Mint)
  - Floating heart watermark opacity slider
  - Bubble corner radius slider (10px–28px)
  - Heart badge indicators & bubble glow toggles
  - Settings persisted across sessions in `localStorage`

## Structure

```
├── spindle.json          # Primary extension manifest
├── spindlefile.json      # Manifest candidate fallback
├── spindlefile           # Manifest candidate fallback
├── src/
│   ├── frontend.ts       # Frontend injection, CSS styles & Drawer Tab UI
│   └── backend.ts        # Backend worker thread module
├── dist/
│   ├── frontend.js       # Bundled browser module (tracked in git)
│   └── backend.js        # Bundled worker module (tracked in git)
├── package.json
└── tsconfig.json
```

## Installation in Lumiverse

1. Open Lumiverse and navigate to **Extensions**.
2. Install directly from this local repository path or via your Git repository:
   - Local path: `C:\Users\labso\lumiverse-theme-midnight-rose`
3. Once enabled, open the **Drawer** and look for the **Theme ♡ (Midnight Rose)** tab to configure palette presets and typography.

## Development & Building

```bash
# Rebuild bundles using esbuild
npm run build
```
