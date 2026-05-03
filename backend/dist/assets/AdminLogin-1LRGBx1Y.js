import{j as e}from"./vendor-icons-DxrxNb7R.js";import{r as i}from"./vendor-react-h-VQqIco.js";import{l as y,c as t,p as o}from"./vendor-styled-B7-NiZQN.js";import{D as v}from"./index-CW4aj3IM.js";import{g as w}from"./Admintheme-DZS5IzV4.js";const j=y`${w}`,k=o`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-12px) rotate(1deg); }
  66%       { transform: translateY(-6px) rotate(-1deg); }
`,z=o`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`,B=o`
  0%   { transform: translateY(-100%); opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.6; }
  100% { transform: translateY(400px); opacity: 0; }
`,S=o`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`,Y=o`
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`,$=t.div`
  min-height: 100vh;
  background: #03080f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;

  /* grid lines bg */
  background-image:
    linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 900px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, rgba(139,92,246,0.04) 40%, transparent 70%);
    pointer-events: none;
  }
`,l=t.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: ${k} ${({dur:a})=>a||"6s"} ease-in-out infinite;
  animation-delay: ${({delay:a})=>a||"0s"};

  &.o1 {
    width: 280px; height: 280px;
    top: -80px; left: -80px;
    background: radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%);
  }
  &.o2 {
    width: 200px; height: 200px;
    bottom: -60px; right: 10%;
    background: radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%);
  }
  &.o3 {
    width: 140px; height: 140px;
    top: 30%; right: -40px;
    background: radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%);
  }
`,A=t.div`
  position: relative;
  z-index: 1;
  animation: ${z} 0.6s cubic-bezier(0.22,1,0.36,1) both;
`,M=t.div`
  padding: 1px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(0,212,255,0.3), rgba(139,92,246,0.2), rgba(0,212,255,0.1));
  background-size: 200% 200%;
  animation: ${Y} 4s linear infinite;
`,E=t.div`
  width: 420px;
  max-width: 100%;
  padding: 44px 40px;
  background: rgba(6,13,24,0.97);
  border-radius: 19px;
  position: relative;
  overflow: hidden;

  /* scan line effect */
  &::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent);
    animation: ${B} 5s ease-in-out infinite 1s;
    pointer-events: none;
  }
`,J=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`,P=t.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #00d4ff, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 800;
  color: white;
`,C=t.div`
  .title {
    font-size: 1.05rem;
    font-weight: 800;
    color: white;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .sub {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.3);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.08em;
  }
`,F=t.h1`
  font-size: 1.6rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  margin-bottom: 6px;
  line-height: 1.2;
`,L=t.p`
  font-size: 0.85rem;
  color: rgba(255,255,255,0.35);
  margin-bottom: 32px;
  font-family: 'JetBrains Mono', monospace;
`,N=t.span`
  animation: ${S} 1s step-end infinite;
  color: #00d4ff;
`,x=t.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
`,b=t.label`
  font-size: 0.68rem;
  font-weight: 600;
  color: rgba(0,212,255,0.7);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
`,f=t.input`
  padding: 12px 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: white;
  font-size: 0.92rem;
  font-family: 'JetBrains Mono', monospace;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(0,212,255,0.5);
    background: rgba(0,212,255,0.04);
    box-shadow: 0 0 0 4px rgba(0,212,255,0.08);
  }

  &::placeholder { color: rgba(255,255,255,0.18); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,G=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  background: rgba(244,63,94,0.08);
  border: 1px solid rgba(244,63,94,0.25);
  border-radius: 8px;
  color: #f43f5e;
  font-size: 0.82rem;
  margin-bottom: 18px;
  font-family: 'JetBrains Mono', monospace;
`,I=t.button`
  width: 100%;
  padding: 13px 20px;
  border: none;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.02em;
  position: relative;
  overflow: hidden;

  background: linear-gradient(135deg, #00d4ff, #8b5cf6);
  color: white;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #8b5cf6, #00d4ff);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::before { opacity: 1; }
  &:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,212,255,0.3); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

  span { position: relative; z-index: 1; }
`,D=t.div`
  margin-top: 24px;
  text-align: center;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.15);
  font-family: 'JetBrains Mono', monospace;
`,U=({onLogin:a})=>{const[s,h]=i.useState(""),[d,c]=i.useState(""),[p,g]=i.useState(""),[n,m]=i.useState(!1),u=async r=>{r.preventDefault(),g(""),m(!0);try{await v(s,d),localStorage.setItem("adminAuth","true"),a()}catch{g("Invalid credentials. Please try again."),c("")}finally{m(!1)}};return e.jsxs(e.Fragment,{children:[e.jsx(j,{}),e.jsxs($,{children:[e.jsx(l,{className:"o1",dur:"7s",delay:"0s"}),e.jsx(l,{className:"o2",dur:"9s",delay:"1.5s"}),e.jsx(l,{className:"o3",dur:"6s",delay:"3s"}),e.jsx(A,{children:e.jsx(M,{children:e.jsxs(E,{children:[e.jsxs(J,{children:[e.jsx(P,{children:"A"}),e.jsxs(C,{children:[e.jsx("div",{className:"title",children:"Portfolio Admin"}),e.jsx("div",{className:"sub",children:"v2.0 · secure access"})]})]}),e.jsxs(F,{children:["Welcome back",e.jsx(N,{children:"_"})]}),e.jsx(L,{children:"// authenticate to manage your portfolio"}),e.jsxs("form",{onSubmit:u,children:[p&&e.jsxs(G,{children:["⚠ ",p]}),e.jsxs(x,{children:[e.jsx(b,{htmlFor:"email",children:"Email address"}),e.jsx(f,{id:"email",type:"email",value:s,onChange:r=>h(r.target.value),placeholder:"admin@example.com",disabled:n,autoFocus:!0})]}),e.jsxs(x,{children:[e.jsx(b,{htmlFor:"password",children:"Password"}),e.jsx(f,{id:"password",type:"password",value:d,onChange:r=>c(r.target.value),placeholder:"••••••••••••",disabled:n})]}),e.jsx(I,{type:"submit",disabled:n||!d.trim()||!s.trim(),children:e.jsx("span",{children:n?"Authenticating...":"Access Admin Panel →"})})]}),e.jsx(D,{children:"protected admin area · unauthorized access prohibited"})]})})})]})]})};export{U as default};
