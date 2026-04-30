import React, { useState, useEffect, useMemo } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import {
  getAllProjects, getAllSkills, getAllExperiences,
  getAllMessages, getAllEducation, getAllCertifications,
} from '../../../Services/ManageData';
import { globalCSS } from './Admintheme';
import { Skel } from './Adminshared';

const GlobalStyle = createGlobalStyle`${globalCSS}`;

const API_URL = 'https://portfolio-ogjb.vercel.app';

// ── Animations ─────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const countUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const barGrow = keyframes`from { width: 0; }`;
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
`;
const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ── Layout ──────────────────────────────────────────────────────
const Wrap = styled.div`display: flex; flex-direction: column; gap: 22px;`;

// ── Stat Cards ─────────────────────────────────────────────────
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px)  { grid-template-columns: 1fr; }
`;

/* FIX: $a and $d are transient props */
const StatCard = styled.div`
  padding: 20px; background: #0a1525;
  border: 1px solid rgba(255,255,255,0.06); border-radius: 14px;
  position: relative; overflow: hidden; cursor: default;
  animation: ${fadeUp} 0.5s ease ${({ $d }) => $d} both;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  &:hover { transform: translateY(-3px); border-color: ${({ $a }) => $a}33; box-shadow: 0 16px 40px ${({ $a }) => $a}10; }
  &::before {
    content: ''; position: absolute; top: -24px; right: -24px;
    width: 90px; height: 90px; border-radius: 50%;
    background: ${({ $a }) => $a}; opacity: 0.07; filter: blur(28px); transition: opacity 0.25s;
  }
  &:hover::before { opacity: 0.14; }
  &::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    height: 2px; width: 0; background: ${({ $a }) => $a}; transition: width 0.4s ease;
  }
  &:hover::after { width: 100%; }
`;

const CardTop = styled.div`display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;`;

/* FIX: $bg and $border are transient props */
const IconBox = styled.div`
  width: 38px; height: 38px; border-radius: 10px; background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center; font-size: 1rem;
  border: 1px solid ${({ $border }) => $border};
`;

/* FIX: $c is a transient prop */
const Chip = styled.div`
  font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 600;
  padding: 3px 8px; border-radius: 20px; background: ${({ $c }) => $c}14;
  color: ${({ $c }) => $c}; border: 1px solid ${({ $c }) => $c}25; letter-spacing: 0.05em;
`;

/* FIX: $d is a transient prop */
const StatVal = styled.div`
  font-size: 2.6rem; font-weight: 800; color: white; line-height: 1.1; letter-spacing: -0.02em;
  animation: ${countUp} 0.5s ease ${({ $d }) => $d} both;
`;
const StatLbl = styled.div`
  font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 500;
  color: rgba(255,255,255,0.28); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 3px;
`;

/* FIX: $pct and $c are transient props */
const Progress = styled.div`
  margin-top: 14px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.04); overflow: hidden;
  div { height: 100%; border-radius: 2px; width: ${({ $pct }) => $pct}%; background: ${({ $c }) => $c}; animation: ${barGrow} 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
`;

// ── Mid Row ────────────────────────────────────────────────────
const MidRow = styled.div`
  display: grid; grid-template-columns: 1fr 300px; gap: 14px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

// ── Panel ──────────────────────────────────────────────────────
/* FIX: $d is a transient prop */
const Panel = styled.div`
  background: #0a1525; border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px; padding: 20px;
  animation: ${fadeUp} 0.5s ease ${({ $d }) => $d || '0.15s'} both;
