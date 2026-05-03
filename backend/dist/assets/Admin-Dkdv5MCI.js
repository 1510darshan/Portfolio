import{j as e,F as xe}from"./vendor-icons-DxrxNb7R.js";import{r as b,R as fr}from"./vendor-react-h-VQqIco.js";import{c as o,p as z,l as Ve}from"./vendor-styled-B7-NiZQN.js";import{g as We}from"./Admintheme-DZS5IzV4.js";import{g as Ge,a as He,b as Oe,c as qe,d as _e,e as Xe,f as br,u as mr,h as ur,i as jr,r as Qe,j as ge,k as yr,l as vr,m as wr,n as kr,o as $r,p as Cr,q as Sr,s as zr,t as Mr,v as Ir,w as Br,x as Dr,y as he,z as Pr,A as Ze,B as Lr,C as Er}from"./index-CW4aj3IM.js";const Ke=z`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`,Nr=z`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;z`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;z`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;o.div`
  animation: ${Ke} 0.4s ease both;
`;const re=o.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`,E=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({gap:r})=>r||"20px"};
`,L=o.div`
  background: #0a1525;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: ${({pad:r})=>r||"22px"};
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(0,212,255,0.03) 0%, transparent 60%);
    pointer-events: none;
  }
`,te=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`,P=o.h2`
  font-size: ${({sm:r})=>r?"0.85rem":"1rem"};
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: -0.01em;

  &::before {
    content: '';
    width: 3px;
    height: ${({sm:r})=>r?"12px":"16px"};
    border-radius: 2px;
    background: linear-gradient(180deg, #00d4ff, #8b5cf6);
    display: block;
    flex-shrink: 0;
  }
`,X=o.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,w=o.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,k=o.label`
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(0,212,255,0.8);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
`,Ar=o.span`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.28);
  font-family: 'JetBrains Mono', monospace;
`,C=o.input`
  padding: 10px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  color: white;
  font-size: 0.88rem;
  transition: all 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: rgba(0,212,255,0.5);
    background: rgba(0,212,255,0.05);
    box-shadow: 0 0 0 3px rgba(0,212,255,0.08);
  }

  &::placeholder { color: rgba(255,255,255,0.2); }

  &[type="color"] {
    height: 40px;
    padding: 4px 8px;
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::file-selector-button {
    margin-right: 12px;
    padding: 5px 12px;
    background: rgba(0,212,255,0.15);
    border: 1px solid rgba(0,212,255,0.3);
    border-radius: 5px;
    color: #00d4ff;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s;
    &:hover { background: rgba(0,212,255,0.25); }
  }
`,me=o.textarea`
  padding: 10px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  color: white;
  font-size: 0.88rem;
  font-family: inherit;
  resize: vertical;
  min-height: ${({minH:r})=>r||"100px"};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(0,212,255,0.5);
    background: rgba(0,212,255,0.05);
    box-shadow: 0 0 0 3px rgba(0,212,255,0.08);
  }

  &::placeholder { color: rgba(255,255,255,0.2); }
`,M=o.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: ${({sm:r})=>r?"7px 14px":"11px 20px"};
  border-radius: 8px;
  font-size: ${({sm:r})=>r?"0.75rem":"0.88rem"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  border: none;
  letter-spacing: 0.01em;

  /* variants */
  ${({variant:r})=>r==="primary"&&`
    background: linear-gradient(135deg, #00d4ff, #8b5cf6);
    color: white;
    &:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,212,255,0.25); }
    &:active { transform: translateY(0); }
  `}
  ${({variant:r})=>r==="ghost"&&`
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    &:hover { border-color: rgba(0,212,255,0.4); color: #00d4ff; background: rgba(0,212,255,0.06); }
  `}
  ${({variant:r})=>r==="danger"&&`
    background: rgba(244,63,94,0.1);
    border: 1px solid rgba(244,63,94,0.25);
    color: #f43f5e;
    &:hover { background: rgba(244,63,94,0.2); border-color: rgba(244,63,94,0.5); }
  `}
  ${({variant:r})=>r==="success"&&`
    background: rgba(16,217,168,0.1);
    border: 1px solid rgba(16,217,168,0.25);
    color: #10d9a8;
    &:hover { background: rgba(16,217,168,0.2); }
  `}
  ${({variant:r})=>r==="cyan-outline"&&`
    background: transparent;
    border: 1px solid rgba(0,212,255,0.35);
    color: #00d4ff;
    &:hover { background: rgba(0,212,255,0.1); border-color: rgba(0,212,255,0.6); }
  `}

  &:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
`,oe=o.div`
  display: flex;
  gap: 10px;
  ${({stretch:r})=>r&&"button, a { flex: 1; }"}
`,ue=o.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0,212,255,0.05);
    border-color: rgba(0,212,255,0.2);
  }

  ${({selected:r})=>r&&`
    background: rgba(0,212,255,0.08);
    border-color: rgba(0,212,255,0.35);
  `}
`,je=o.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 580px;
  overflow-y: auto;
  padding-right: 4px;
`,W=o.div`
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 25%,
    rgba(255,255,255,0.07) 50%,
    rgba(255,255,255,0.03) 75%
  );
  background-size: 600px 100%;
  animation: ${Nr} 1.5s infinite;
  height: ${({h:r})=>r||"12px"};
  width: ${({w:r})=>r||"100%"};
  flex-shrink: 0;
`,ee=o.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  font-family: 'JetBrains Mono', monospace;

  ${({color:r})=>{const i={cyan:"background: rgba(0,212,255,0.12); color: #00d4ff; border: 1px solid rgba(0,212,255,0.25);",violet:"background: rgba(139,92,246,0.12); color: #8b5cf6; border: 1px solid rgba(139,92,246,0.25);",green:"background: rgba(16,217,168,0.12); color: #10d9a8; border: 1px solid rgba(16,217,168,0.25);",amber:"background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.25);",red:"background: rgba(244,63,94,0.12); color: #f43f5e; border: 1px solid rgba(244,63,94,0.25);",gray:"background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.1);"};return i[r]||i.gray}}
`;o.div`
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin: ${({my:r})=>r?`${r}px 0`:"0"};
`;const Y=o.div`
  text-align: center;
  padding: 48px 20px;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.2);
  font-family: 'JetBrains Mono', monospace;
`,er=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 4px;
`,rr=o.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.68rem;
  background: rgba(0,212,255,0.08);
  color: rgba(0,212,255,0.7);
  border: 1px solid rgba(0,212,255,0.15);
  font-family: 'JetBrains Mono', monospace;
`,tr=o.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(16,217,168,0.1);
  border: 1px solid rgba(16,217,168,0.25);
  border-radius: 8px;
  color: #10d9a8;
  font-size: 0.85rem;
  margin-bottom: 16px;
  animation: ${Ke} 0.3s ease;
`,Tr=o.div`
  width: 100%;
  height: ${({h:r})=>r||"200px"};
  border-radius: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px dashed rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Fr=Ve`${We}`,Rr="https://portfolio-ogjb.vercel.app",or=z`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`,Ur=z`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`,nr=z`from { width: 0; }`,Jr=z`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
`,Yr=z`
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
`,Vr=z`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`,Wr=o.div`display: flex; flex-direction: column; gap: 22px;`,Gr=o.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px)  { grid-template-columns: 1fr; }
`,Hr=o.div`
  padding: 20px; background: #0a1525;
  border: 1px solid rgba(255,255,255,0.06); border-radius: 14px;
  position: relative; overflow: hidden; cursor: default;
  animation: ${or} 0.5s ease ${({$d:r})=>r} both;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  &:hover { transform: translateY(-3px); border-color: ${({$a:r})=>r}33; box-shadow: 0 16px 40px ${({$a:r})=>r}10; }
  &::before {
    content: ''; position: absolute; top: -24px; right: -24px;
    width: 90px; height: 90px; border-radius: 50%;
    background: ${({$a:r})=>r}; opacity: 0.07; filter: blur(28px); transition: opacity 0.25s;
  }
  &:hover::before { opacity: 0.14; }
  &::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    height: 2px; width: 0; background: ${({$a:r})=>r}; transition: width 0.4s ease;
  }
  &:hover::after { width: 100%; }
`,Or=o.div`display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;`,qr=o.div`
  width: 38px; height: 38px; border-radius: 10px; background: ${({$bg:r})=>r};
  display: flex; align-items: center; justify-content: center; font-size: 1rem;
  border: 1px solid ${({$border:r})=>r};
`,se=o.div`
  font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 600;
  padding: 3px 8px; border-radius: 20px; background: ${({$c:r})=>r}14;
  color: ${({$c:r})=>r}; border: 1px solid ${({$c:r})=>r}25; letter-spacing: 0.05em;
`,_r=o.div`
  font-size: 2.6rem; font-weight: 800; color: white; line-height: 1.1; letter-spacing: -0.02em;
  animation: ${Ur} 0.5s ease ${({$d:r})=>r} both;
`,Xr=o.div`
  font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 500;
  color: rgba(255,255,255,0.28); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 3px;
