import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { getAllProjects, getAllSkills, getAllExperiences, getAllMessages } from '../../../Services/ManageData';
import { globalCSS } from './Admintheme';
import { Skel } from './Adminshared';

const GlobalStyle = createGlobalStyle`${globalCSS}`;

// ── Animations ─────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const countUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const barGrow = keyframes`
  from { width: 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
`;

// ── Layout ──────────────────────────────────────────────────────
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

// ── Stat cards ─────────────────────────────────────────────────
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  @media (max-width: 1100px) { grid-template-columns: repeat(2,1fr); }
  @media (max-width: 560px)  { grid-template-columns: 1fr; }
`;

const StatCard = styled.div`
  padding: 20px;
  background: #0a1525;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  position: relative;
  overflow: hidden;
  cursor: default;
  animation: ${fadeUp} 0.5s ease ${({ $d }) => $d} both;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ $a }) => $a}33;
    box-shadow: 0 16px 40px ${({ $a }) => $a}10;
  }

  /* top-right blob */
  &::before {
    content: '';
    position: absolute;
    top: -24px; right: -24px;
    width: 90px; height: 90px;
    border-radius: 50%;
    background: ${({ $a }) => $a};
    opacity: 0.07;
    filter: blur(28px);
    transition: opacity 0.25s;
  }
  &:hover::before { opacity: 0.14; }

  /* bottom bar */
  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    height: 2px; width: 0;
    background: ${({ $a }) => $a};
    transition: width 0.4s ease;
    border-radius: 0 2px 2px 0;
  }
  &:hover::after { width: 100%; }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const IconBox = styled.div`
  width: 38px; height: 38px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border: 1px solid ${({ $border }) => $border};
`;

const Chip = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  background: ${({ $c }) => $c}14;
  color: ${({ $c }) => $c};
  border: 1px solid ${({ $c }) => $c}25;
  letter-spacing: 0.05em;
`;

const StatVal = styled.div`
  font-size: 2.6rem;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: ${countUp} 0.5s ease ${({ $d }) => $d} both;
`;

const StatLbl = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 500;
  color: rgba(255,255,255,0.28);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 3px;
`;

const Progress = styled.div`
  margin-top: 14px;
  height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,0.04);
  overflow: hidden;

  div {
    height: 100%;
    border-radius: 2px;
    width: ${({ $pct }) => $pct}%;
    background: ${({ $c }) => $c};
    animation: ${barGrow} 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s both;
  }
`;

// ── Mid row ────────────────────────────────────────────────────
const MidRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 14px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

// ── Panel ──────────────────────────────────────────────────────
const Panel = styled.div`
  background: #0a1525;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 20px;
  animation: ${fadeUp} 0.5s ease ${({ $d }) => $d || '0.15s'} both;
`;

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const PanelTitle = styled.h3`
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 3px; height: 13px;
    border-radius: 2px;
    background: linear-gradient(180deg, #00d4ff, #8b5cf6);
    display: block;
    flex-shrink: 0;
  }
`;

// ── Activity chart ─────────────────────────────────────────────
const PeriodChips = styled.div`
  display: flex;
  gap: 4px;
`;

const PeriodChip = styled.button`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 3px 9px;
  border-radius: 20px;
  border: 1px solid ${({ $a }) => $a ? 'rgba(0,212,255,0.45)' : 'rgba(255,255,255,0.07)'};
  background: ${({ $a }) => $a ? 'rgba(0,212,255,0.1)' : 'transparent'};
  color: ${({ $a }) => $a ? '#00d4ff' : 'rgba(255,255,255,0.25)'};
  cursor: pointer;
  transition: all 0.18s;
  &:hover { border-color: rgba(0,212,255,0.3); color: rgba(0,212,255,0.7); }
`;

const BarWrap = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 7px;
  height: 120px;
`;

const BarCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  height: 100%;
`;

const BarOuter = styled.div`
  flex: 1;
  width: 100%;
  background: rgba(255,255,255,0.03);
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`;

const BarInner = styled.div`
  width: 100%;
  height: ${({ $h }) => $h}%;
  background: ${({ $today }) =>
    $today ? 'linear-gradient(180deg, #00d4ff, #8b5cf6)' : 'rgba(0,212,255,0.22)'};
  border-radius: 4px 4px 0 0;
  transition: height 0.8s cubic-bezier(0.34,1.2,0.64,1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 30%;
    background: rgba(255,255,255,0.06);
    border-radius: 4px 4px 0 0;
  }
`;

const BarLbl = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.56rem;
  color: rgba(255,255,255,0.2);
`;

const MetricsRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,0.04);
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MetricLbl = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.58rem;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const MetricVal = styled.span`
  font-size: 1.1rem;
  font-weight: 800;
  color: ${({ $c }) => $c || 'white'};
`;

// ── Donut ──────────────────────────────────────────────────────
const DonutWrap = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  margin: 10px auto 18px;
`;

const DonutCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DonutNum = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  line-height: 1;
`;

const DonutSub = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  color: rgba(255,255,255,0.22);
  letter-spacing: 0.12em;
  margin-top: 2px;
`;

const LegList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LegRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LegLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const LegDot = styled.div`
  width: 7px; height: 7px;
  border-radius: 50%;
  background: ${({ $c }) => $c};
`;

const LegName = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.38);
`;

const LegPct = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  font-weight: 700;
  color: ${({ $c }) => $c};
`;

// ── Bottom row ─────────────────────────────────────────────────
const BottomRow = styled.div`
  display: grid;
  gap: 14px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

// ── Feed ───────────────────────────────────────────────────────
const FeedScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 280px;
  overflow-y: auto;
`;

const FeedRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 8px;
  transition: background 0.18s;
  animation: ${slideIn} 0.35s ease ${({ $d }) => $d} both;
  &:hover { background: rgba(0,212,255,0.04); }
`;

const FeedAv = styled.div`
  width: 30px; height: 30px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
`;

const FeedBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const FeedName = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UnreadDot = styled.div`
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #00d4ff;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const FeedText = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.64rem;
  color: rgba(255,255,255,0.28);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FeedMeta = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.58rem;
  color: rgba(255,255,255,0.15);
  margin-top: 1px;
`;

const Empty = styled.div`
  text-align: center;
  padding: 32px 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.15);
`;

// ── Quick Actions ──────────────────────────────────────────────
const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 13px;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: ${fadeUp} 0.4s ease ${({ $d }) => $d} both;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: ${({ $c }) => $c};
    transform: scaleY(0);
    transition: transform 0.2s ease;
    transform-origin: center;
    border-radius: 0 2px 2px 0;
  }

  &:hover {
    border-color: ${({ $c }) => $c}28;
    background: ${({ $c }) => $c}06;
    transform: translateX(4px);
    &::before { transform: scaleY(1); }
  }
`;

const ActionIcon = styled.div`
  width: 32px; height: 32px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const ActionText = styled.div`
  flex: 1;
  .title { font-size: 0.78rem; font-weight: 700; color: white; }
  .desc  { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: rgba(255,255,255,0.25); margin-top: 1px; }
`;

const ActionArrow = styled.div`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.14);
  transition: color 0.18s, transform 0.18s;
  ${ActionRow}:hover & {
    color: ${({ $c }) => $c};
    transform: translateX(3px);
  }
`;

// ── Helpers ────────────────────────────────────────────────────
const toMs = (ts) => {
  if (!ts) return 0;
  if (ts?.toDate) return ts.toDate().getTime();
  if (typeof ts === 'object' && ts.seconds) return ts.seconds * 1000;
  if (ts instanceof Date) return ts.getTime();
  if (typeof ts === 'number') return ts > 1e10 ? ts : ts * 1000;
  if (typeof ts === 'string') return new Date(ts).getTime() || 0;
  return 0;
};