`;
const PanelHead = styled.div`display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;`;
const PanelTitle = styled.h3`
  font-size: 0.85rem; font-weight: 700; color: white;
  display: flex; align-items: center; gap: 8px;
  &::before { content: ''; width: 3px; height: 13px; border-radius: 2px; background: linear-gradient(180deg, #00d4ff, #8b5cf6); display: block; flex-shrink: 0; }
`;

// ── Period chips ───────────────────────────────────────────────
const PeriodChips = styled.div`display: flex; gap: 4px;`;

/* FIX: $a is a transient prop */
const PeriodChip = styled.button`
  font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em;
  padding: 3px 9px; border-radius: 20px;
  border: 1px solid ${({ $a }) => $a ? 'rgba(0,212,255,0.45)' : 'rgba(255,255,255,0.07)'};
  background: ${({ $a }) => $a ? 'rgba(0,212,255,0.1)' : 'transparent'};
  color: ${({ $a }) => $a ? '#00d4ff' : 'rgba(255,255,255,0.25)'};
  cursor: pointer; transition: all 0.18s;
  &:hover { border-color: rgba(0,212,255,0.3); color: rgba(0,212,255,0.7); }
`;

// ── Line Chart ─────────────────────────────────────────────────
const ChartArea = styled.div`position: relative; height: 130px; display: flex; flex-direction: column;`;
const SvgChart = styled.svg`width: 100%; flex: 1; overflow: visible;`;
const ChartXLabels = styled.div`display: flex; justify-content: space-between; margin-top: 5px;`;
const XLabel = styled.span`font-family: 'JetBrains Mono', monospace; font-size: 0.54rem; color: rgba(255,255,255,0.18); flex: 1; text-align: center;`;
const ChartLegend = styled.div`display: flex; gap: 16px; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.04);`;
const LegendItem = styled.div`display: flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: rgba(255,255,255,0.35);`;

/* FIX: $c is a transient prop */
const LegendDot = styled.div`width: 8px; height: 3px; border-radius: 2px; background: ${({ $c }) => $c};`;
const MetricsRow = styled.div`display: flex; gap: 20px; margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.04);`;
const Metric = styled.div`display: flex; flex-direction: column; gap: 2px;`;
const MetricLbl = styled.span`font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; text-transform: uppercase;`;

/* FIX: $c is a transient prop */
const MetricVal = styled.span`font-size: 1.1rem; font-weight: 800; color: ${({ $c }) => $c || 'white'};`;

// ── Donut ──────────────────────────────────────────────────────
const DonutWrap = styled.div`position: relative; width: 140px; height: 140px; margin: 10px auto 18px;`;
const DonutCenter = styled.div`position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;`;
const DonutNum = styled.div`font-size: 1.8rem; font-weight: 800; color: white; line-height: 1;`;
const DonutSub = styled.div`font-family: 'JetBrains Mono', monospace; font-size: 0.55rem; color: rgba(255,255,255,0.22); letter-spacing: 0.12em; margin-top: 2px;`;
const LegList = styled.div`display: flex; flex-direction: column; gap: 8px;`;
const LegRow = styled.div`display: flex; align-items: center; justify-content: space-between;`;
const LegLeft = styled.div`display: flex; align-items: center; gap: 7px;`;

/* FIX: $c is a transient prop */
const LegDot = styled.div`width: 7px; height: 7px; border-radius: 50%; background: ${({ $c }) => $c};`;
const LegName = styled.span`font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.38);`;

/* FIX: $c is a transient prop */
const LegPct = styled.span`font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 700; color: ${({ $c }) => $c};`;

// ── Analytics Row ──────────────────────────────────────────────
const AnalyticsRow = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

// ── Horizontal bar chart ───────────────────────────────────────
const HBarList = styled.div`display: flex; flex-direction: column; gap: 10px; margin-top: 4px;`;
const HBarRow = styled.div`display: flex; flex-direction: column; gap: 4px;`;
const HBarTop = styled.div`display: flex; justify-content: space-between; align-items: center;`;
const HBarLabel = styled.span`font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; color: rgba(255,255,255,0.5); letter-spacing: 0.06em; text-transform: capitalize;`;

/* FIX: $c is a transient prop */
const HBarCount = styled.span`font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; font-weight: 700; color: ${({ $c }) => $c};`;
const HBarTrack = styled.div`height: 5px; background: rgba(255,255,255,0.04); border-radius: 3px; overflow: hidden;`;

/* FIX: $pct and $c are transient props */
const HBarFill = styled.div`
  height: 100%; width: ${({ $pct }) => $pct}%; background: ${({ $c }) => $c};
  border-radius: 3px; animation: ${barGrow} 1s ease 0.3s both;
