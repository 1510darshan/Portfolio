const o=`
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
`;export{o as g};