const timeAgo = (ts) => {
  const d = Date.now() - toMs(ts);
  const m = Math.floor(d / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const AV_BG = [
  'linear-gradient(135deg,#00d4ff,#8b5cf6)',
  'linear-gradient(135deg,#f472b6,#8b5cf6)',
  'linear-gradient(135deg,#10d9a8,#00d4ff)',
  'linear-gradient(135deg,#f59e0b,#f97316)',
  'linear-gradient(135deg,#a78bfa,#f472b6)',
];

const DonutSVG = ({ segs, size = 140, stroke = 22 }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />
      {segs.map((s, i) => {
        const dash = (s.pct / 100) * c;
        const el = (
          <circle key={i} cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={-off} />
        );
        off += dash;
        return el;
      })}
    </svg>
  );
};

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const ACTIVITY = [38, 62, 51, 78, 45, 29, 70];
const maxA = Math.max(...ACTIVITY);
const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

const CARDS = [
  { key: 'projects', label: 'Projects', icon: '◇', accent: '#00d4ff', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.18)', delta: 'portfolio', pct: 72 },
  { key: 'skills', label: 'Skills', icon: '◉', accent: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.18)', delta: 'listed', pct: 85 },
  { key: 'experiences', label: 'Experiences', icon: '◎', accent: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.18)', delta: 'history', pct: 60 },
  { key: 'messages', label: 'Messages', icon: '◻', accent: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.18)', delta: 'unread', pct: 0 },
];

const ACTIONS = [
  { title: 'New Project', desc: 'Add to portfolio', icon: '◇', color: '#00d4ff', bg: 'rgba(0,212,255,0.1)', d: '0.1s' },
  { title: 'Add Skill', desc: 'Expand skill set', icon: '◉', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', d: '0.14s' },
  { title: 'New Experience', desc: 'Log work history', icon: '◎', color: '#f472b6', bg: 'rgba(244,114,182,0.1)', d: '0.18s' },
  { title: 'Edit About', desc: 'Update bio & profile', icon: '◐', color: '#10d9a8', bg: 'rgba(16,217,168,0.1)', d: '0.22s' },
  { title: 'View Messages', desc: 'Read submissions', icon: '◻', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', d: '0.26s' },
  { title: 'Update Contact', desc: 'Social links & info', icon: '◑', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', d: '0.3s' },
];

// ── Component ──────────────────────────────────────────────────
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7D');

  useEffect(() => {
    (async () => {
      try {
        const [projects, skills, experiences, messages] = await Promise.allSettled([
          getAllProjects(), getAllSkills(), getAllExperiences(), getAllMessages(),
        ]);

        const p = projects.status === 'fulfilled' ? projects.value : [];
        const s = skills.status === 'fulfilled' ? skills.value : [];
        const e = experiences.status === 'fulfilled' ? experiences.value : [];
        const m = messages.status === 'fulfilled' ? messages.value : [];

        setData({
          projects: p?.length || 0,
          skills: s?.length || 0,
          experiences: e?.length || 0,
          messages: m?.length || 0,
          unread: m.filter(msg => !msg.read).length,
        });
        setMsgs([...m].sort((a, b) => toMs(b.timestamp) - toMs(a.timestamp)).slice(0, 8));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total = data ? data.projects + data.skills + data.experiences : 0;
  const donut = data ? [
    { label: 'Projects', pct: total ? Math.round(data.projects / total * 100) : 0, color: '#00d4ff' },
    { label: 'Skills', pct: total ? Math.round(data.skills / total * 100) : 0, color: '#8b5cf6' },
    { label: 'Experiences', pct: total ? Math.round(data.experiences / total * 100) : 0, color: '#f472b6' },
  ] : [];

  const cards = CARDS.map(c => ({
    ...c,
    delta: c.key === 'messages' ? (data ? `${data.unread} unread` : '—') : c.delta,
    pct: c.key === 'messages' ? (data ? Math.round((data.unread / Math.max(data.messages, 1)) * 100) : 0) : c.pct,
  }));

  return (
    <>
      <GlobalStyle />
      <Wrap>

        {/* ── Stats ── */}
        <StatsGrid>
          {cards.map((c, i) => (
            <StatCard key={c.key} $a={c.accent} $d={`${i * 0.07}s`}>
              <CardTop>
                <IconBox $bg={c.bg} $border={c.border}>{c.icon}</IconBox>
                <Chip $c={c.accent}>{c.delta}</Chip>
              </CardTop>

              {loading
                ? <Skel h="44px" w="50%" />
                : <StatVal $d={`${i * 0.07 + 0.1}s`}>{data?.[c.key] ?? 0}</StatVal>
              }

              <StatLbl>{c.label}</StatLbl>

              <Progress $pct={loading ? 0 : c.pct} $c={c.accent}>
                <div />
              </Progress>
            </StatCard>
          ))}
        </StatsGrid>

        {/* ── Mid ── */}
        <MidRow>

          {/* Activity */}
          <Panel $d="0.14s">
            <PanelHead>
              <PanelTitle>Weekly Activity</PanelTitle>
              <PeriodChips>
                {['7D', '30D', '90D'].map(p => (
                  <PeriodChip key={p} $a={period === p} onClick={() => setPeriod(p)}>{p}</PeriodChip>
                ))}
              </PeriodChips>
            </PanelHead>

            <BarWrap>
              {ACTIVITY.map((v, i) => (
                <BarCol key={i}>
                  <BarOuter>
                    <BarInner $h={(v / maxA) * 100} $today={i === todayIdx} />
                  </BarOuter>
                  <BarLbl>{DAYS[i]}</BarLbl>
                </BarCol>
              ))}
            </BarWrap>

            <MetricsRow>
              {[
                { lbl: 'avg / day', val: '53', c: '#00d4ff' },
                { lbl: 'peak', val: '78', c: '#8b5cf6' },
                { lbl: 'total', val: '371', c: '#f472b6' },
              ].map(m => (
                <Metric key={m.lbl}>
                  <MetricLbl>{m.lbl}</MetricLbl>
                  <MetricVal $c={m.c}>{m.val}</MetricVal>
                </Metric>
              ))}
            </MetricsRow>
          </Panel>

          {/* Donut */}
          <Panel $d="0.2s">
            <PanelTitle>Content Split</PanelTitle>
            <DonutWrap>
              {loading
                ? <Skel h="140px" w="140px" style={{ borderRadius: '50%' }} />
                : <DonutSVG segs={donut} />
              }
              <DonutCenter>
                <DonutNum>{total}</DonutNum>
                <DonutSub>TOTAL</DonutSub>
              </DonutCenter>
            </DonutWrap>
            <LegList>
              {donut.map(s => (
                <LegRow key={s.label}>
                  <LegLeft>
                    <LegDot $c={s.color} />
                    <LegName>{s.label}</LegName>
                  </LegLeft>
                  <LegPct $c={s.color}>{s.pct}%</LegPct>
                </LegRow>
              ))}
            </LegList>
          </Panel>

        </MidRow>

        {/* ── Bottom ── */}
        <BottomRow>

          {/* Messages */}
          <Panel>
            <PanelHead>
              <PanelTitle>Latest Messages</PanelTitle>
              {data?.unread > 0 && (
                <Chip $c="#00d4ff">{data.unread} new</Chip>
              )}
            </PanelHead>
            <FeedScroll>
              {loading
                ? [...Array(4)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '9px 10px' }}>
                    <Skel h="30px" w="30px" style={{ borderRadius: 8, flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <Skel h="10px" w="35%" />
                      <Skel h="9px" w="70%" />
                    </div>
                  </div>
                ))
                : msgs.length > 0
                  ? msgs.map((m, i) => (
                    <FeedRow key={m.id} $d={`${i * 0.04}s`}>
                      <FeedAv $bg={AV_BG[i % AV_BG.length]}>
                        {(m.name || '?')[0].toUpperCase()}
                      </FeedAv>
                      <FeedBody>
                        <FeedName>
                          {m.name}
                          {!m.read && <UnreadDot />}
                        </FeedName>
                        <FeedText>{m.message}</FeedText>
                        <FeedMeta>{timeAgo(m.timestamp)} · {m.email}</FeedMeta>
                      </FeedBody>
                    </FeedRow>
                  ))
                  : <Empty>// no messages yet</Empty>
              }
            </FeedScroll>
          </Panel>



        </BottomRow>

      </Wrap>
    </>
  );
};

export default Dashboard;