`;

// ── Mini summary cards ─────────────────────────────────────────
const MiniGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;`;

/* FIX: $c is a transient prop */
const MiniCard = styled.div`
  padding: 14px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05); border-radius: 10px;
  display: flex; flex-direction: column; gap: 4px;
  border-left: 3px solid ${({ $c }) => $c};
`;
const MiniVal = styled.div`font-size: 1.5rem; font-weight: 800; color: white; line-height: 1; letter-spacing: -0.02em;`;
const MiniLbl = styled.div`font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; text-transform: uppercase;`;

/* FIX: $up is a transient prop */
const MiniTrend = styled.div`font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 600; color: ${({ $up }) => $up ? '#10d9a8' : '#f472b6'}; margin-top: 1px;`;

// ── Bottom row ─────────────────────────────────────────────────
const BottomRow = styled.div`display: grid; gap: 14px;`;

// ── Message Feed ───────────────────────────────────────────────
const FeedScroll = styled.div`display: flex; flex-direction: column; gap: 2px; max-height: 280px; overflow-y: auto;`;

/* FIX: $d is a transient prop */
const FeedRow = styled.div`
  display: flex; align-items: flex-start; gap: 10px; padding: 9px 10px; border-radius: 8px;
  transition: background 0.18s; animation: ${slideIn} 0.35s ease ${({ $d }) => $d} both;
  &:hover { background: rgba(0,212,255,0.04); }
`;

/* FIX: $bg is a transient prop */
const FeedAv = styled.div`
  width: 30px; height: 30px; border-radius: 8px; background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: white; flex-shrink: 0;
`;
const FeedBody = styled.div`flex: 1; min-width: 0;`;
const FeedName = styled.div`font-size: 0.78rem; font-weight: 700; color: white; display: flex; align-items: center; gap: 5px;`;
const UnreadDot = styled.div`width: 5px; height: 5px; border-radius: 50%; background: #00d4ff; animation: ${pulse} 2s ease-in-out infinite;`;
const FeedText = styled.div`font-family: 'JetBrains Mono', monospace; font-size: 0.64rem; color: rgba(255,255,255,0.28); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
const FeedMeta = styled.div`font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.15); margin-top: 1px;`;
const Empty = styled.div`text-align: center; padding: 32px 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: rgba(255,255,255,0.15);`;
const SpinnerWrap = styled.div`display: flex; align-items: center; justify-content: center; padding: 28px;`;
const Spinner = styled.div`width: 18px; height: 18px; border: 2px solid rgba(0,212,255,0.15); border-top-color: #00d4ff; border-radius: 50%; animation: ${spin} 0.8s linear infinite;`;

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

// ── Donut SVG ──────────────────────────────────────────────────
const DonutSVG = ({ segs, size = 140, stroke = 22 }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />
      {segs.map((s, i) => {
        const dash = (s.pct / 100) * c;
        const el = (
          <circle
            key={i}
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={-off}
          />
        );
        off += dash;
        return el;
      })}
    </svg>
  );
};

