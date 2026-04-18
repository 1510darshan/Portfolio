import styled, { keyframes } from 'styled-components';

// ── Animations ─────────────────────────────────────────────────
export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ── Layout Shells ──────────────────────────────────────────────
export const PageWrap = styled.div`
  animation: ${fadeUp} 0.4s ease both;
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || '20px'};
`;

// ── Cards ──────────────────────────────────────────────────────
export const Card = styled.div`
  background: #0a1525;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: ${({ pad }) => pad || '22px'};
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
`;

// ── Section title ──────────────────────────────────────────────
export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: ${({ sm }) => sm ? '0.85rem' : '1rem'};
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: -0.01em;

  &::before {
    content: '';
    width: 3px;
    height: ${({ sm }) => sm ? '12px' : '16px'};
    border-radius: 2px;
    background: linear-gradient(180deg, #00d4ff, #8b5cf6);
    display: block;
    flex-shrink: 0;
  }
`;

// ── Form elements ──────────────────────────────────────────────
export const FormCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(0,212,255,0.8);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
`;

export const Helper = styled.span`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.28);
  font-family: 'JetBrains Mono', monospace;
`;

export const Input = styled.input`
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
`;

export const TextArea = styled.textarea`
  padding: 10px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  color: white;
  font-size: 0.88rem;
  font-family: inherit;
  resize: vertical;
  min-height: ${({ minH }) => minH || '100px'};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(0,212,255,0.5);
    background: rgba(0,212,255,0.05);
    box-shadow: 0 0 0 3px rgba(0,212,255,0.08);
  }

  &::placeholder { color: rgba(255,255,255,0.2); }
`;

// ── Buttons ────────────────────────────────────────────────────
export const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: ${({ sm }) => sm ? '7px 14px' : '11px 20px'};
  border-radius: 8px;
  font-size: ${({ sm }) => sm ? '0.75rem' : '0.88rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  border: none;
  letter-spacing: 0.01em;

  /* variants */
  ${({ variant }) => variant === 'primary' && `
    background: linear-gradient(135deg, #00d4ff, #8b5cf6);
    color: white;
    &:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,212,255,0.25); }
    &:active { transform: translateY(0); }
  `}
  ${({ variant }) => variant === 'ghost' && `
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    &:hover { border-color: rgba(0,212,255,0.4); color: #00d4ff; background: rgba(0,212,255,0.06); }
  `}
  ${({ variant }) => variant === 'danger' && `
    background: rgba(244,63,94,0.1);
    border: 1px solid rgba(244,63,94,0.25);
    color: #f43f5e;
    &:hover { background: rgba(244,63,94,0.2); border-color: rgba(244,63,94,0.5); }
  `}
  ${({ variant }) => variant === 'success' && `
    background: rgba(16,217,168,0.1);
    border: 1px solid rgba(16,217,168,0.25);
    color: #10d9a8;
    &:hover { background: rgba(16,217,168,0.2); }
  `}
  ${({ variant }) => variant === 'cyan-outline' && `
    background: transparent;
    border: 1px solid rgba(0,212,255,0.35);
    color: #00d4ff;
    &:hover { background: rgba(0,212,255,0.1); border-color: rgba(0,212,255,0.6); }
  `}

  &:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
`;

export const BtnRow = styled.div`
  display: flex;
  gap: 10px;
  ${({ stretch }) => stretch && 'button, a { flex: 1; }'}
`;

// ── List items ─────────────────────────────────────────────────
export const ListItem = styled.div`
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

  ${({ selected }) => selected && `
    background: rgba(0,212,255,0.08);
    border-color: rgba(0,212,255,0.35);
  `}
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 580px;
  overflow-y: auto;
  padding-right: 4px;
`;

// ── Skeleton ───────────────────────────────────────────────────
export const Skel = styled.div`
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 25%,
    rgba(255,255,255,0.07) 50%,
    rgba(255,255,255,0.03) 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.5s infinite;
  height: ${({ h }) => h || '12px'};
  width: ${({ w }) => w || '100%'};
  flex-shrink: 0;
`;

// ── Badge / Chip ───────────────────────────────────────────────
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  font-family: 'JetBrains Mono', monospace;

  ${({ color }) => {
    const map = {
      cyan:   'background: rgba(0,212,255,0.12); color: #00d4ff; border: 1px solid rgba(0,212,255,0.25);',
      violet: 'background: rgba(139,92,246,0.12); color: #8b5cf6; border: 1px solid rgba(139,92,246,0.25);',
      green:  'background: rgba(16,217,168,0.12); color: #10d9a8; border: 1px solid rgba(16,217,168,0.25);',
      amber:  'background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.25);',
      red:    'background: rgba(244,63,94,0.12); color: #f43f5e; border: 1px solid rgba(244,63,94,0.25);',
      gray:   'background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.1);',
    };
    return map[color] || map.gray;
  }}
`;

// ── Divider ────────────────────────────────────────────────────
export const Divider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin: ${({ my }) => my ? `${my}px 0` : '0'};
`;

// ── Empty state ────────────────────────────────────────────────
export const Empty = styled.div`
  text-align: center;
  padding: 48px 20px;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.2);
  font-family: 'JetBrains Mono', monospace;
`;

// ── Tag cloud ──────────────────────────────────────────────────
export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 4px;
`;

export const Tag = styled.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.68rem;
  background: rgba(0,212,255,0.08);
  color: rgba(0,212,255,0.7);
  border: 1px solid rgba(0,212,255,0.15);
  font-family: 'JetBrains Mono', monospace;
`;

// ── Toast / Success message ────────────────────────────────────
export const Toast = styled.div`
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
  animation: ${fadeUp} 0.3s ease;
`;

// ── Image Preview ──────────────────────────────────────────────
export const ImgPreview = styled.div`
  width: 100%;
  height: ${({ h }) => h || '200px'};
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
`;