import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getAboutMe, updateAboutMe } from '../../../Services/ManageData';
import {
  Card, Col, SectionTitle, SectionHead,
  FormCol, FormGroup, Label, Helper, Input,
  Btn, BtnRow, Toast, Divider,
} from './Adminshared';

const fadeUp = keyframes`
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
`;

const Wrap = styled.div`
  max-width: 780px;
  animation: ${fadeUp} 0.4s ease both;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 680px) { grid-template-columns: 1fr; }
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  margin-top: 16px;
`;

const PreviewItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  background: rgba(0,212,255,0.05);
  border: 1px solid rgba(0,212,255,0.15);
  border-radius: 8px;
`;

const PreviewIcon = styled.span`
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const PreviewInfo = styled.div`
  flex: 1;
  min-width: 0;
  .lbl { font-family:'JetBrains Mono',monospace; font-size:0.6rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.08em; }
  .val { font-size:0.82rem; color:white; margin-top:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
`;

const FIELDS = [
  { key: 'email', label: 'Email Address', icon: '📧', type: 'email', placeholder: 'your@email.com', required: true },
  { key: 'phone', label: 'Phone Number', icon: '📱', type: 'tel', placeholder: '+91 0000000000' },
  { key: 'location', label: 'Location', icon: '📍', type: 'text', placeholder: 'City, Country' },
  { key: 'linkedin', label: 'LinkedIn', icon: '💼', type: 'url', placeholder: 'https://linkedin.com/in/...' },
  { key: 'github', label: 'GitHub', icon: '🐙', type: 'url', placeholder: 'https://github.com/...' },
  { key: 'twitter', label: 'Twitter / X', icon: '𝕏', type: 'url', placeholder: 'https://twitter.com/...' },
  { key: 'instagram', label: 'Instagram', icon: '📸', type: 'url', placeholder: 'https://instagram.com/...' },
  { key: 'website', label: 'Personal Website', icon: '🌐', type: 'url', placeholder: 'https://yoursite.com' },
];

const ContactManager = ({ onDataUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState({
    email: '', phone: '', location: '', linkedin: '',
    github: '', twitter: '', instagram: '', website: '',
  });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const d = await getAboutMe();
      if (d?.contact) setData(d.contact);
    } catch (e) { console.error(e); }
  };

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const existing = await getAboutMe() || {};
      await updateAboutMe({ ...existing, contact: data });
      setSaved(true); setTimeout(() => setSaved(false), 3000);
      onDataUpdate?.();
    } catch (e) { console.error(e); alert(e.message); }
    finally { setLoading(false); }
  };

  const filled = FIELDS.filter(f => data[f.key]);

  return (
    <Wrap>
      <Col gap="16px">
        <Card>
          <SectionHead>
            <SectionTitle>Contact Information</SectionTitle>
          </SectionHead>

          {saved && <Toast>✓ Contact information updated successfully!</Toast>}

          <form onSubmit={submit}>
            <FormCol>
              <FieldGrid>
                {FIELDS.map(f => (
                  <FormGroup key={f.key}>
                    <Label>{f.icon} {f.label}{f.required ? ' *' : ''}</Label>
                    <Input
                      type={f.type}
                      value={data[f.key] || ''}
                      onChange={e => set(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      disabled={loading}
                      required={f.required}
                    />
                  </FormGroup>
                ))}
              </FieldGrid>

              <BtnRow>
                <Btn variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Saving…' : '✓ Save Contact Information'}
                </Btn>
                <Btn variant="ghost" type="button" onClick={load} disabled={loading}>
                  Reset
                </Btn>
              </BtnRow>
            </FormCol>
          </form>
        </Card>

        {filled.length > 0 && (
          <Card>
            <SectionTitle sm>Preview</SectionTitle>
            <PreviewGrid>
              {filled.map(f => (
                <PreviewItem key={f.key}>
                  <PreviewIcon>{f.icon}</PreviewIcon>
                  <PreviewInfo>
                    <div className="lbl">{f.label}</div>
                    <div className="val">{data[f.key]}</div>
                  </PreviewInfo>
                </PreviewItem>
              ))}
            </PreviewGrid>
          </Card>
        )}
      </Col>
    </Wrap>
  );
};

export default ContactManager;