// ── SVG line path builders ─────────────────────────────────────
const buildLine = (pts, w, h) => {
  if (!pts || pts.length < 2) return '';
  const mx = Math.max(...pts, 1);
  const step = w / (pts.length - 1);
  return pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(1)} ${(h - (v / mx) * (h - 6)).toFixed(1)}`).join(' ');
};

const buildArea = (pts, w, h) => {
  if (!pts || pts.length < 2) return '';
  const line = buildLine(pts, w, h);
  return `${line} L ${w} ${h} L 0 ${h} Z`;
};

// ── Analytics fetcher ──────────────────────────────────────────
const fetchAnalytics = async () => {
  const token = localStorage.getItem('adminToken');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`${API_URL}/api/admin/analytics`, { headers });
  if (!res.ok) {
    const status = res.status;
    let msg = 'Failed to fetch analytics';
    try { const j = await res.json(); msg = j.error || msg; } catch (_) {}
    console.error(`Analytics API [${status}]:`, msg);
    throw new Error(msg);
  }
  return res.json();
};

// ── Process raw events ─────────────────────────────────────────
const processAnalytics = (events, days) => {
  const now = Date.now();
  const msBack = days * 86400000;
  const cutoff = now - msBack;
  const filtered = (events || []).filter(e => toMs(e.timestamp) >= cutoff);

  const buckets = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    const key = `${d.getMonth() + 1}/${d.getDate()}`;
    buckets[key] = { visits: 0, interactions: 0 };
  }
  filtered.forEach(e => {
    const d = new Date(toMs(e.timestamp));
    const key = `${d.getMonth() + 1}/${d.getDate()}`;
    if (!buckets[key]) return;
    if (e.type === 'visit') buckets[key].visits++;
    else if (e.type === 'interaction') buckets[key].interactions++;
  });

  const labels   = Object.keys(buckets);
  const visits   = labels.map(k => buckets[k].visits);
  const interact = labels.map(k => buckets[k].interactions);

  const sections = {};
  filtered.filter(e => e.type === 'interaction' && e.section)
    .forEach(e => { sections[e.section] = (sections[e.section] || 0) + 1; });

  const totalVisits   = filtered.filter(e => e.type === 'visit').length;
  const totalInteract = filtered.filter(e => e.type === 'interaction').length;

  const prev    = (events || []).filter(e => { const ms = toMs(e.timestamp); return ms >= cutoff - msBack && ms < cutoff; });
  const prevV   = prev.filter(e => e.type === 'visit').length;
  const prevI   = prev.filter(e => e.type === 'interaction').length;

  return {
    labels, visits, interact, sections, totalVisits, totalInteract,
    trendV: prevV ? Math.round(((totalVisits - prevV) / prevV) * 100) : null,
    trendI: prevI ? Math.round(((totalInteract - prevI) / prevI) * 100) : null,
  };
};

const SECTION_COLORS = {
  home: '#00d4ff', about: '#8b5cf6', projects: '#f472b6',
  skills: '#10d9a8', experience: '#f59e0b', contact: '#a78bfa',
  'contact-form': '#ff6b6b',
};
const sCol = (s) => SECTION_COLORS[s] || '#00d4ff';

const CARDS = [
  { key: 'projects',       label: 'Projects',       icon: '◇', accent: '#00d4ff', bg: 'rgba(0,212,255,0.1)',   border: 'rgba(0,212,255,0.18)',   delta: 'portfolio', pct: 72 },
  { key: 'skills',         label: 'Skills',          icon: '◉', accent: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.18)',  delta: 'listed',    pct: 85 },
  { key: 'experiences',    label: 'Experiences',     icon: '◎', accent: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.18)', delta: 'history',   pct: 60 },
  { key: 'education',      label: 'Education',       icon: '◍', accent: '#10d9a8', bg: 'rgba(16,217,168,0.1)',  border: 'rgba(16,217,168,0.18)',  delta: 'academic',  pct: 50 },
  { key: 'certifications', label: 'Certifications',  icon: '◆', accent: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.18)',  delta: 'earned',    pct: 65 },
  { key: 'messages',       label: 'Messages',        icon: '◻', accent: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.18)', delta: 'unread',    pct: 0  },
];

// ── Component ──────────────────────────────────────────────────
const Dashboard = () => {
  const [data,      setData]      = useState(null);
  const [msgs,      setMsgs]      = useState([]);
  const [rawEvents, setRawEvents] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [aLoading,  setALoading]  = useState(true);
  const [period,    setPeriod]    = useState('7D');

  useEffect(() => {
    (async () => {
      try {
        const [projects, skills, experiences, messages, education, certifications] =
          await Promise.allSettled([
            getAllProjects(), getAllSkills(), getAllExperiences(),
            getAllMessages(), getAllEducation(), getAllCertifications(),
          ]);
        const p  = projects.status       === 'fulfilled' ? projects.value       : [];
        const s  = skills.status         === 'fulfilled' ? skills.value         : [];
        const e  = experiences.status    === 'fulfilled' ? experiences.value    : [];
        const m  = messages.status       === 'fulfilled' ? messages.value       : [];
        const ed = education.status      === 'fulfilled' ? education.value      : [];
        const ce = certifications.status === 'fulfilled' ? certifications.value : [];
        setData({
          projects: p?.length || 0, skills: s?.length || 0, experiences: e?.length || 0,
          messages: m?.length || 0, education: ed?.length || 0, certifications: ce?.length || 0,
          unread: (m || []).filter(x => !x.read).length,
        });
        setMsgs([...m].sort((a, b) => toMs(b.timestamp) - toMs(a.timestamp)).slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setALoading(true);
      try {
        setRawEvents(await fetchAnalytics());
      } catch (err) {
        console.error(err);
        setRawEvents([]);
      } finally {
        setALoading(false);
      }
    })();
  }, []);

  const days = period === '7D' ? 7 : period === '30D' ? 30 : 90;
  const ad = useMemo(() => processAnalytics(rawEvents, days), [rawEvents, days]);

  const contentTotal = data
    ? data.projects + data.skills + data.experiences + data.education + data.certifications
    : 0;

  const donut = data ? [
    { label: 'Projects',    pct: contentTotal ? Math.round(data.projects / contentTotal * 100)       : 0, color: '#00d4ff' },
    { label: 'Skills',      pct: contentTotal ? Math.round(data.skills / contentTotal * 100)         : 0, color: '#8b5cf6' },
    { label: 'Experiences', pct: contentTotal ? Math.round(data.experiences / contentTotal * 100)    : 0, color: '#f472b6' },
    { label: 'Education',   pct: contentTotal ? Math.round(data.education / contentTotal * 100)      : 0, color: '#10d9a8' },
    { label: 'Certs',       pct: contentTotal ? Math.round(data.certifications / contentTotal * 100) : 0, color: '#f59e0b' },
  ] : [];

  const cards = CARDS.map(c => ({
    ...c,
    delta: c.key === 'messages' ? (data ? `${data.unread} unread` : '—') : c.delta,
    pct:   c.key === 'messages' ? (data ? Math.round((data.unread / Math.max(data.messages, 1)) * 100) : 0) : c.pct,
  }));

  const sectionEntries = Object.entries(ad.sections || {}).sort((a, b) => b[1] - a[1]).slice(0, 7);
  const maxSec = sectionEntries[0]?.[1] || 1;

  const W = 400; const H = 100;
  const visitLine = buildLine(ad.visits,   W, H);
  const interLine = buildLine(ad.interact, W, H);
  const visitArea = buildArea(ad.visits,   W, H);
  const interArea = buildArea(ad.interact, W, H);

  const labelStep = Math.ceil((ad.labels?.length || 1) / 7);
  const hasData   = (ad.visits?.length || 0) >= 2;

  return (
    <>
      <GlobalStyle />
      <Wrap>

        {/* ── Stats ── */}
        <StatsGrid>
          {cards.map((c, i) => (
            <StatCard key={c.key} $a={c.accent} $d={`${i * 0.06}s`}>
              <CardTop>
                <IconBox $bg={c.bg} $border={c.border}>{c.icon}</IconBox>
                <Chip $c={c.accent}>{c.delta}</Chip>
              </CardTop>
              {loading
                ? <Skel $h="44px" $w="50%" />
                : <StatVal $d={`${i * 0.06 + 0.1}s`}>{data?.[c.key] ?? 0}</StatVal>
              }
              <StatLbl>{c.label}</StatLbl>
              <Progress $pct={loading ? 0 : c.pct} $c={c.accent}><div /></Progress>
            </StatCard>
          ))}
        </StatsGrid>

        {/* ── Mid: Line Chart + Donut ── */}
        <MidRow>
          <Panel $d="0.14s">
            <PanelHead>
              <PanelTitle>Visitors &amp; Interactions</PanelTitle>
              <PeriodChips>
                {['7D', '30D', '90D'].map(p => (
                  <PeriodChip key={p} $a={period === p} onClick={() => setPeriod(p)}>{p}</PeriodChip>
                ))}
              </PeriodChips>
            </PanelHead>

            {aLoading ? (
              <SpinnerWrap><Spinner /></SpinnerWrap>
            ) : !hasData ? (
              <Empty style={{ padding: '24px 0', lineHeight: 2 }}>
                // no analytics data yet<br />
                <span style={{ fontSize: '0.6rem', opacity: 0.4 }}>data appears once visitors land on your portfolio</span>
              </Empty>
            ) : (
              <ChartArea>
                <SvgChart viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map(f => (
                    <line key={f} x1="0" y1={H * f} x2={W} y2={H * f} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}
                  <path d={visitArea} fill="url(#gV)" />
                  <path d={interArea} fill="url(#gI)" />
                  <path d={visitLine} fill="none" stroke="#00d4ff" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                  <path d={interLine} fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="4 2" />
                </SvgChart>
                <ChartXLabels>
                  {(ad.labels || []).map((l, i) => (
                    <XLabel key={i}>{i % labelStep === 0 ? l : ''}</XLabel>
                  ))}
                </ChartXLabels>
              </ChartArea>
            )}

            <ChartLegend>
              <LegendItem><LegendDot $c="#00d4ff" />Visitors</LegendItem>
              <LegendItem><LegendDot $c="#8b5cf6" />Interactions</LegendItem>
            </ChartLegend>

            <MetricsRow>
              {[
                { lbl: 'visitors',     val: aLoading ? '—' : ad.totalVisits,   c: '#00d4ff' },
                { lbl: 'interactions', val: aLoading ? '—' : ad.totalInteract, c: '#8b5cf6' },
                { lbl: 'engage rate',  val: aLoading ? '—' : ad.totalVisits ? `${Math.round((ad.totalInteract / ad.totalVisits) * 100)}%` : '0%', c: '#10d9a8' },
              ].map(m => (
                <Metric key={m.lbl}>
                  <MetricLbl>{m.lbl}</MetricLbl>
                  <MetricVal $c={m.c}>{m.val}</MetricVal>
                </Metric>
              ))}
            </MetricsRow>
          </Panel>

          <Panel $d="0.2s">
            <PanelTitle>Content Split</PanelTitle>
            <DonutWrap>
              {loading
                ? <Skel $h="140px" $w="140px" style={{ borderRadius: '50%' }} />
                : <DonutSVG segs={donut} />
              }
              <DonutCenter>
                <DonutNum>{contentTotal}</DonutNum>
                <DonutSub>TOTAL</DonutSub>
              </DonutCenter>
            </DonutWrap>
            <LegList>
              {donut.map(s => (
                <LegRow key={s.label}>
                  <LegLeft><LegDot $c={s.color} /><LegName>{s.label}</LegName></LegLeft>
                  <LegPct $c={s.color}>{s.pct}%</LegPct>
                </LegRow>
              ))}
            </LegList>
          </Panel>
        </MidRow>

        {/* ── Analytics Deep Dive ── */}
        <AnalyticsRow>
          <Panel $d="0.24s">
            <PanelHead>
              <PanelTitle>Section Clicks</PanelTitle>
              {!aLoading && (
                <Chip $c="#00d4ff">
                  {Object.values(ad.sections || {}).reduce((a, b) => a + b, 0)} total
                </Chip>
              )}
            </PanelHead>
            {aLoading
              ? <SpinnerWrap><Spinner /></SpinnerWrap>
              : sectionEntries.length === 0
                ? <Empty>// no interaction data yet</Empty>
                : (
                  <HBarList>
                    {sectionEntries.map(([sec, cnt]) => (
                      <HBarRow key={sec}>
                        <HBarTop>
                          <HBarLabel>{sec}</HBarLabel>
                          <HBarCount $c={sCol(sec)}>{cnt}</HBarCount>
                        </HBarTop>
                        <HBarTrack>
                          <HBarFill $pct={Math.round((cnt / maxSec) * 100)} $c={sCol(sec)} />
                        </HBarTrack>
                      </HBarRow>
                    ))}
                  </HBarList>
                )
            }
          </Panel>

          <Panel $d="0.28s">
            <PanelHead><PanelTitle>Analytics Summary</PanelTitle></PanelHead>
            {aLoading ? <SpinnerWrap><Spinner /></SpinnerWrap> : (
              <MiniGrid>
                <MiniCard $c="#00d4ff">
                  <MiniVal>{ad.totalVisits}</MiniVal>
                  <MiniLbl>Total Visits</MiniLbl>
                  {ad.trendV !== null && (
                    <MiniTrend $up={ad.trendV >= 0}>{ad.trendV >= 0 ? '↑' : '↓'} {Math.abs(ad.trendV)}% vs prev</MiniTrend>
                  )}
                </MiniCard>

                <MiniCard $c="#8b5cf6">
                  <MiniVal>{ad.totalInteract}</MiniVal>
                  <MiniLbl>Interactions</MiniLbl>
                  {ad.trendI !== null && (
                    <MiniTrend $up={ad.trendI >= 0}>{ad.trendI >= 0 ? '↑' : '↓'} {Math.abs(ad.trendI)}% vs prev</MiniTrend>
                  )}
                </MiniCard>

                <MiniCard $c="#10d9a8">
                  <MiniVal>{ad.totalVisits ? `${Math.round((ad.totalInteract / ad.totalVisits) * 100)}%` : '0%'}</MiniVal>
                  <MiniLbl>Engage Rate</MiniLbl>
                </MiniCard>

                <MiniCard $c="#f59e0b">
                  <MiniVal style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>
                    {sectionEntries[0]?.[0] || '—'}
                  </MiniVal>
                  <MiniLbl>Top Section</MiniLbl>
                </MiniCard>

                <MiniCard $c="#f472b6" style={{ gridColumn: '1 / -1' }}>
                  <MiniVal style={{ fontSize: '0.9rem' }}>{period} window</MiniVal>
                  <MiniLbl>
                    {ad.visits?.reduce((a, b) => a + b, 0) || 0} visits ·{' '}
                    {ad.interact?.reduce((a, b) => a + b, 0) || 0} clicks ·{' '}
                    {Object.keys(ad.sections || {}).length} sections reached
                  </MiniLbl>
                </MiniCard>
              </MiniGrid>
            )}
          </Panel>
        </AnalyticsRow>

        {/* ── Messages ── */}
        <BottomRow>
          <Panel>
            <PanelHead>
              <PanelTitle>Latest Messages</PanelTitle>
              {data?.unread > 0 && <Chip $c="#00d4ff">{data.unread} new</Chip>}
            </PanelHead>
            <FeedScroll>
              {loading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '9px 10px' }}>
                      <Skel $h="30px" $w="30px" style={{ borderRadius: 8, flexShrink: 0 }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Skel $h="10px" $w="35%" />
                        <Skel $h="9px"  $w="70%" />
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
                          <FeedName>{m.name}{!m.read && <UnreadDot />}</FeedName>
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