`,Qr=o.div`
  margin-top: 14px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.04); overflow: hidden;
  div { height: 100%; border-radius: 2px; width: ${({$pct:r})=>r}%; background: ${({$c:r})=>r}; animation: ${nr} 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
`,Zr=o.div`
  display: grid; grid-template-columns: 1fr 300px; gap: 14px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`,G=o.div`
  background: #0a1525; border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px; padding: 20px;
  animation: ${or} 0.5s ease ${({$d:r})=>r||"0.15s"} both;
`,Q=o.div`display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;`,H=o.h3`
  font-size: 0.85rem; font-weight: 700; color: white;
  display: flex; align-items: center; gap: 8px;
  &::before { content: ''; width: 3px; height: 13px; border-radius: 2px; background: linear-gradient(180deg, #00d4ff, #8b5cf6); display: block; flex-shrink: 0; }
`,Kr=o.div`display: flex; gap: 4px;`,et=o.button`
  font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em;
  padding: 3px 9px; border-radius: 20px;
  border: 1px solid ${({$a:r})=>r?"rgba(0,212,255,0.45)":"rgba(255,255,255,0.07)"};
  background: ${({$a:r})=>r?"rgba(0,212,255,0.1)":"transparent"};
  color: ${({$a:r})=>r?"#00d4ff":"rgba(255,255,255,0.25)"};
  cursor: pointer; transition: all 0.18s;
  &:hover { border-color: rgba(0,212,255,0.3); color: rgba(0,212,255,0.7); }
`,rt=o.div`position: relative; height: 130px; display: flex; flex-direction: column;`,tt=o.svg`width: 100%; flex: 1; overflow: visible;`,ot=o.div`display: flex; justify-content: space-between; margin-top: 5px;`,nt=o.span`font-family: 'JetBrains Mono', monospace; font-size: 0.54rem; color: rgba(255,255,255,0.18); flex: 1; text-align: center;`,at=o.div`display: flex; gap: 16px; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.04);`,$e=o.div`display: flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: rgba(255,255,255,0.35);`,Ce=o.div`width: 8px; height: 3px; border-radius: 2px; background: ${({$c:r})=>r};`,it=o.div`display: flex; gap: 20px; margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.04);`,st=o.div`display: flex; flex-direction: column; gap: 2px;`,lt=o.span`font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; text-transform: uppercase;`,ct=o.span`font-size: 1.1rem; font-weight: 800; color: ${({$c:r})=>r||"white"};`,dt=o.div`position: relative; width: 140px; height: 140px; margin: 10px auto 18px;`,pt=o.div`position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;`,xt=o.div`font-size: 1.8rem; font-weight: 800; color: white; line-height: 1;`,gt=o.div`font-family: 'JetBrains Mono', monospace; font-size: 0.55rem; color: rgba(255,255,255,0.22); letter-spacing: 0.12em; margin-top: 2px;`,ht=o.div`display: flex; flex-direction: column; gap: 8px;`,ft=o.div`display: flex; align-items: center; justify-content: space-between;`,bt=o.div`display: flex; align-items: center; gap: 7px;`,mt=o.div`width: 7px; height: 7px; border-radius: 50%; background: ${({$c:r})=>r};`,ut=o.span`font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.38);`,jt=o.span`font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 700; color: ${({$c:r})=>r};`,yt=o.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`,vt=o.div`display: flex; flex-direction: column; gap: 10px; margin-top: 4px;`,wt=o.div`display: flex; flex-direction: column; gap: 4px;`,kt=o.div`display: flex; justify-content: space-between; align-items: center;`,$t=o.span`font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; color: rgba(255,255,255,0.5); letter-spacing: 0.06em; text-transform: capitalize;`,Ct=o.span`font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; font-weight: 700; color: ${({$c:r})=>r};`,St=o.div`height: 5px; background: rgba(255,255,255,0.04); border-radius: 3px; overflow: hidden;`,zt=o.div`
  height: 100%; width: ${({$pct:r})=>r}%; background: ${({$c:r})=>r};
  border-radius: 3px; animation: ${nr} 1s ease 0.3s both;
`,Mt=o.div`display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;`,O=o.div`
  padding: 14px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05); border-radius: 10px;
  display: flex; flex-direction: column; gap: 4px;
  border-left: 3px solid ${({$c:r})=>r};
`,q=o.div`font-size: 1.5rem; font-weight: 800; color: white; line-height: 1; letter-spacing: -0.02em;`,_=o.div`font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; text-transform: uppercase;`,Se=o.div`font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 600; color: ${({$up:r})=>r?"#10d9a8":"#f472b6"}; margin-top: 1px;`,It=o.div`display: grid; gap: 14px;`,Bt=o.div`display: flex; flex-direction: column; gap: 2px; max-height: 280px; overflow-y: auto;`,Dt=o.div`
  display: flex; align-items: flex-start; gap: 10px; padding: 9px 10px; border-radius: 8px;
  transition: background 0.18s; animation: ${Yr} 0.35s ease ${({$d:r})=>r} both;
  &:hover { background: rgba(0,212,255,0.04); }
`,Pt=o.div`
  width: 30px; height: 30px; border-radius: 8px; background: ${({$bg:r})=>r};
  display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: white; flex-shrink: 0;
`,Lt=o.div`flex: 1; min-width: 0;`,Et=o.div`font-size: 0.78rem; font-weight: 700; color: white; display: flex; align-items: center; gap: 5px;`,Nt=o.div`width: 5px; height: 5px; border-radius: 50%; background: #00d4ff; animation: ${Jr} 2s ease-in-out infinite;`,At=o.div`font-family: 'JetBrains Mono', monospace; font-size: 0.64rem; color: rgba(255,255,255,0.28); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,Tt=o.div`font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.15); margin-top: 1px;`,le=o.div`text-align: center; padding: 32px 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: rgba(255,255,255,0.15);`,ce=o.div`display: flex; align-items: center; justify-content: center; padding: 28px;`,de=o.div`width: 18px; height: 18px; border: 2px solid rgba(0,212,255,0.15); border-top-color: #00d4ff; border-radius: 50%; animation: ${Vr} 0.8s linear infinite;`,V=r=>r?r?.toDate?r.toDate().getTime():typeof r=="object"&&r.seconds?r.seconds*1e3:r instanceof Date?r.getTime():typeof r=="number"?r>1e10?r:r*1e3:typeof r=="string"&&new Date(r).getTime()||0:0,Ft=r=>{const i=Date.now()-V(r),f=Math.floor(i/6e4);if(f<1)return"just now";if(f<60)return`${f}m ago`;const l=Math.floor(f/60);return l<24?`${l}h ago`:`${Math.floor(l/24)}d ago`},ze=["linear-gradient(135deg,#00d4ff,#8b5cf6)","linear-gradient(135deg,#f472b6,#8b5cf6)","linear-gradient(135deg,#10d9a8,#00d4ff)","linear-gradient(135deg,#f59e0b,#f97316)","linear-gradient(135deg,#a78bfa,#f472b6)"],Rt=({segs:r,size:i=140,stroke:f=22})=>{const l=(i-f)/2,y=2*Math.PI*l;let n=0;return e.jsxs("svg",{width:i,height:i,style:{transform:"rotate(-90deg)"},children:[e.jsx("circle",{cx:i/2,cy:i/2,r:l,fill:"none",stroke:"rgba(255,255,255,0.04)",strokeWidth:f}),r.map((g,m)=>{const v=g.pct/100*y,h=e.jsx("circle",{cx:i/2,cy:i/2,r:l,fill:"none",stroke:g.color,strokeWidth:f,strokeDasharray:`${v} ${y-v}`,strokeDashoffset:-n},m);return n+=v,h})]})},fe=(r,i,f)=>{if(!r||r.length<2)return"";const l=Math.max(...r,1),y=i/(r.length-1);return r.map((n,g)=>`${g===0?"M":"L"} ${(g*y).toFixed(1)} ${(f-n/l*(f-6)).toFixed(1)}`).join(" ")},Me=(r,i,f)=>!r||r.length<2?"":`${fe(r,i,f)} L ${i} ${f} L 0 ${f} Z`,Ut=async()=>{const r=localStorage.getItem("adminToken"),i=r?{Authorization:`Bearer ${r}`}:{},f=await fetch(`${Rr}/api/admin/analytics`,{headers:i});if(!f.ok){const l=f.status;let y="Failed to fetch analytics";try{y=(await f.json()).error||y}catch{}throw console.error(`Analytics API [${l}]:`,y),new Error(y)}return f.json()},Jt=(r,i)=>{const f=Date.now(),l=i*864e5,y=f-l,n=(r||[]).filter(s=>V(s.timestamp)>=y),g={};for(let s=i-1;s>=0;s--){const $=new Date(f-s*864e5),I=`${$.getMonth()+1}/${$.getDate()}`;g[I]={visits:0,interactions:0}}n.forEach(s=>{const $=new Date(V(s.timestamp)),I=`${$.getMonth()+1}/${$.getDate()}`;g[I]&&(s.type==="visit"?g[I].visits++:s.type==="interaction"&&g[I].interactions++)});const m=Object.keys(g),v=m.map(s=>g[s].visits),h=m.map(s=>g[s].interactions),u={};n.filter(s=>s.type==="interaction"&&s.section).forEach(s=>{u[s.section]=(u[s.section]||0)+1});const c=n.filter(s=>s.type==="visit").length,j=n.filter(s=>s.type==="interaction").length,t=(r||[]).filter(s=>{const $=V(s.timestamp);return $>=y-l&&$<y}),x=t.filter(s=>s.type==="visit").length,a=t.filter(s=>s.type==="interaction").length;return{labels:m,visits:v,interact:h,sections:u,totalVisits:c,totalInteract:j,trendV:x?Math.round((c-x)/x*100):null,trendI:a?Math.round((j-a)/a*100):null}},Yt={home:"#00d4ff",about:"#8b5cf6",projects:"#f472b6",skills:"#10d9a8",experience:"#f59e0b",contact:"#a78bfa","contact-form":"#ff6b6b"},Ie=r=>Yt[r]||"#00d4ff",Vt=[{key:"projects",label:"Projects",icon:"◇",accent:"#00d4ff",bg:"rgba(0,212,255,0.1)",border:"rgba(0,212,255,0.18)",delta:"portfolio",pct:72},{key:"skills",label:"Skills",icon:"◉",accent:"#8b5cf6",bg:"rgba(139,92,246,0.1)",border:"rgba(139,92,246,0.18)",delta:"listed",pct:85},{key:"experiences",label:"Experiences",icon:"◎",accent:"#f472b6",bg:"rgba(244,114,182,0.1)",border:"rgba(244,114,182,0.18)",delta:"history",pct:60},{key:"education",label:"Education",icon:"◍",accent:"#10d9a8",bg:"rgba(16,217,168,0.1)",border:"rgba(16,217,168,0.18)",delta:"academic",pct:50},{key:"certifications",label:"Certifications",icon:"◆",accent:"#f59e0b",bg:"rgba(245,158,11,0.1)",border:"rgba(245,158,11,0.18)",delta:"earned",pct:65},{key:"messages",label:"Messages",icon:"◻",accent:"#a78bfa",bg:"rgba(167,139,250,0.1)",border:"rgba(167,139,250,0.18)",delta:"unread",pct:0}],Wt=()=>{const[r,i]=b.useState(null),[f,l]=b.useState([]),[y,n]=b.useState(null),[g,m]=b.useState(!0),[v,h]=b.useState(!0),[u,c]=b.useState("7D");b.useEffect(()=>{(async()=>{try{const[p,S,ye,ve,we,ke]=await Promise.allSettled([Ge(),He(),Oe(),qe(),_e(),Xe()]),cr=p.status==="fulfilled"?p.value:[],dr=S.status==="fulfilled"?S.value:[],pr=ye.status==="fulfilled"?ye.value:[],ae=ve.status==="fulfilled"?ve.value:[],xr=we.status==="fulfilled"?we.value:[],gr=ke.status==="fulfilled"?ke.value:[];i({projects:cr?.length||0,skills:dr?.length||0,experiences:pr?.length||0,messages:ae?.length||0,education:xr?.length||0,certifications:gr?.length||0,unread:(ae||[]).filter(ie=>!ie.read).length}),l([...ae].sort((ie,hr)=>V(hr.timestamp)-V(ie.timestamp)).slice(0,8))}catch(p){console.error(p)}finally{m(!1)}})()},[]),b.useEffect(()=>{(async()=>{h(!0);try{n(await Ut())}catch(p){console.error(p),n([])}finally{h(!1)}})()},[]);const j=u==="7D"?7:u==="30D"?30:90,t=b.useMemo(()=>Jt(y,j),[y,j]),x=r?r.projects+r.skills+r.experiences+r.education+r.certifications:0,a=r?[{label:"Projects",pct:x?Math.round(r.projects/x*100):0,color:"#00d4ff"},{label:"Skills",pct:x?Math.round(r.skills/x*100):0,color:"#8b5cf6"},{label:"Experiences",pct:x?Math.round(r.experiences/x*100):0,color:"#f472b6"},{label:"Education",pct:x?Math.round(r.education/x*100):0,color:"#10d9a8"},{label:"Certs",pct:x?Math.round(r.certifications/x*100):0,color:"#f59e0b"}]:[],s=Vt.map(p=>({...p,delta:p.key==="messages"?r?`${r.unread} unread`:"—":p.delta,pct:p.key==="messages"?r?Math.round(r.unread/Math.max(r.messages,1)*100):0:p.pct})),$=Object.entries(t.sections||{}).sort((p,S)=>S[1]-p[1]).slice(0,7),I=$[0]?.[1]||1,D=400,d=100,B=fe(t.visits,D,d),F=fe(t.interact,D,d),ne=Me(t.visits,D,d),ir=Me(t.interact,D,d),sr=Math.ceil((t.labels?.length||1)/7),lr=(t.visits?.length||0)>=2;return e.jsxs(e.Fragment,{children:[e.jsx(Fr,{}),e.jsxs(Wr,{children:[e.jsx(Gr,{children:s.map((p,S)=>e.jsxs(Hr,{$a:p.accent,$d:`${S*.06}s`,children:[e.jsxs(Or,{children:[e.jsx(qr,{$bg:p.bg,$border:p.border,children:p.icon}),e.jsx(se,{$c:p.accent,children:p.delta})]}),g?e.jsx(W,{$h:"44px",$w:"50%"}):e.jsx(_r,{$d:`${S*.06+.1}s`,children:r?.[p.key]??0}),e.jsx(Xr,{children:p.label}),e.jsx(Qr,{$pct:g?0:p.pct,$c:p.accent,children:e.jsx("div",{})})]},p.key))}),e.jsxs(Zr,{children:[e.jsxs(G,{$d:"0.14s",children:[e.jsxs(Q,{children:[e.jsx(H,{children:"Visitors & Interactions"}),e.jsx(Kr,{children:["7D","30D","90D"].map(p=>e.jsx(et,{$a:u===p,onClick:()=>c(p),children:p},p))})]}),v?e.jsx(ce,{children:e.jsx(de,{})}):lr?e.jsxs(rt,{children:[e.jsxs(tt,{viewBox:`0 0 ${D} ${d}`,preserveAspectRatio:"none",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"gV",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#00d4ff",stopOpacity:"0.3"}),e.jsx("stop",{offset:"100%",stopColor:"#00d4ff",stopOpacity:"0"})]}),e.jsxs("linearGradient",{id:"gI",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#8b5cf6",stopOpacity:"0.22"}),e.jsx("stop",{offset:"100%",stopColor:"#8b5cf6",stopOpacity:"0"})]})]}),[.25,.5,.75].map(p=>e.jsx("line",{x1:"0",y1:d*p,x2:D,y2:d*p,stroke:"rgba(255,255,255,0.04)",strokeWidth:"1"},p)),e.jsx("path",{d:ne,fill:"url(#gV)"}),e.jsx("path",{d:ir,fill:"url(#gI)"}),e.jsx("path",{d:B,fill:"none",stroke:"#00d4ff",strokeWidth:"1.8",strokeLinejoin:"round",strokeLinecap:"round"}),e.jsx("path",{d:F,fill:"none",stroke:"#8b5cf6",strokeWidth:"1.8",strokeLinejoin:"round",strokeLinecap:"round",strokeDasharray:"4 2"})]}),e.jsx(ot,{children:(t.labels||[]).map((p,S)=>e.jsx(nt,{children:S%sr===0?p:""},S))})]}):e.jsxs(le,{style:{padding:"24px 0",lineHeight:2},children:["// no analytics data yet",e.jsx("br",{}),e.jsx("span",{style:{fontSize:"0.6rem",opacity:.4},children:"data appears once visitors land on your portfolio"})]}),e.jsxs(at,{children:[e.jsxs($e,{children:[e.jsx(Ce,{$c:"#00d4ff"}),"Visitors"]}),e.jsxs($e,{children:[e.jsx(Ce,{$c:"#8b5cf6"}),"Interactions"]})]}),e.jsx(it,{children:[{lbl:"visitors",val:v?"—":t.totalVisits,c:"#00d4ff"},{lbl:"interactions",val:v?"—":t.totalInteract,c:"#8b5cf6"},{lbl:"engage rate",val:v?"—":t.totalVisits?`${Math.round(t.totalInteract/t.totalVisits*100)}%`:"0%",c:"#10d9a8"}].map(p=>e.jsxs(st,{children:[e.jsx(lt,{children:p.lbl}),e.jsx(ct,{$c:p.c,children:p.val})]},p.lbl))})]}),e.jsxs(G,{$d:"0.2s",children:[e.jsx(H,{children:"Content Split"}),e.jsxs(dt,{children:[g?e.jsx(W,{$h:"140px",$w:"140px",style:{borderRadius:"50%"}}):e.jsx(Rt,{segs:a}),e.jsxs(pt,{children:[e.jsx(xt,{children:x}),e.jsx(gt,{children:"TOTAL"})]})]}),e.jsx(ht,{children:a.map(p=>e.jsxs(ft,{children:[e.jsxs(bt,{children:[e.jsx(mt,{$c:p.color}),e.jsx(ut,{children:p.label})]}),e.jsxs(jt,{$c:p.color,children:[p.pct,"%"]})]},p.label))})]})]}),e.jsxs(yt,{children:[e.jsxs(G,{$d:"0.24s",children:[e.jsxs(Q,{children:[e.jsx(H,{children:"Section Clicks"}),!v&&e.jsxs(se,{$c:"#00d4ff",children:[Object.values(t.sections||{}).reduce((p,S)=>p+S,0)," total"]})]}),v?e.jsx(ce,{children:e.jsx(de,{})}):$.length===0?e.jsx(le,{children:"// no interaction data yet"}):e.jsx(vt,{children:$.map(([p,S])=>e.jsxs(wt,{children:[e.jsxs(kt,{children:[e.jsx($t,{children:p}),e.jsx(Ct,{$c:Ie(p),children:S})]}),e.jsx(St,{children:e.jsx(zt,{$pct:Math.round(S/I*100),$c:Ie(p)})})]},p))})]}),e.jsxs(G,{$d:"0.28s",children:[e.jsx(Q,{children:e.jsx(H,{children:"Analytics Summary"})}),v?e.jsx(ce,{children:e.jsx(de,{})}):e.jsxs(Mt,{children:[e.jsxs(O,{$c:"#00d4ff",children:[e.jsx(q,{children:t.totalVisits}),e.jsx(_,{children:"Total Visits"}),t.trendV!==null&&e.jsxs(Se,{$up:t.trendV>=0,children:[t.trendV>=0?"↑":"↓"," ",Math.abs(t.trendV),"% vs prev"]})]}),e.jsxs(O,{$c:"#8b5cf6",children:[e.jsx(q,{children:t.totalInteract}),e.jsx(_,{children:"Interactions"}),t.trendI!==null&&e.jsxs(Se,{$up:t.trendI>=0,children:[t.trendI>=0?"↑":"↓"," ",Math.abs(t.trendI),"% vs prev"]})]}),e.jsxs(O,{$c:"#10d9a8",children:[e.jsx(q,{children:t.totalVisits?`${Math.round(t.totalInteract/t.totalVisits*100)}%`:"0%"}),e.jsx(_,{children:"Engage Rate"})]}),e.jsxs(O,{$c:"#f59e0b",children:[e.jsx(q,{style:{fontSize:"1rem",letterSpacing:"-0.01em"},children:$[0]?.[0]||"—"}),e.jsx(_,{children:"Top Section"})]}),e.jsxs(O,{$c:"#f472b6",style:{gridColumn:"1 / -1"},children:[e.jsxs(q,{style:{fontSize:"0.9rem"},children:[u," window"]}),e.jsxs(_,{children:[t.visits?.reduce((p,S)=>p+S,0)||0," visits ·"," ",t.interact?.reduce((p,S)=>p+S,0)||0," clicks ·"," ",Object.keys(t.sections||{}).length," sections reached"]})]})]})]})]}),e.jsx(It,{children:e.jsxs(G,{children:[e.jsxs(Q,{children:[e.jsx(H,{children:"Latest Messages"}),r?.unread>0&&e.jsxs(se,{$c:"#00d4ff",children:[r.unread," new"]})]}),e.jsx(Bt,{children:g?[...Array(4)].map((p,S)=>e.jsxs("div",{style:{display:"flex",gap:10,padding:"9px 10px"},children:[e.jsx(W,{$h:"30px",$w:"30px",style:{borderRadius:8,flexShrink:0}}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:5},children:[e.jsx(W,{$h:"10px",$w:"35%"}),e.jsx(W,{$h:"9px",$w:"70%"})]})]},S)):f.length>0?f.map((p,S)=>e.jsxs(Dt,{$d:`${S*.04}s`,children:[e.jsx(Pt,{$bg:ze[S%ze.length],children:(p.name||"?")[0].toUpperCase()}),e.jsxs(Lt,{children:[e.jsxs(Et,{children:[p.name,!p.read&&e.jsx(Nt,{})]}),e.jsx(At,{children:p.message}),e.jsxs(Tt,{children:[Ft(p.timestamp)," · ",p.email]})]})]},p.id)):e.jsx(le,{children:"// no messages yet"})})]})})]})]})},Gt=z`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`,Ht=o.div`
  animation: ${Gt} 0.4s ease both;
