import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getAllMessages, markMessageAsRead, deleteMessage } from '../../../Services/ManageData';
import { Card, SectionTitle, Btn, BtnRow, Badge, Empty } from './Adminshared';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
`;

// ── Layout ─────────────────────────────────────────────────────
const Grid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;
  min-height: 600px;
  animation: ${fadeUp} 0.4s ease both;

  @media (max-width: 1000px) { grid-template-columns: 1fr; }
`;

// ── Sidebar ────────────────────────────────────────────────────
const ListPanel = styled(Card)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

/* FIX: $c is a transient prop — won't be forwarded to the DOM */
const StatBox = styled.div`
  padding: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  text-align: center;

  .val {
    font-size: 1.2rem;
    font-weight: 800;
    color: ${({ $c }) => $c || 'white'};
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
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.05);
`;

const MsgList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  flex: 1;
  max-height: 520px;
`;

/* FIX: $sel and $d are transient props */
const MsgItem = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({ $sel }) => $sel ? 'rgba(0,212,255,0.3)' : 'transparent'};
  background: ${({ $sel }) => $sel ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.02)'};
  cursor: pointer;
  text-align: left;
  transition: all 0.18s;
  position: relative;
  animation: ${slideIn} 0.3s ease ${({ $d }) => $d} both;
  width: 100%;

  &:hover {
    background: ${({ $sel }) => $sel ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)'};
    border-color: ${({ $sel }) => $sel ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.08)'};
  }
`;

/* FIX: $show is a transient prop */
const UnreadBar = styled.div`
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  border-radius: 0 2px 2px 0;
  background: #00d4ff;
  opacity: ${({ $show }) => $show ? 1 : 0};
`;

const ItemName = styled.div`
  font-size: 0.82rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ItemEmail = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  color: rgba(255,255,255,0.3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemPreview = styled.div`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// ── Main content ───────────────────────────────────────────────
const ContentPanel = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const EmailWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  animation: ${fadeUp} 0.3s ease both;
`;

const EmailHeader = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const EmailSubject = styled.h2`
  font-size: 1.3rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  line-height: 1.3;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
`;

const MetaItem = styled.div`
  padding: 10px 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;

  .label { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 3px; }
  .value { font-size: 0.85rem; color: white; font-weight: 600; word-break: break-all; }
`;

const EmailBody = styled.div`
  flex: 1;
  padding: 20px 0;
`;

const MessageText = styled.p`
  color: rgba(255,255,255,0.75);
  font-size: 0.92rem;
  line-height: 1.9;
  white-space: pre-wrap;
  word-break: break-word;
