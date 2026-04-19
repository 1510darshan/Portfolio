import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  getAllCertifications, insertCertification,
  updateCertification, deleteCertification,
} from '../../../Services/ManageData';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Styled Components ─────────────────────────────────────────
const Wrap = styled.div`animation: ${fadeUp} 0.4s ease both;`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Col = styled.div`display: flex; flex-direction: column; gap: 20px;`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 580px;
  overflow-y: auto;
  padding-right: 6px;
  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 3px; }
  &::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.25); border-radius: 3px; }
`;

const ListItem = styled.div`
  padding: 14px 16px;
  background: ${({ $selected }) => $selected ? 'rgba(34,211,238,0.08)' : 'rgba(10,26,46,0.6)'};
  border: 1px solid ${({ $selected }) => $selected ? 'rgba(34,211,238,0.4)' : 'rgba(34,211,238,0.12)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  &:hover { border-color: rgba(34,211,238,0.3); background: rgba(10,26,46,0.8); }
`;

const IconBox = styled.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: ${({ color }) => `${color}18`};
  border: 1px solid ${({ color }) => `${color}30`};
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const ItemBody = styled.div`
  flex: 1; min-width: 0;
  .name { font-size: 0.85rem; font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .meta { font-size: 0.7rem; color: rgba(255,255,255,0.35); margin-top: 2px; font-family: 'Space Mono', monospace; }
`;

const DelBtn = styled.button`
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
`;

const NewBtn = styled.button`
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
`;

const Empty = styled.p`
  text-align: center;
  color: rgba(255,255,255,0.25);
  font-size: 0.8rem;
  font-family: 'Space Mono', monospace;
  padding: 24px 0;
`;

const FormCard = styled.div`
  padding: 24px;
  background: rgba(10,26,46,0.6);
  border: 1px solid rgba(34,211,238,0.12);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FormGroup = styled.div`display: flex; flex-direction: column; gap: 5px;`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: #22d3ee;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 9px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(34,211,238,0.18);
  border-radius: 6px;
  color: white;
  font-size: 0.875rem;
  &:focus { outline: none; border-color: #22d3ee; background: rgba(34,211,238,0.06); }
  &[type="color"] { height: 38px; padding: 3px 8px; cursor: pointer; }
`;

const BtnRow = styled.div`display: flex; gap: 10px; margin-top: 4px;`;

const SubmitBtn = styled.button`
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
`;

const ClearBtn = styled.button`
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
`;

const HintText = styled.p`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
  margin-top: 3px;
  font-family: 'Space Mono', monospace;
`;

// ── Component ────────────────────────────────────────────────
const CertificationsManager = ({ onDataUpdate }) => {
  const [items, setItems]       = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: '', issuer: '', year: '', link: '',
    icon: '🏆', color: '#22d3ee', order: 0,
  });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setItems((await getAllCertifications()) || []); }
    catch (e) { console.error(e); }
  };

  const pick = (item) => {
    setSelected(item);
    setForm({
      name:   item.name   || '', issuer: item.issuer || '',
      year:   item.year   || '', link:   item.link   || '',
      icon:   item.icon   || '🏆', color: item.color || '#22d3ee',
      order:  item.order  ?? 0,
    });
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (selected) await updateCertification(selected.id, form);
      else          await insertCertification(form);
      load(); reset(); onDataUpdate?.();
    } catch (e) { console.error(e); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this certification?')) return;
    try { await deleteCertification(id); load(); reset(); onDataUpdate?.(); }
    catch (e) { console.error(e); }
  };

  const reset = () => {
    setSelected(null);
    setForm({ name: '', issuer: '', year: '', link: '', icon: '🏆', color: '#22d3ee', order: 0 });
  };

  return (
    <Wrap>
      <TwoCol>
        {/* List */}
        <Col>
          <SectionHead>
            <SectionTitle>Certifications ({items.length})</SectionTitle>
            <NewBtn onClick={reset}>+ New</NewBtn>
          </SectionHead>
          <ItemsList>
            {items.length === 0
              ? <Empty>// no certifications yet</Empty>
              : items.map(item => (
                  <ListItem key={item.id} $selected={selected?.id === item.id} onClick={() => pick(item)}>
                    <IconBox color={item.color || '#22d3ee'}>{item.icon || '🏆'}</IconBox>
                    <ItemBody>
                      <div className="name">{item.name}</div>
                      <div className="meta">{item.issuer}{item.year ? ` · ${item.year}` : ''}</div>
                    </ItemBody>
                    <DelBtn onClick={e => { e.stopPropagation(); del(item.id); }}>Delete</DelBtn>
                  </ListItem>
                ))
            }
          </ItemsList>
        </Col>

        {/* Form */}
        <Col>
          <SectionTitle>{selected ? 'Edit Certification' : 'New Certification'}</SectionTitle>
          <FormCard as="form" onSubmit={submit}>

            <FormGroup>
              <Label>Certification Name *</Label>
              <Input required value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="e.g., AWS Solutions Architect" />
            </FormGroup>

            <FormGroup>
              <Label>Issuing Organization *</Label>
              <Input required value={form.issuer}
                onChange={e => set('issuer', e.target.value)}
                placeholder="e.g., Amazon Web Services" />
            </FormGroup>

            <FormGroup>
              <Label>Year Obtained</Label>
              <Input value={form.year}
                onChange={e => set('year', e.target.value)}
                placeholder="e.g., 2024" />
            </FormGroup>

            <FormGroup>
              <Label>Certificate URL</Label>
              <Input type="url" value={form.link}
                onChange={e => set('link', e.target.value)}
                placeholder="https://credentials.example.com/..." />
              <HintText>// Leave blank if no public link</HintText>
            </FormGroup>

            <FormGroup>
              <Label>Icon / Emoji</Label>
              <Input value={form.icon}
                onChange={e => set('icon', e.target.value)}
                placeholder="🏆" maxLength={2} />
            </FormGroup>

            <FormGroup>
              <Label>Accent Color</Label>
              <Input type="color" value={form.color}
                onChange={e => set('color', e.target.value)} />
            </FormGroup>

            <FormGroup>
              <Label>Display Order</Label>
              <Input type="number" value={form.order}
                onChange={e => set('order', parseInt(e.target.value) || 0)} />
            </FormGroup>

            <BtnRow>
              <SubmitBtn type="submit">{selected ? 'Update' : 'Create'} Certification</SubmitBtn>
              {selected && <ClearBtn type="button" onClick={reset}>Clear</ClearBtn>}
            </BtnRow>

          </FormCard>
        </Col>
      </TwoCol>
    </Wrap>
  );
};

export default CertificationsManager;