`,Ot=o.div`
  width: 38px; height: 38px;
  border-radius: 7px;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;

  img { width: 100%; height: 100%; object-fit: cover; }
`,qt=o.div`
  flex: 1;
  min-width: 0;
  .name { font-size: 0.85rem; font-weight: 700; color: white; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .meta { font-size: 0.72rem; color: rgba(255,255,255,0.3); margin-top: 2px; font-family: 'JetBrains Mono', monospace; }
`,_t=o.div`
  width: 10px; height: 10px;
  border-radius: 50%;
  background: ${({$c:r})=>r};
  border: 1px solid rgba(255,255,255,0.15);
  flex-shrink: 0;
`,Xt=o(L)`
  max-height: 75vh;
  overflow-y: auto;
`,Qt=({onDataUpdate:r})=>{const[i,f]=b.useState([]),[l,y]=b.useState(null),[n,g]=b.useState(!1),[m,v]=b.useState(""),[h,u]=b.useState(""),[c,j]=b.useState({name:"",category:"Fullstack",desc:"",tech:"",type:"Web",accent:"#00d4ff",status:"Completed",live:"",github:"",image:""});b.useEffect(()=>{t()},[]);const t=async()=>{try{f(await Ge()||[])}catch(d){console.error(d)}},x=d=>{y(d),j({name:d.name||"",category:d.category||"Fullstack",desc:d.desc||"",tech:Array.isArray(d.tech)?d.tech.join(", "):d.tech||"",type:d.type||"Web",accent:d.accent||"#00d4ff",status:d.status||"Completed",live:d.live||"",github:d.github||"",image:d.image||""}),v(d.image||""),u(d.image||"")},a=(d,B)=>j(F=>({...F,[d]:B})),s=d=>{const B=d.target.value.trim();v(B),u(B||"")},$=async d=>{d.preventDefault(),g(!0);try{const B=c.tech.split(",").map(ne=>ne.trim()).filter(Boolean);let F={...c,tech:B};m&&(F.image=await mr(m)),l?await ur(l.id,F):await jr(F),t(),D(),r?.()}catch(B){console.error(B),alert(B.message)}finally{g(!1)}},I=async d=>{if(window.confirm("Delete this project?"))try{await br(d),t(),D(),r?.()}catch(B){console.error(B)}},D=()=>{y(null),v(""),u(""),j({name:"",category:"Fullstack",desc:"",tech:"",type:"Web",accent:"#00d4ff",status:"Completed",live:"",github:"",image:""})};return e.jsx(Ht,{children:e.jsxs(re,{children:[e.jsxs(E,{children:[e.jsxs(te,{children:[e.jsxs(P,{children:["Projects (",i.length,")"]}),e.jsx(M,{variant:"ghost",sm:!0,onClick:D,children:"+ New"})]}),e.jsxs(je,{children:[i.map(d=>e.jsxs(ue,{selected:l?.id===d.id,onClick:()=>x(d),children:[e.jsx(Ot,{children:d.image?e.jsx("img",{src:d.image,alt:d.name}):"📷"}),e.jsxs(qt,{children:[e.jsx("div",{className:"name",children:d.name}),e.jsxs("div",{className:"meta",children:[d.category," · ",d.type]})]}),e.jsx(_t,{$c:d.accent||"#00d4ff"}),e.jsx(M,{variant:"danger",sm:!0,onClick:B=>{B.stopPropagation(),I(d.id)},children:"Delete"})]},d.id)),i.length===0&&e.jsx(Y,{children:"// no projects yet"})]})]}),e.jsxs(E,{children:[e.jsx(P,{children:l?"Edit Project":"New Project"}),e.jsx(Xt,{children:e.jsx("form",{onSubmit:$,children:e.jsxs(X,{children:[e.jsxs(w,{children:[e.jsx(k,{children:"Image URL"}),e.jsx(C,{type:"text",value:m,onChange:s,placeholder:"https://example.com/image.jpg",disabled:n}),h&&e.jsx(Tr,{h:"160px",children:e.jsx("img",{src:h,alt:"preview"})})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Project Name *"}),e.jsx(C,{required:!0,value:c.name,onChange:d=>a("name",d.target.value),placeholder:"e.g., E-Commerce Platform",disabled:n})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Category"}),e.jsx(C,{value:c.category,onChange:d=>a("category",d.target.value),placeholder:"Fullstack, Frontend, Backend...",disabled:n})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Description *"}),e.jsx(me,{required:!0,value:c.desc,onChange:d=>a("desc",d.target.value),placeholder:"Describe your project...",disabled:n})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Technologies"}),e.jsx(C,{value:c.tech,onChange:d=>a("tech",d.target.value),placeholder:"React, Node.js, MongoDB (comma-separated)",disabled:n}),c.tech&&e.jsx(er,{children:c.tech.split(",").map(d=>d.trim()).filter(Boolean).map(d=>e.jsx(rr,{children:d},d))})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Type"}),e.jsx(C,{value:c.type,onChange:d=>a("type",d.target.value),placeholder:"Web, Mobile, Desktop",disabled:n})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Status"}),e.jsx(C,{value:c.status,onChange:d=>a("status",d.target.value),placeholder:"Completed, In Progress...",disabled:n})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Accent Color"}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx(C,{type:"color",value:c.accent,onChange:d=>a("accent",d.target.value),style:{width:60,flexShrink:0},disabled:n}),e.jsx(C,{value:c.accent,onChange:d=>a("accent",d.target.value),disabled:n})]})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Live URL"}),e.jsx(C,{value:c.live,onChange:d=>a("live",d.target.value),placeholder:"https://example.com",disabled:n})]}),e.jsxs(w,{children:[e.jsx(k,{children:"GitHub URL"}),e.jsx(C,{value:c.github,onChange:d=>a("github",d.target.value),placeholder:"https://github.com/...",disabled:n})]}),e.jsxs(oe,{stretch:!0,children:[e.jsx(M,{variant:"primary",type:"submit",disabled:n,children:n?"Saving...":l?"Update Project":"Create Project"}),l&&e.jsx(M,{variant:"ghost",type:"button",onClick:D,disabled:n,children:"Clear"})]})]})})})]})]})})},Zt=z`
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
`,Kt=o.div`
  animation: ${Zt} 0.4s ease both;
`,eo=o.div`
  width: 34px; height: 34px;
  border-radius: 8px;
  background: ${({$bg:r})=>r};
  border: 1px solid ${({$border:r})=>r};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({$c:r})=>r};
  font-size: 0.95rem;
  flex-shrink: 0;
