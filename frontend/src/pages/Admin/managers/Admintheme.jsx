// ── Design Tokens ─────────────────────────────────────────────
export const tokens = {
  // Base palette — deep space ink
  bg0:   '#03080f',
  bg1:   '#060d18',
  bg2:   '#0a1525',
  bg3:   '#0f1e35',
  bg4:   '#172438',

  // Borders
  b1:    'rgba(255,255,255,0.04)',
  b2:    'rgba(255,255,255,0.08)',
  b3:    'rgba(255,255,255,0.13)',

  // Cyan accent
  cyan:       '#00d4ff',
  cyanDim:    'rgba(0,212,255,0.12)',
  cyanGlow:   'rgba(0,212,255,0.25)',

  // Purple accent
  violet:     '#8b5cf6',
  violetDim:  'rgba(139,92,246,0.12)',

  // Danger
  red:        '#f43f5e',
  redDim:     'rgba(244,63,94,0.12)',

  // Success
  green:      '#10d9a8',
  greenDim:   'rgba(16,217,168,0.12)',

  // Amber
  amber:      '#f59e0b',
  amberDim:   'rgba(245,158,11,0.12)',

  // Text
  t1: '#ffffff',
  t2: 'rgba(255,255,255,0.65)',
  t3: 'rgba(255,255,255,0.35)',
  t4: 'rgba(255,255,255,0.18)',

  // Radius
  r1: '8px',
  r2: '12px',
  r3: '16px',
  r4: '20px',

  // Font
  fontDisplay: "'Bricolage Grotesque', sans-serif",
  fontMono:    "'JetBrains Mono', monospace",
};

// ── Global CSS string (inject via createGlobalStyle) ───────────
export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Bricolage Grotesque', sans-serif;
    background: #03080f;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  input, textarea, select, button {
    font-family: inherit;
  }

  ::selection {
    background: rgba(0,212,255,0.3);
    color: white;
  }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.2); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(0,212,255,0.4); }
`;