`;

const EmailFooter = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-wrap: wrap;
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

const fmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'short', month: 'short', day: 'numeric',
  year: 'numeric', hour: '2-digit', minute: '2-digit',
});

const formatDate = (ts) => {
  try {
    const ms = toMs(ts);
    if (!ms) return '';
    const d = new Date(ms);
    return isNaN(d.getTime()) ? '' : fmt.format(d);
  } catch { return ''; }
};

// ── Component ──────────────────────────────────────────────────
const MessagesManager = ({ onDataUpdate, onUnreadChange }) => {
  const [messages,   setMessages]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [selId,      setSelId]      = useState(null);
  const [actLoading, setActLoading] = useState(false);

  useEffect(() => { loadMessages(); }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const all = await getAllMessages();
      const sorted = (all || []).sort((a, b) => toMs(b.timestamp) - toMs(a.timestamp));
      setMessages(sorted);
      if (sorted.length > 0 && !selId) setSelId(sorted[0].id);
      onUnreadChange?.(sorted.filter(m => !m.read).length);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async () => {
    if (!selId) return;
    setActLoading(true);
    try {
      await markMessageAsRead(selId);
      setMessages(ms => ms.map(m => m.id === selId ? { ...m, read: true } : m));
      onUnreadChange?.(messages.filter(m => !m.read && m.id !== selId).length);
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setActLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selId || !window.confirm('Delete this message?')) return;
    setActLoading(true);
    try {
      await deleteMessage(selId);
      const next = messages.filter(m => m.id !== selId);
      setMessages(next);
      setSelId(next[0]?.id || null);
      onUnreadChange?.(next.filter(m => !m.read).length);
      onDataUpdate?.();
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setActLoading(false);
    }
  };

  const sel    = messages.find(m => m.id === selId);
  const unread = messages.filter(m => !m.read).length;

  if (loading) return (
    <Grid>
      <ListPanel>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 10 }}>
            <div style={{ height: 11, background: 'rgba(255,255,255,0.06)', borderRadius: 4, width: '50%' }} />
            <div style={{ height: 9,  background: 'rgba(255,255,255,0.04)', borderRadius: 4, width: '80%' }} />
          </div>
        ))}
      </ListPanel>
      <ContentPanel><Empty>Loading messages...</Empty></ContentPanel>
    </Grid>
  );

  return (
    <Grid>
      {/* ── List panel ── */}
      <ListPanel>
        <SectionTitle sm>Inbox</SectionTitle>
        <StatsStrip>
          <StatBox><div className="val">{messages.length}</div><div className="lbl">Total</div></StatBox>
          <StatBox $c="#00d4ff"><div className="val" style={{ color: '#00d4ff' }}>{unread}</div><div className="lbl">Unread</div></StatBox>
          <StatBox $c="#10d9a8"><div className="val" style={{ color: '#10d9a8' }}>{messages.length - unread}</div><div className="lbl">Read</div></StatBox>
        </StatsStrip>
        <Divider />
        <MsgList>
          {messages.map((m, i) => (
            <MsgItem key={m.id} $sel={selId === m.id} $d={`${i * 0.03}s`} onClick={() => setSelId(m.id)}>
              <UnreadBar $show={!m.read} />
              <ItemName>
                {m.name || 'Unknown'}
                {!m.read && <Badge color="cyan">new</Badge>}
              </ItemName>
              <ItemEmail>{m.email}</ItemEmail>
              <ItemPreview>{m.message}</ItemPreview>
            </MsgItem>
          ))}
          {messages.length === 0 && <Empty>// no messages yet</Empty>}
        </MsgList>
      </ListPanel>

      {/* ── Detail panel ── */}
      <ContentPanel>
        {sel ? (
          <EmailWrap key={sel.id}>
            <EmailHeader>
              <EmailSubject>{sel.subject || '(No Subject)'}</EmailSubject>
              <MetaGrid>
                <MetaItem>
                  <div className="label">From</div>
                  <div className="value">{sel.name}</div>
                </MetaItem>
                <MetaItem>
                  <div className="label">Email</div>
                  <div className="value">{sel.email}</div>
                </MetaItem>
                <MetaItem>
                  <div className="label">Received</div>
                  <div className="value" style={{ fontSize: '0.78rem' }}>{formatDate(sel.timestamp)}</div>
                </MetaItem>
                <MetaItem>
                  <div className="label">Status</div>
                  <div className="value">
                    <Badge color={sel.read ? 'gray' : 'cyan'}>{sel.read ? 'Read' : 'Unread'}</Badge>
                  </div>
                </MetaItem>
              </MetaGrid>
            </EmailHeader>

            <EmailBody>
              <MessageText>{sel.message}</MessageText>
            </EmailBody>

            <EmailFooter>
              {!sel.read && (
                <Btn variant="success" onClick={handleMarkRead} disabled={actLoading}>
                  ✓ Mark as Read
                </Btn>
              )}
              <Btn variant="danger" onClick={handleDelete} disabled={actLoading}>
                Delete
              </Btn>
            </EmailFooter>
          </EmailWrap>
        ) : (
          <Empty>Select a message to view it</Empty>
        )}
      </ContentPanel>
    </Grid>
  );
};

export default MessagesManager;