`,ro=o.div`
  flex: 1;
  min-width: 0;
  .name { font-size: 0.85rem; font-weight: 700; color: white; }
  .meta { font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-top: 2px; font-family:'JetBrains Mono',monospace; }
`,Be=o.div`
  height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
  margin-top: 4px;

  div {
    height: 100%;
    border-radius: 2px;
    background: ${({$c:r})=>r};
    width: ${({$w:r})=>r}%;
  }
`,De=["java","js","react","vuejs","angular","python","node","php","html5","css3","sass","docker","git","github","gitlab","aws","google","microsoft","apple","linux","ubuntu","android","swift","kotlin","figma","firebase","mongodb","wordpress","npm"],Pe=["database","server","code","terminal","bug","cog","cubes","cloud","lock","microchip","chart-line","layer-group","puzzle-piece","wrench","bolt","robot","brain","infinity","sitemap","plug","wifi","shield-halved","network-wired"],to=o.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,oo=o.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,no=o.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: ${({$bg:r})=>r};
  border: 1px solid ${({$border:r})=>r};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({$c:r})=>r};
  font-size: 1rem;
`,ao=o.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
`,io=o.div`
  display: flex;
  gap: 5px;
`,Le=o.button`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.68rem;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.18s;
  border: 1px solid ${({$a:r})=>r?"rgba(0,212,255,0.4)":"rgba(255,255,255,0.1)"};
  background: ${({$a:r})=>r?"rgba(0,212,255,0.12)":"transparent"};
  color: ${({$a:r})=>r?"#00d4ff":"rgba(255,255,255,0.35)"};
  &:hover { border-color:rgba(0,212,255,0.35); color:#00d4ff; }
`,so=o.input`
  padding: 7px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 7px;
  color: white;
  font-size: 0.82rem;
  font-family: 'JetBrains Mono', monospace;
  &:focus { outline:none; border-color:rgba(0,212,255,0.4); }
  &::placeholder { color:rgba(255,255,255,0.2); }
`,lo=o.div`
  display: grid;
  grid-template-columns: repeat(8,1fr);
  gap: 5px;
  max-height: 160px;
  overflow-y: auto;
`,co=o.button`
  width: 34px; height: 34px;
  border-radius: 7px;
  border: 1px solid ${({$s:r})=>r?"rgba(0,212,255,0.5)":"rgba(255,255,255,0.07)"};
  background: ${({$s:r})=>r?"rgba(0,212,255,0.15)":"rgba(255,255,255,0.03)"};
  color: ${({$s:r})=>r?"#00d4ff":"rgba(255,255,255,0.45)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color:rgba(0,212,255,0.4); color:#00d4ff; background:rgba(0,212,255,0.08); }
`,Ee=o.p`
  grid-column:1/-1;
  text-align:center;
  padding:16px 0;
  font-family:'JetBrains Mono',monospace;
  font-size:0.72rem;
  color:rgba(255,255,255,0.2);
`,po=({value:r,onChange:i,color:f})=>{const[l,y]=b.useState("brands"),[n,g]=b.useState(""),[m,v]=b.useState(!1),h=l==="brands"?De:Pe,u=l==="brands"?"fab":"fas",c=h.filter(s=>s.includes(n.toLowerCase())),j=ge(r),t=f||"#00d4ff",x=`${t}14`,a=`${t}28`;return b.useEffect(()=>{const s=[...De.map($=>({prefix:"fab",name:$})),...Pe.map($=>({prefix:"fas",name:$}))];Promise.all(s.map(Qe)).then(()=>v(!0))},[]),e.jsxs(to,{children:[e.jsxs(oo,{children:[e.jsx(no,{$bg:x,$border:a,$c:t,children:j?e.jsx(xe,{icon:j}):e.jsx("span",{style:{fontSize:"0.55rem",color:"rgba(255,255,255,0.2)"},children:"none"})}),e.jsx(ao,{children:r?`${r.prefix} / ${r.name}`:"No icon selected"})]}),e.jsxs(io,{children:[e.jsx(Le,{$a:l==="brands",onClick:()=>{y("brands"),g("")},children:"Brands"}),e.jsx(Le,{$a:l==="solid",onClick:()=>{y("solid"),g("")},children:"Solid"})]}),e.jsx(so,{placeholder:"Search icons…",value:n,onChange:s=>g(s.target.value)}),e.jsx(lo,{children:m?c.length>0?c.map(s=>{const $=ge({prefix:u,name:s});if(!$)return null;const I=r?.prefix===u&&r?.name===s;return e.jsx(co,{title:s,$s:I,type:"button",onClick:()=>i({prefix:u,name:s}),children:e.jsx(xe,{icon:$})},s)}):e.jsx(Ee,{children:"No icons found"}):e.jsx(Ee,{children:"Loading icons…"})})]})},xo=({onDataUpdate:r})=>{const[i,f]=b.useState([]),[l,y]=b.useState(null),[n,g]=b.useState({name:"",category:"Frontend",level:80,color:"#00d4ff",icon:null,featured:!1,order:0});b.useEffect(()=>{m()},[]);const m=async()=>{try{const t=await He()||[];f(t),Promise.all(t.map(x=>x.icon?Qe(x.icon):null))}catch(t){console.error(t)}},v=t=>{y(t),g({name:t.name||"",category:t.category||"Frontend",level:t.level||80,color:t.color||"#00d4ff",icon:t.icon||null,featured:t.featured||!1,order:t.order||0})},h=(t,x)=>g(a=>({...a,[t]:x})),u=async t=>{t.preventDefault();try{l?await vr(l.id,n):await wr(n),m(),j(),r?.()}catch(x){console.error(x)}},c=async t=>{if(window.confirm("Delete this skill?"))try{await yr(t),m(),j(),r?.()}catch(x){console.error(x)}},j=()=>{y(null),g({name:"",category:"Frontend",level:80,color:"#00d4ff",icon:null,featured:!1,order:0})};return e.jsx(Kt,{children:e.jsxs(re,{children:[e.jsxs(E,{children:[e.jsxs(te,{children:[e.jsxs(P,{children:["Skills (",i.length,")"]}),e.jsx(M,{variant:"ghost",sm:!0,onClick:j,children:"+ New"})]}),e.jsxs(je,{children:[i.map(t=>{const x=ge(t.icon),a=t.color||"#00d4ff";return e.jsxs(ue,{selected:l?.id===t.id,onClick:()=>v(t),children:[e.jsx(eo,{$c:a,$bg:`${a}14`,$border:`${a}28`,children:x?e.jsx(xe,{icon:x}):"?"}),e.jsxs(ro,{children:[e.jsx("div",{className:"name",children:t.name}),e.jsx("div",{className:"meta",children:t.category}),e.jsx(Be,{$c:a,$w:t.level||0,children:e.jsx("div",{})})]}),e.jsxs(ee,{color:"gray",children:[t.level,"%"]}),e.jsx(M,{variant:"danger",sm:!0,onClick:s=>{s.stopPropagation(),c(t.id)},children:"Delete"})]},t.id)}),i.length===0&&e.jsx(Y,{children:"// no skills yet"})]})]}),e.jsxs(E,{children:[e.jsx(P,{children:l?"Edit Skill":"New Skill"}),e.jsx(L,{children:e.jsx("form",{onSubmit:u,children:e.jsxs(X,{children:[e.jsxs(w,{children:[e.jsx(k,{children:"Skill Name *"}),e.jsx(C,{required:!0,value:n.name,onChange:t=>h("name",t.target.value),placeholder:"e.g., React"})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Category"}),e.jsx(C,{value:n.category,onChange:t=>h("category",t.target.value),placeholder:"Frontend, Backend, DevOps…"})]}),e.jsxs(w,{children:[e.jsxs(k,{children:["Proficiency — ",n.level,"%"]}),e.jsx(C,{type:"range",min:"0",max:"100",value:n.level,onChange:t=>h("level",parseInt(t.target.value)),style:{padding:"4px 0",background:"transparent",border:"none"}}),e.jsx(Be,{$c:n.color,$w:n.level,children:e.jsx("div",{})})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Color"}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx(C,{type:"color",value:n.color,onChange:t=>h("color",t.target.value),style:{width:60,flexShrink:0}}),e.jsx(C,{value:n.color,onChange:t=>h("color",t.target.value)})]})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Icon"}),e.jsx(po,{value:n.icon,onChange:t=>h("icon",t),color:n.color})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Order"}),e.jsx(C,{type:"number",value:n.order,onChange:t=>h("order",parseInt(t.target.value))})]}),e.jsxs(w,{style:{flexDirection:"row",alignItems:"center",gap:10},children:[e.jsx("input",{type:"checkbox",id:"feat",checked:n.featured,onChange:t=>h("featured",t.target.checked),style:{width:16,height:16,cursor:"pointer",accentColor:"#00d4ff"}}),e.jsx(k,{htmlFor:"feat",style:{margin:0,cursor:"pointer"},children:"Featured (show in rings)"})]}),e.jsxs(oe,{stretch:!0,children:[e.jsx(M,{variant:"primary",type:"submit",children:l?"Update Skill":"Create Skill"}),l&&e.jsx(M,{variant:"ghost",type:"button",onClick:j,children:"Clear"})]})]})})})]})]})})},go=z`
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
`,ho=o.div`
  animation: ${go} 0.4s ease both;
`,fo=o.div`
  width: 34px; height: 34px;
  border-radius: 8px;
  background: rgba(139,92,246,0.1);
  border: 1px solid rgba(139,92,246,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`,bo=o.div`
  flex: 1;
  min-width: 0;
  .name { font-size:0.85rem; font-weight:700; color:white; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .meta { font-size:0.7rem; color:rgba(255,255,255,0.3); margin-top:2px; font-family:'JetBrains Mono',monospace; }
`,mo=({onDataUpdate:r})=>{const[i,f]=b.useState([]),[l,y]=b.useState(null),[n,g]=b.useState({role:"",company:"",type:"Full-time",date:"",current:!1,desc:"",tags:""});b.useEffect(()=>{m()},[]);const m=async()=>{try{f(await Oe()||[])}catch(t){console.error(t)}},v=t=>{y(t),g({role:t.role||"",company:t.company||"",type:t.type||"Full-time",date:t.date||"",current:t.current||!1,desc:t.desc||"",tags:Array.isArray(t.tags)?t.tags.join(", "):t.tags||""})},h=(t,x)=>g(a=>({...a,[t]:x})),u=async t=>{t.preventDefault();try{const x={...n,tags:n.tags.split(",").map(a=>a.trim()).filter(Boolean)};l?await $r(l.id,x):await Cr(x),m(),j(),r?.()}catch(x){console.error(x)}},c=async t=>{if(window.confirm("Delete this experience?"))try{await kr(t),m(),j(),r?.()}catch(x){console.error(x)}},j=()=>{y(null),g({role:"",company:"",type:"Full-time",date:"",current:!1,desc:"",tags:""})};return e.jsx(ho,{children:e.jsxs(re,{children:[e.jsxs(E,{children:[e.jsxs(te,{children:[e.jsxs(P,{children:["Experiences (",i.length,")"]}),e.jsx(M,{variant:"ghost",sm:!0,onClick:j,children:"+ New"})]}),e.jsxs(je,{children:[i.map(t=>e.jsxs(ue,{selected:l?.id===t.id,onClick:()=>v(t),children:[e.jsx(fo,{children:"◎"}),e.jsxs(bo,{children:[e.jsx("div",{className:"name",children:t.role}),e.jsxs("div",{className:"meta",children:[t.company," · ",t.type]})]}),t.current&&e.jsx(ee,{color:"green",children:"current"}),e.jsx(M,{variant:"danger",sm:!0,onClick:x=>{x.stopPropagation(),c(t.id)},children:"Delete"})]},t.id)),i.length===0&&e.jsx(Y,{children:"// no experiences yet"})]})]}),e.jsxs(E,{children:[e.jsx(P,{children:l?"Edit Experience":"New Experience"}),e.jsx(L,{children:e.jsx("form",{onSubmit:u,children:e.jsxs(X,{children:[e.jsxs(w,{children:[e.jsx(k,{children:"Job Title / Role *"}),e.jsx(C,{required:!0,value:n.role,onChange:t=>h("role",t.target.value),placeholder:"e.g., Senior Frontend Developer"})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Company"}),e.jsx(C,{value:n.company,onChange:t=>h("company",t.target.value),placeholder:"e.g., TechCorp Global"})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Employment Type"}),e.jsx(C,{value:n.type,onChange:t=>h("type",t.target.value),placeholder:"Full-time, Contract, Freelance…"})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Duration"}),e.jsx(C,{value:n.date,onChange:t=>h("date",t.target.value),placeholder:"Aug 2024 — Present"})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Description *"}),e.jsx(me,{required:!0,minH:"90px",value:n.desc,onChange:t=>h("desc",t.target.value),placeholder:"Responsibilities and achievements…"})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Skills Used"}),e.jsx(C,{value:n.tags,onChange:t=>h("tags",t.target.value),placeholder:"React, Node.js, AWS (comma-separated)"}),n.tags&&e.jsx(er,{children:n.tags.split(",").map(t=>t.trim()).filter(Boolean).map(t=>e.jsx(rr,{children:t},t))})]}),e.jsxs(w,{style:{flexDirection:"row",alignItems:"center",gap:10},children:[e.jsx("input",{type:"checkbox",id:"cur",checked:n.current,onChange:t=>h("current",t.target.checked),style:{width:16,height:16,cursor:"pointer",accentColor:"#10d9a8"}}),e.jsx(k,{htmlFor:"cur",style:{margin:0,cursor:"pointer"},children:"Currently Working Here"})]}),e.jsxs(oe,{stretch:!0,children:[e.jsx(M,{variant:"primary",type:"submit",children:l?"Update Experience":"Create Experience"}),l&&e.jsx(M,{variant:"ghost",type:"button",onClick:j,children:"Clear"})]})]})})})]})]})})},uo=z`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`,jo=o.div`animation: ${uo} 0.4s ease both;`,yo=o.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`,Ne=o.div`display: flex; flex-direction: column; gap: 20px;`,vo=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Ae=o.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
`,wo=o.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 580px;
  overflow-y: auto;
  padding-right: 6px;
  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 3px; }
  &::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.25); border-radius: 3px; }
`,ko=o.div`
  padding: 14px 16px;
  background: ${({$selected:r})=>r?"rgba(34,211,238,0.08)":"rgba(10,26,46,0.6)"};
  border: 1px solid ${({$selected:r})=>r?"rgba(34,211,238,0.4)":"rgba(34,211,238,0.12)"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  &:hover { border-color: rgba(34,211,238,0.3); background: rgba(10,26,46,0.8); }
`,$o=o.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: ${({$color:r})=>`${r}18`};
  border: 1px solid ${({$color:r})=>`${r}30`};
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
`,Co=o.div`
  flex: 1; min-width: 0;
  .name { font-size: 0.85rem; font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .meta { font-size: 0.7rem; color: rgba(255,255,255,0.35); margin-top: 2px; font-family: 'Space Mono', monospace; }
`,So=o.button`
  padding: 5px 10px;
  background: rgba(255,107,107,0.12);
  border: 1px solid rgba(255,107,107,0.25);
  border-radius: 4px;
  color: #ff6b6b;
  font-size: 0.72rem;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
  &:hover { background: rgba(255,107,107,0.25); }
`,zo=o.button`
  padding: 7px 16px;
  background: transparent;
  border: 1px solid rgba(34,211,238,0.3);
  border-radius: 8px;
  color: #22d3ee;
  font-size: 0.78rem;
  font-family: 'Space Mono', monospace;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { background: rgba(34,211,238,0.1); border-color: #22d3ee; }
`,Mo=o.p`
  text-align: center;
  color: rgba(255,255,255,0.25);
  font-size: 0.8rem;
  font-family: 'Space Mono', monospace;
  padding: 24px 0;
`,Io=o.div`
  padding: 24px;
  background: rgba(10,26,46,0.6);
  border: 1px solid rgba(34,211,238,0.12);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`,N=o.div`display: flex; flex-direction: column; gap: 5px;`,A=o.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: #22d3ee;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`,T=o.input`
  padding: 9px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(34,211,238,0.18);
  border-radius: 6px;
  color: white;
  font-size: 0.875rem;
  &:focus { outline: none; border-color: #22d3ee; background: rgba(34,211,238,0.06); }
  &[type="color"] { height: 38px; padding: 3px 8px; cursor: pointer; }
`,Bo=o.div`display: flex; gap: 10px; margin-top: 4px;`,Do=o.button`
  flex: 1;
  padding: 10px;
  background: linear-gradient(135deg, #22d3ee, #7b2fff);
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(34,211,238,0.25); }
`,Po=o.button`
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(34,211,238,0.25);
  border-radius: 6px;
  color: #22d3ee;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { background: rgba(34,211,238,0.08); border-color: #22d3ee; }
`,Lo=({onDataUpdate:r})=>{const[i,f]=b.useState([]),[l,y]=b.useState(null),[n,g]=b.useState({degree:"",school:"",field:"",year:"",grade:"",icon:"🎓",color:"#22d3ee",order:0});b.useEffect(()=>{m()},[]);const m=async()=>{try{f(await _e()||[])}catch(t){console.error(t)}},v=t=>{y(t),g({degree:t.degree||"",school:t.school||"",field:t.field||"",year:t.year||"",grade:t.grade||"",icon:t.icon||"🎓",color:t.color||"#22d3ee",order:t.order??0})},h=(t,x)=>g(a=>({...a,[t]:x})),u=async t=>{t.preventDefault();try{l?await zr(l.id,n):await Mr(n),m(),j(),r?.()}catch(x){console.error(x),alert(x.message)}},c=async t=>{if(window.confirm("Delete this education entry?"))try{await Sr(t),m(),j(),r?.()}catch(x){console.error(x),alert(x.message)}},j=()=>{y(null),g({degree:"",school:"",field:"",year:"",grade:"",icon:"🎓",color:"#22d3ee",order:0})};return e.jsx(jo,{children:e.jsxs(yo,{children:[e.jsxs(Ne,{children:[e.jsxs(vo,{children:[e.jsxs(Ae,{children:["Education (",i.length,")"]}),e.jsx(zo,{onClick:j,children:"+ New"})]}),e.jsx(wo,{children:i.length===0?e.jsx(Mo,{children:"// no education entries yet"}):i.map(t=>e.jsxs(ko,{$selected:l?.id===t.id,onClick:()=>v(t),children:[e.jsx($o,{$color:t.color||"#22d3ee",children:t.icon||"🎓"}),e.jsxs(Co,{children:[e.jsx("div",{className:"name",children:t.degree}),e.jsxs("div",{className:"meta",children:[t.school,t.year?` · ${t.year}`:""]})]}),e.jsx(So,{onClick:x=>{x.stopPropagation(),c(t.id)},children:"Delete"})]},t.id))})]}),e.jsxs(Ne,{children:[e.jsx(Ae,{children:l?"Edit Education":"New Education"}),e.jsxs(Io,{as:"form",onSubmit:u,children:[e.jsxs(N,{children:[e.jsx(A,{children:"Degree / Qualification *"}),e.jsx(T,{required:!0,value:n.degree,onChange:t=>h("degree",t.target.value),placeholder:"e.g., B.E. Computer Engineering"})]}),e.jsxs(N,{children:[e.jsx(A,{children:"School / University *"}),e.jsx(T,{required:!0,value:n.school,onChange:t=>h("school",t.target.value),placeholder:"e.g., Mumbai University"})]}),e.jsxs(N,{children:[e.jsx(A,{children:"Field of Study"}),e.jsx(T,{value:n.field,onChange:t=>h("field",t.target.value),placeholder:"e.g., Computer Science"})]}),e.jsxs(N,{children:[e.jsx(A,{children:"Year / Duration"}),e.jsx(T,{value:n.year,onChange:t=>h("year",t.target.value),placeholder:"e.g., 2020 — 2024"})]}),e.jsxs(N,{children:[e.jsx(A,{children:"Grade / CGPA"}),e.jsx(T,{value:n.grade,onChange:t=>h("grade",t.target.value),placeholder:"e.g., 8.5 CGPA / First Class"})]}),e.jsxs(N,{children:[e.jsx(A,{children:"Icon / Emoji"}),e.jsx(T,{value:n.icon,onChange:t=>h("icon",t.target.value),placeholder:"🎓",maxLength:2})]}),e.jsxs(N,{children:[e.jsx(A,{children:"Accent Color"}),e.jsx(T,{type:"color",value:n.color,onChange:t=>h("color",t.target.value)})]}),e.jsxs(N,{children:[e.jsx(A,{children:"Display Order"}),e.jsx(T,{type:"number",value:n.order,onChange:t=>h("order",parseInt(t.target.value)||0)})]}),e.jsxs(Bo,{children:[e.jsxs(Do,{type:"submit",children:[l?"Update":"Create"," Education"]}),l&&e.jsx(Po,{type:"button",onClick:j,children:"Clear"})]})]})]})]})})},Eo=z`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`,No=o.div`animation: ${Eo} 0.4s ease both;`,Ao=o.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`,Te=o.div`display: flex; flex-direction: column; gap: 20px;`,To=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Fe=o.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
`,Fo=o.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 580px;
  overflow-y: auto;
  padding-right: 6px;
  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 3px; }
  &::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.25); border-radius: 3px; }
`,Ro=o.div`
  padding: 14px 16px;
  background: ${({$selected:r})=>r?"rgba(34,211,238,0.08)":"rgba(10,26,46,0.6)"};
  border: 1px solid ${({$selected:r})=>r?"rgba(34,211,238,0.4)":"rgba(34,211,238,0.12)"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  &:hover { border-color: rgba(34,211,238,0.3); background: rgba(10,26,46,0.8); }
`,Uo=o.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: ${({color:r})=>`${r}18`};
  border: 1px solid ${({color:r})=>`${r}30`};
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
`,Jo=o.div`
  flex: 1; min-width: 0;
  .name { font-size: 0.85rem; font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .meta { font-size: 0.7rem; color: rgba(255,255,255,0.35); margin-top: 2px; font-family: 'Space Mono', monospace; }
`,Yo=o.button`
  padding: 5px 10px;
  background: rgba(255,107,107,0.12);
  border: 1px solid rgba(255,107,107,0.25);
  border-radius: 4px;
  color: #ff6b6b;
  font-size: 0.72rem;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
  &:hover { background: rgba(255,107,107,0.25); }
`,Vo=o.button`
  padding: 7px 16px;
  background: transparent;
  border: 1px solid rgba(34,211,238,0.3);
  border-radius: 8px;
  color: #22d3ee;
  font-size: 0.78rem;
  font-family: 'Space Mono', monospace;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { background: rgba(34,211,238,0.1); border-color: #22d3ee; }
`,Wo=o.p`
  text-align: center;
  color: rgba(255,255,255,0.25);
  font-size: 0.8rem;
  font-family: 'Space Mono', monospace;
  padding: 24px 0;
`,Go=o.div`
  padding: 24px;
  background: rgba(10,26,46,0.6);
  border: 1px solid rgba(34,211,238,0.12);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`,R=o.div`display: flex; flex-direction: column; gap: 5px;`,U=o.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: #22d3ee;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`,J=o.input`
  padding: 9px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(34,211,238,0.18);
  border-radius: 6px;
  color: white;
  font-size: 0.875rem;
  &:focus { outline: none; border-color: #22d3ee; background: rgba(34,211,238,0.06); }
  &[type="color"] { height: 38px; padding: 3px 8px; cursor: pointer; }
`,Ho=o.div`display: flex; gap: 10px; margin-top: 4px;`,Oo=o.button`
  flex: 1;
  padding: 10px;
  background: linear-gradient(135deg, #22d3ee, #7b2fff);
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(34,211,238,0.25); }
`,qo=o.button`
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(34,211,238,0.25);
  border-radius: 6px;
  color: #22d3ee;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { background: rgba(34,211,238,0.08); border-color: #22d3ee; }
`,_o=o.p`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
  margin-top: 3px;
  font-family: 'Space Mono', monospace;
`,Xo=({onDataUpdate:r})=>{const[i,f]=b.useState([]),[l,y]=b.useState(null),[n,g]=b.useState({name:"",issuer:"",year:"",link:"",icon:"🏆",color:"#22d3ee",order:0});b.useEffect(()=>{m()},[]);const m=async()=>{try{f(await Xe()||[])}catch(t){console.error(t)}},v=t=>{y(t),g({name:t.name||"",issuer:t.issuer||"",year:t.year||"",link:t.link||"",icon:t.icon||"🏆",color:t.color||"#22d3ee",order:t.order??0})},h=(t,x)=>g(a=>({...a,[t]:x})),u=async t=>{t.preventDefault();try{l?await Br(l.id,n):await Dr(n),m(),j(),r?.()}catch(x){console.error(x)}},c=async t=>{if(window.confirm("Delete this certification?"))try{await Ir(t),m(),j(),r?.()}catch(x){console.error(x)}},j=()=>{y(null),g({name:"",issuer:"",year:"",link:"",icon:"🏆",color:"#22d3ee",order:0})};return e.jsx(No,{children:e.jsxs(Ao,{children:[e.jsxs(Te,{children:[e.jsxs(To,{children:[e.jsxs(Fe,{children:["Certifications (",i.length,")"]}),e.jsx(Vo,{onClick:j,children:"+ New"})]}),e.jsx(Fo,{children:i.length===0?e.jsx(Wo,{children:"// no certifications yet"}):i.map(t=>e.jsxs(Ro,{$selected:l?.id===t.id,onClick:()=>v(t),children:[e.jsx(Uo,{color:t.color||"#22d3ee",children:t.icon||"🏆"}),e.jsxs(Jo,{children:[e.jsx("div",{className:"name",children:t.name}),e.jsxs("div",{className:"meta",children:[t.issuer,t.year?` · ${t.year}`:""]})]}),e.jsx(Yo,{onClick:x=>{x.stopPropagation(),c(t.id)},children:"Delete"})]},t.id))})]}),e.jsxs(Te,{children:[e.jsx(Fe,{children:l?"Edit Certification":"New Certification"}),e.jsxs(Go,{as:"form",onSubmit:u,children:[e.jsxs(R,{children:[e.jsx(U,{children:"Certification Name *"}),e.jsx(J,{required:!0,value:n.name,onChange:t=>h("name",t.target.value),placeholder:"e.g., AWS Solutions Architect"})]}),e.jsxs(R,{children:[e.jsx(U,{children:"Issuing Organization *"}),e.jsx(J,{required:!0,value:n.issuer,onChange:t=>h("issuer",t.target.value),placeholder:"e.g., Amazon Web Services"})]}),e.jsxs(R,{children:[e.jsx(U,{children:"Year Obtained"}),e.jsx(J,{value:n.year,onChange:t=>h("year",t.target.value),placeholder:"e.g., 2024"})]}),e.jsxs(R,{children:[e.jsx(U,{children:"Certificate URL"}),e.jsx(J,{type:"url",value:n.link,onChange:t=>h("link",t.target.value),placeholder:"https://credentials.example.com/..."}),e.jsx(_o,{children:"// Leave blank if no public link"})]}),e.jsxs(R,{children:[e.jsx(U,{children:"Icon / Emoji"}),e.jsx(J,{value:n.icon,onChange:t=>h("icon",t.target.value),placeholder:"🏆",maxLength:2})]}),e.jsxs(R,{children:[e.jsx(U,{children:"Accent Color"}),e.jsx(J,{type:"color",value:n.color,onChange:t=>h("color",t.target.value)})]}),e.jsxs(R,{children:[e.jsx(U,{children:"Display Order"}),e.jsx(J,{type:"number",value:n.order,onChange:t=>h("order",parseInt(t.target.value)||0)})]}),e.jsxs(Ho,{children:[e.jsxs(Oo,{type:"submit",children:[l?"Update":"Create"," Certification"]}),l&&e.jsx(qo,{type:"button",onClick:j,children:"Clear"})]})]})]})]})})},Qo=z`
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
`,Zo=o.div`
  animation: ${Qo} 0.4s ease both;
`,Ko=o(L)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,en=o.div`
  width: 100%;
  height: 260px;
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px dashed rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,rn=o.div`
  font-size: 4rem;
  opacity: 0.15;
`,tn=o(L)`
  padding: 16px;
  background: rgba(0,212,255,0.04);
  border-color: rgba(0,212,255,0.12);
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
`,on=({onDataUpdate:r})=>{const[i,f]=b.useState(!1),[l,y]=b.useState(!1),[n,g]=b.useState(""),[m,v]=b.useState(""),[h,u]=b.useState({bio:"",role:"",location:"",downloadCV:"",profileImage:""});b.useEffect(()=>{c()},[]);const c=async()=>{try{const a=await he();a&&(u({bio:a.bio||"",role:a.role||"",location:a.location||"",downloadCV:a.downloadCV||"",profileImage:a.profileImage||""}),a.profileImage&&(g(a.profileImage),v(a.profileImage)))}catch(a){console.error(a)}},j=(a,s)=>u($=>({...$,[a]:s})),t=a=>{const s=a.target.value.trim();g(s),v(s||"")},x=async a=>{a.preventDefault(),f(!0);try{let s={...h};n&&(s.profileImage=await Pr(n)),await Ze(s),y(!0),setTimeout(()=>y(!1),3e3),c(),r?.()}catch(s){console.error(s),alert(s.message)}finally{f(!1)}};return e.jsx(Zo,{children:e.jsxs(re,{children:[e.jsxs(E,{children:[e.jsx(P,{children:"Profile Image"}),e.jsxs(Ko,{children:[e.jsx(en,{children:m?e.jsx("img",{src:m,alt:"Profile"}):e.jsx(rn,{children:"👤"})}),e.jsxs(tn,{children:["📸 Upload a professional profile photo for the Hero section.",e.jsx("br",{}),"Recommended: 400×400px or larger · JPG, PNG, WebP"]})]})]}),e.jsxs(E,{children:[e.jsx(P,{children:"About & Profile"}),e.jsxs(L,{children:[l&&e.jsx(tr,{children:"✓ About section updated successfully!"}),e.jsx("form",{onSubmit:x,children:e.jsxs(X,{children:[e.jsxs(w,{children:[e.jsx(k,{children:"Profile Image URL"}),e.jsx(C,{type:"text",value:n,onChange:t,placeholder:"https://example.com/image.jpg",disabled:i}),e.jsx(Ar,{children:"Paste a direct image URL to update your profile photo"})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Your Role / Title"}),e.jsx(C,{value:h.role,onChange:a=>j("role",a.target.value),placeholder:"e.g., Full-Stack Developer",disabled:i})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Location"}),e.jsx(C,{value:h.location,onChange:a=>j("location",a.target.value),placeholder:"e.g., San Francisco, CA",disabled:i})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Bio / About You"}),e.jsx(me,{minH:"130px",value:h.bio,onChange:a=>j("bio",a.target.value),placeholder:"Tell visitors about yourself, your experience, and what you're passionate about…",disabled:i})]}),e.jsxs(w,{children:[e.jsx(k,{children:"Resume / CV URL"}),e.jsx(C,{value:h.downloadCV,onChange:a=>j("downloadCV",a.target.value),placeholder:"https://example.com/resume.pdf",disabled:i})]}),e.jsx(M,{variant:"primary",type:"submit",disabled:i,style:{width:"100%"},children:i?"Saving…":"Save About Section"})]})})]})]})]})})},nn=z`
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
`,an=o.div`
  max-width: 780px;
  animation: ${nn} 0.4s ease both;
`,sn=o.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 680px) { grid-template-columns: 1fr; }
`,ln=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  margin-top: 16px;
`,cn=o.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  background: rgba(0,212,255,0.05);
  border: 1px solid rgba(0,212,255,0.15);
  border-radius: 8px;
`,dn=o.span`
  font-size: 1.1rem;
  flex-shrink: 0;
`,pn=o.div`
  flex: 1;
  min-width: 0;
  .lbl { font-family:'JetBrains Mono',monospace; font-size:0.6rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.08em; }
  .val { font-size:0.82rem; color:white; margin-top:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
`,Re=[{key:"email",label:"Email Address",icon:"📧",type:"email",placeholder:"your@email.com",required:!0},{key:"phone",label:"Phone Number",icon:"📱",type:"tel",placeholder:"+91 0000000000"},{key:"location",label:"Location",icon:"📍",type:"text",placeholder:"City, Country"},{key:"linkedin",label:"LinkedIn",icon:"💼",type:"url",placeholder:"https://linkedin.com/in/..."},{key:"github",label:"GitHub",icon:"🐙",type:"url",placeholder:"https://github.com/..."},{key:"twitter",label:"Twitter / X",icon:"𝕏",type:"url",placeholder:"https://twitter.com/..."},{key:"instagram",label:"Instagram",icon:"📸",type:"url",placeholder:"https://instagram.com/..."},{key:"website",label:"Personal Website",icon:"🌐",type:"url",placeholder:"https://yoursite.com"}],xn=({onDataUpdate:r})=>{const[i,f]=b.useState(!1),[l,y]=b.useState(!1),[n,g]=b.useState({email:"",phone:"",location:"",linkedin:"",github:"",twitter:"",instagram:"",website:""});b.useEffect(()=>{m()},[]);const m=async()=>{try{const c=await he();c?.contact&&g(c.contact)}catch(c){console.error(c)}},v=(c,j)=>g(t=>({...t,[c]:j})),h=async c=>{c.preventDefault(),f(!0);try{const j=await he()||{};await Ze({...j,contact:n}),y(!0),setTimeout(()=>y(!1),3e3),r?.()}catch(j){console.error(j),alert(j.message)}finally{f(!1)}},u=Re.filter(c=>n[c.key]);return e.jsx(an,{children:e.jsxs(E,{gap:"16px",children:[e.jsxs(L,{children:[e.jsx(te,{children:e.jsx(P,{children:"Contact Information"})}),l&&e.jsx(tr,{children:"✓ Contact information updated successfully!"}),e.jsx("form",{onSubmit:h,children:e.jsxs(X,{children:[e.jsx(sn,{children:Re.map(c=>e.jsxs(w,{children:[e.jsxs(k,{children:[c.icon," ",c.label,c.required?" *":""]}),e.jsx(C,{type:c.type,value:n[c.key]||"",onChange:j=>v(c.key,j.target.value),placeholder:c.placeholder,disabled:i,required:c.required})]},c.key))}),e.jsxs(oe,{children:[e.jsx(M,{variant:"primary",type:"submit",disabled:i,children:i?"Saving…":"✓ Save Contact Information"}),e.jsx(M,{variant:"ghost",type:"button",onClick:m,disabled:i,children:"Reset"})]})]})})]}),u.length>0&&e.jsxs(L,{children:[e.jsx(P,{sm:!0,children:"Preview"}),e.jsx(ln,{children:u.map(c=>e.jsxs(cn,{children:[e.jsx(dn,{children:c.icon}),e.jsxs(pn,{children:[e.jsx("div",{className:"lbl",children:c.label}),e.jsx("div",{className:"val",children:n[c.key]})]})]},c.key))})]})]})})},ar=z`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`,gn=z`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
`,Ue=o.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;
  min-height: 600px;
  animation: ${ar} 0.4s ease both;

  @media (max-width: 1000px) { grid-template-columns: 1fr; }
`,Je=o(L)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,hn=o.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`,pe=o.div`
  padding: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  text-align: center;

  .val {
    font-size: 1.2rem;
    font-weight: 800;
    color: ${({$c:r})=>r||"white"};
    line-height: 1;
  }
  .lbl {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem;
    color: rgba(255,255,255,0.22);
    letter-spacing: 0.08em;
    margin-top: 3px;
    text-transform: uppercase;
  }
`,fn=o.div`
  height: 1px;
  background: rgba(255,255,255,0.05);
`,bn=o.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  flex: 1;
  max-height: 520px;
`,mn=o.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({$sel:r})=>r?"rgba(0,212,255,0.3)":"transparent"};
  background: ${({$sel:r})=>r?"rgba(0,212,255,0.08)":"rgba(255,255,255,0.02)"};
  cursor: pointer;
  text-align: left;
  transition: all 0.18s;
  position: relative;
  animation: ${gn} 0.3s ease ${({$d:r})=>r} both;
  width: 100%;

  &:hover {
    background: ${({$sel:r})=>r?"rgba(0,212,255,0.1)":"rgba(255,255,255,0.04)"};
    border-color: ${({$sel:r})=>r?"rgba(0,212,255,0.35)":"rgba(255,255,255,0.08)"};
  }
`,un=o.div`
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  border-radius: 0 2px 2px 0;
  background: #00d4ff;
  opacity: ${({$show:r})=>r?1:0};
`,jn=o.div`
  font-size: 0.82rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
`,yn=o.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  color: rgba(255,255,255,0.3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,vn=o.div`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Ye=o(L)`
  display: flex;
  flex-direction: column;
`,wn=o.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  animation: ${ar} 0.3s ease both;
`,kn=o.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`,$n=o.h2`
  font-size: 1.3rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  line-height: 1.3;
`,Cn=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
`,Z=o.div`
  padding: 10px 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;

  .label { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 3px; }
  .value { font-size: 0.85rem; color: white; font-weight: 600; word-break: break-all; }
`,Sn=o.div`
  flex: 1;
  padding: 20px 0;
`,zn=o.p`
  color: rgba(255,255,255,0.75);
  font-size: 0.92rem;
  line-height: 1.9;
  white-space: pre-wrap;
  word-break: break-word;
`,Mn=o.div`
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-wrap: wrap;
`,be=r=>r?r?.toDate?r.toDate().getTime():typeof r=="object"&&r.seconds?r.seconds*1e3:r instanceof Date?r.getTime():typeof r=="number"?r>1e10?r:r*1e3:typeof r=="string"&&new Date(r).getTime()||0:0,In=new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),Bn=r=>{try{const i=be(r);if(!i)return"";const f=new Date(i);return isNaN(f.getTime())?"":In.format(f)}catch{return""}},Dn=({onDataUpdate:r,onUnreadChange:i})=>{const[f,l]=b.useState([]),[y,n]=b.useState(!0),[g,m]=b.useState(null),[v,h]=b.useState(!1);b.useEffect(()=>{u()},[]);const u=async()=>{try{n(!0);const s=(await qe()||[]).sort((I,D)=>be(D.timestamp)-be(I.timestamp));l(s),s.length>0&&!g&&m(s[0].id);const $=s.filter(I=>!I.read).length;i?.($)}catch(a){console.error(a)}finally{n(!1)}},c=async()=>{if(g){h(!0);try{await Lr(g),l(a=>a.map(s=>s.id===g?{...s,read:!0}:s)),i?.(f.filter(a=>!a.read&&a.id!==g).length)}catch(a){console.error(a),alert(a.message)}finally{h(!1)}}},j=async()=>{if(!(!g||!window.confirm("Delete this message?"))){h(!0);try{await Er(g);const a=f.filter(s=>s.id!==g);l(a),m(a[0]?.id||null),i?.(a.filter(s=>!s.read).length),r?.()}catch(a){console.error(a),alert(a.message)}finally{h(!1)}}},t=f.find(a=>a.id===g),x=f.filter(a=>!a.read).length;return y?e.jsxs(Ue,{children:[e.jsx(Je,{children:[...Array(5)].map((a,s)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,padding:"12px",background:"rgba(255,255,255,0.02)",borderRadius:10},children:[e.jsx("div",{style:{height:11,background:"rgba(255,255,255,0.06)",borderRadius:4,width:"50%"}}),e.jsx("div",{style:{height:9,background:"rgba(255,255,255,0.04)",borderRadius:4,width:"80%"}})]},s))}),e.jsx(Ye,{children:e.jsx(Y,{children:"Loading messages..."})})]}):e.jsxs(Ue,{children:[e.jsxs(Je,{children:[e.jsx(P,{sm:!0,children:"Inbox"}),e.jsxs(hn,{children:[e.jsxs(pe,{children:[e.jsx("div",{className:"val",children:f.length}),e.jsx("div",{className:"lbl",children:"Total"})]}),e.jsxs(pe,{$c:"#00d4ff",children:[e.jsx("div",{className:"val",style:{color:"#00d4ff"},children:x}),e.jsx("div",{className:"lbl",children:"Unread"})]}),e.jsxs(pe,{$c:"#10d9a8",children:[e.jsx("div",{className:"val",style:{color:"#10d9a8"},children:f.length-x}),e.jsx("div",{className:"lbl",children:"Read"})]})]}),e.jsx(fn,{}),e.jsxs(bn,{children:[f.map((a,s)=>e.jsxs(mn,{$sel:g===a.id,$d:`${s*.03}s`,onClick:()=>m(a.id),children:[e.jsx(un,{$show:!a.read}),e.jsxs(jn,{children:[a.name||"Unknown",!a.read&&e.jsx(ee,{color:"cyan",children:"new"})]}),e.jsx(yn,{children:a.email}),e.jsx(vn,{children:a.message})]},a.id)),f.length===0&&e.jsx(Y,{children:"// no messages yet"})]})]}),e.jsx(Ye,{children:t?e.jsxs(wn,{children:[e.jsxs(kn,{children:[e.jsx($n,{children:t.subject||"(No Subject)"}),e.jsxs(Cn,{children:[e.jsxs(Z,{children:[e.jsx("div",{className:"label",children:"From"}),e.jsx("div",{className:"value",children:t.name})]}),e.jsxs(Z,{children:[e.jsx("div",{className:"label",children:"Email"}),e.jsx("div",{className:"value",children:t.email})]}),e.jsxs(Z,{children:[e.jsx("div",{className:"label",children:"Received"}),e.jsx("div",{className:"value",style:{fontSize:"0.78rem"},children:Bn(t.timestamp)})]}),e.jsxs(Z,{children:[e.jsx("div",{className:"label",children:"Status"}),e.jsx("div",{className:"value",children:e.jsx(ee,{color:t.read?"gray":"cyan",children:t.read?"Read":"Unread"})})]})]})]}),e.jsx(Sn,{children:e.jsx(zn,{children:t.message})}),e.jsxs(Mn,{children:[!t.read&&e.jsx(M,{variant:"success",onClick:c,disabled:v,children:"✓ Mark as Read"}),e.jsx(M,{variant:"danger",onClick:j,disabled:v,children:"Delete"})]})]},t.id):e.jsx(Y,{children:"Select a message to view it"})})]})},Pn=Ve`${We}`,Ln=z`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`,En=z`
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
`,Nn=o.div`
  display: flex;
  min-height: 100vh;
  background: #03080f;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: -200px; left: -100px;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  &::after {
    content: '';
    position: fixed;
    bottom: -200px; right: -100px;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`,An=o.aside`
  width: 230px;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background: rgba(6,13,24,0.95);
  border-right: 1px solid rgba(255,255,255,0.05);
  padding: 28px 16px 24px;
  z-index: 10;
  backdrop-filter: blur(12px);

  @media (max-width: 900px) { display: none; }
`,Tn=o.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px 28px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 20px;
`,Fn=o.div`
  width: 34px; height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, #00d4ff, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; font-weight: 800; color: white; flex-shrink: 0;
`,Rn=o.div`
  .name { font-size: 0.9rem; font-weight: 800; color: white; line-height: 1.1; letter-spacing: -0.02em; }
  .sub  { font-size: 0.65rem; color: rgba(255,255,255,0.3); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }
`,Un=o.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
`,Jn=o.div`
  font-size: 0.6rem; font-weight: 600;
  color: rgba(255,255,255,0.22);
  letter-spacing: 0.14em; text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  padding: 0 10px; margin: 12px 0 6px;
`,Yn=o.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1px solid ${({$active:r})=>r?"rgba(0,212,255,0.2)":"transparent"};
  background: ${({$active:r})=>r?"rgba(0,212,255,0.1)":"transparent"};
  color: ${({$active:r})=>r?"#00d4ff":"rgba(255,255,255,0.45)"};
  font-size: 0.84rem;
  font-weight: ${({$active:r})=>r?"700":"500"};
  cursor: pointer;
  transition: all 0.18s ease;
  text-align: left;
  width: 100%;
  position: relative;

  &:hover {
    background: ${({$active:r})=>r?"rgba(0,212,255,0.12)":"rgba(255,255,255,0.04)"};
    color: ${({$active:r})=>r?"#00d4ff":"rgba(255,255,255,0.7)"};
  }

  .icon  { font-size: 0.95rem; width: 20px; text-align: center; flex-shrink: 0; }

  .badge {
    margin-left: auto;
    padding: 1px 7px;
    border-radius: 10px;
    background: rgba(244,63,94,0.15);
    border: 1px solid rgba(244,63,94,0.25);
    color: #f43f5e;
    font-size: 0.62rem; font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }

  ${({$active:r})=>r&&`
    &::before {
      content: '';
      position: absolute;
      left: -16px; top: 50%;
      transform: translateY(-50%);
      width: 3px; height: 18px;
      border-radius: 0 2px 2px 0;
      background: linear-gradient(180deg, #00d4ff, #8b5cf6);
    }
  `}
`,Vn=o.div`
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 16px;
  flex-shrink: 0;
`,Wn=o.div`
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
`,Gn=o.div`
  width: 30px; height: 30px; border-radius: 8px;
  background: linear-gradient(135deg, #00d4ff, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 800; color: white; flex-shrink: 0;
`,Hn=o.div`
  flex: 1; min-width: 0;
  .name { font-size: 0.8rem; font-weight: 700; color: white; }
  .role { font-size: 0.65rem; color: rgba(255,255,255,0.3); font-family: 'JetBrains Mono', monospace; }
`,On=o.button`
  width: 28px; height: 28px; border-radius: 7px;
  border: 1px solid rgba(244,63,94,0.2);
  background: rgba(244,63,94,0.08);
  color: #f43f5e;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.9rem; transition: all 0.2s; flex-shrink: 0;
  &:hover { background: rgba(244,63,94,0.18); border-color: rgba(244,63,94,0.4); }
`,qn=o.main`
  flex: 1; min-width: 0;
  display: flex; flex-direction: column;
  position: relative; z-index: 1;
`,_n=o.header`
  height: 64px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  background: rgba(3,8,15,0.7);
  backdrop-filter: blur(12px);
  position: sticky; top: 0; z-index: 9; flex-shrink: 0;
`,Xn=o.div`
  display: flex; align-items: center; gap: 8px;
  font-size: 0.82rem; color: rgba(255,255,255,0.35);
  .sep     { opacity: 0.3; }
  .current { color: white; font-weight: 600; }
`,Qn=o.div`display: flex; align-items: center; gap: 10px;`,Zn=o.div`
  display: flex; align-items: center; gap: 6px;
  font-size: 0.72rem; color: rgba(255,255,255,0.3);
  font-family: 'JetBrains Mono', monospace;

  &::before {
    content: '';
    width: 6px; height: 6px; border-radius: 50%;
    background: #10d9a8; box-shadow: 0 0 6px #10d9a8;
    animation: ${En} 2s infinite;
  }
`,Kn=o.button`
  padding: 7px 14px;
  background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.25);
  border-radius: 7px; color: #f43f5e; font-size: 0.78rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  &:hover { background: rgba(244,63,94,0.2); }
`,ea=o.div`
  padding: 32px;
  animation: ${Ln} 0.35s ease both;
  @media (max-width: 900px) { padding: 20px; }
`,ra=o.div`
  display: none;
  overflow-x: auto;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(6,13,24,0.95);
  &::-webkit-scrollbar { display: none; }
  @media (max-width: 900px) { display: flex; gap: 4px; }
`,ta=o.button`
  padding: 12px 14px;
  border: none;
  border-bottom: 2px solid ${({$active:r})=>r?"#00d4ff":"transparent"};
  background: transparent;
  color: ${({$active:r})=>r?"#00d4ff":"rgba(255,255,255,0.35)"};
  font-size: 0.78rem; font-weight: 600;
  cursor: pointer; white-space: nowrap; transition: color 0.2s;
`,K=[{id:"dashboard",label:"Dashboard",icon:"◈",group:"Overview"},{id:"projects",label:"Projects",icon:"◇",group:"Content"},{id:"skills",label:"Skills",icon:"◉",group:"Content"},{id:"experiences",label:"Experiences",icon:"◎",group:"Content"},{id:"education",label:"Education",icon:"◍",group:"Content"},{id:"certifications",label:"Certifications",icon:"◆",group:"Content"},{id:"about",label:"About",icon:"◐",group:"Profile"},{id:"contact",label:"Contact",icon:"◑",group:"Profile"},{id:"messages",label:"Messages",icon:"◻",group:"Inbox",badge:!0}],la=({onLogout:r})=>{const[i,f]=b.useState("dashboard"),[l,y]=b.useState(0),[n,g]=b.useState(0),m=()=>y(u=>u+1),v=K.find(u=>u.id===i),h=[...new Set(K.map(u=>u.group))];return e.jsxs(e.Fragment,{children:[e.jsx(Pn,{}),e.jsxs(Nn,{children:[e.jsxs(An,{children:[e.jsxs(Tn,{children:[e.jsx(Fn,{children:"A"}),e.jsxs(Rn,{children:[e.jsx("div",{className:"name",children:"Portfolio"}),e.jsx("div",{className:"sub",children:"Admin Panel"})]})]}),e.jsx(Un,{children:h.map(u=>e.jsxs(fr.Fragment,{children:[e.jsx(Jn,{children:u}),K.filter(c=>c.group===u).map(c=>e.jsxs(Yn,{$active:i===c.id?1:0,onClick:()=>f(c.id),children:[e.jsx("span",{className:"icon",children:c.icon}),c.label,c.badge&&n>0&&e.jsx("span",{className:"badge",children:n})]},c.id))]},u))}),e.jsx(Vn,{children:e.jsxs(Wn,{children:[e.jsx(Gn,{children:"A"}),e.jsxs(Hn,{children:[e.jsx("div",{className:"name",children:"Admin"}),e.jsx("div",{className:"role",children:"super user"})]}),e.jsx(On,{onClick:r,title:"Logout",children:"↪"})]})})]}),e.jsxs(qn,{children:[e.jsxs(_n,{children:[e.jsxs(Xn,{children:[e.jsx("span",{children:"Portfolio"}),e.jsx("span",{className:"sep",children:"/"}),e.jsx("span",{className:"current",children:v?.label})]}),e.jsxs(Qn,{children:[e.jsx(Zn,{children:"live"}),e.jsx(Kn,{onClick:r,children:"Logout"})]})]}),e.jsx(ra,{children:K.map(u=>e.jsxs(ta,{$active:i===u.id?1:0,onClick:()=>f(u.id),children:[u.icon," ",u.label]},u.id))}),e.jsxs(ea,{children:[i==="dashboard"&&e.jsx(Wt,{}),i==="projects"&&e.jsx(Qt,{onDataUpdate:m,refreshTrigger:l}),i==="skills"&&e.jsx(xo,{onDataUpdate:m,refreshTrigger:l}),i==="experiences"&&e.jsx(mo,{onDataUpdate:m,refreshTrigger:l}),i==="education"&&e.jsx(Lo,{onDataUpdate:m,refreshTrigger:l}),i==="certifications"&&e.jsx(Xo,{onDataUpdate:m,refreshTrigger:l}),i==="about"&&e.jsx(on,{onDataUpdate:m,refreshTrigger:l}),i==="contact"&&e.jsx(xn,{onDataUpdate:m}),i==="messages"&&e.jsx(Dn,{onDataUpdate:m,onUnreadChange:g})]},i)]})]})]})};export{la as default};
