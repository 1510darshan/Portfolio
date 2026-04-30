import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getAllEducation, insertEducation, updateEducation, deleteEducation } from '../../../Services/ManageData';

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

/* FIX: $selected is a transient prop */
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

/* FIX: color is a standard HTML attribute but on a div it's fine;
   however to be safe and suppress warnings we use $color */
const IconBox = styled.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: ${({ $color }) => `${$color}18`};
  border: 1px solid ${({ $color }) => `${$color}30`};
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

// ── Component ────────────────────────────────────────────────
const EducationManager = ({ onDataUpdate }) => {
  const [items, setItems]       = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    degree: '', school: '', field: '', year: '',
    grade: '', icon: '🎓', color: '#22d3ee', order: 0,
  });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      setItems((await getAllEducation()) || []);
    } catch (e) {
      console.error(e);
    }
  };

  const pick = (item) => {
    setSelected(item);
    setForm({
      degree: item.degree || '',
      school: item.school || '',
      field:  item.field  || '',
      year:   item.year   || '',
      grade:  item.grade  || '',
      icon:   item.icon   || '🎓',
      color:  item.color  || '#22d3ee',
      order:  item.order  ?? 0,
    });
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (selected) await updateEducation(selected.id, form);
      else          await insertEducation(form);
      load();
      reset();
      onDataUpdate?.();
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      await deleteEducation(id);
      load();
      reset();
      onDataUpdate?.();
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  const reset = () => {
    setSelected(null);
    setForm({ degree: '', school: '', field: '', year: '', grade: '', icon: '🎓', color: '#22d3ee', order: 0 });
  };

  return (
    <Wrap>
      <TwoCol>
        {/* List */}
        <Col>
          <SectionHead>
            <SectionTitle>Education ({items.length})</SectionTitle>
            <NewBtn onClick={reset}>+ New</NewBtn>
          </SectionHead>
          <ItemsList>
            {items.length === 0
              ? <Empty>// no education entries yet</Empty>
              : items.map(item => (
                  <ListItem key={item.id} $selected={selected?.id === item.id} onClick={() => pick(item)}>
                    {/* FIX: pass $color not color to avoid HTML attribute clash */}
                    <IconBox $color={item.color || '#22d3ee'}>{item.icon || '🎓'}</IconBox>
                    <ItemBody>
                      <div className="name">{item.degree}</div>
                      <div className="meta">{item.school}{item.year ? ` · ${item.year}` : ''}</div>
                    </ItemBody>
                    <DelBtn onClick={e => { e.stopPropagation(); del(item.id); }}>Delete</DelBtn>
                  </ListItem>
                ))
            }
          </ItemsList>
        </Col>

        {/* Form */}
        <Col>
          <SectionTitle>{selected ? 'Edit Education' : 'New Education'}</SectionTitle>
          {/* FIX: use a real <form> element, not FormCard as="form", for proper submit handling */}
          <FormCard as="form" onSubmit={submit}>

            <FormGroup>
              <Label>Degree / Qualification *</Label>
              <Input
                required
                value={form.degree}
                onChange={e => set('degree', e.target.value)}
                placeholder="e.g., B.E. Computer Engineering"
              />
            </FormGroup>

            <FormGroup>
              <Label>School / University *</Label>
              <Input
                required
                value={form.school}
                onChange={e => set('school', e.target.value)}
                placeholder="e.g., Mumbai University"
              />
            </FormGroup>

            <FormGroup>
              <Label>Field of Study</Label>
              <Input
                value={form.field}
                onChange={e => set('field', e.target.value)}
                placeholder="e.g., Computer Science"
              />
            </FormGroup>

            <FormGroup>
              <Label>Year / Duration</Label>
              <Input
                value={form.year}
                onChange={e => set('year', e.target.value)}
                placeholder="e.g., 2020 — 2024"
              />
            </FormGroup>

            <FormGroup>
              <Label>Grade / CGPA</Label>
              <Input
                value={form.grade}
                onChange={e => set('grade', e.target.value)}
                placeholder="e.g., 8.5 CGPA / First Class"
              />
            </FormGroup>

            <FormGroup>
              <Label>Icon / Emoji</Label>
              <Input
                value={form.icon}
                onChange={e => set('icon', e.target.value)}
                placeholder="🎓"
                maxLength={2}
              />
            </FormGroup>

            <FormGroup>
              <Label>Accent Color</Label>
              <Input
                type="color"
                value={form.color}
                onChange={e => set('color', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Display Order</Label>
              <Input
                type="number"
                value={form.order}
                onChange={e => set('order', parseInt(e.target.value) || 0)}
              />
            </FormGroup>

            <BtnRow>
              <SubmitBtn type="submit">{selected ? 'Update' : 'Create'} Education</SubmitBtn>
              {selected && <ClearBtn type="button" onClick={reset}>Clear</ClearBtn>}
            </BtnRow>

          </FormCard>
        </Col>
      </TwoCol>
    </Wrap>
  );
};

export default EducationManager;