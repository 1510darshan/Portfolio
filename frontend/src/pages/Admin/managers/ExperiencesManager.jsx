import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getAllExperiences, updateExperience, insertExperience, deleteExperience } from '../../../Services/ManageData';
import {
  Card, TwoCol, Col, SectionTitle, SectionHead,
  FormCol, FormGroup, Label, Input, TextArea,
  Btn, BtnRow, ListItem, ItemsList, Badge, Empty, Tag, TagList,
} from './Adminshared';

const fadeUp = keyframes`
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
`;

const Wrap = styled.div`
  animation: ${fadeUp} 0.4s ease both;
`;

const ExpIcon = styled.div`
  width: 34px; height: 34px;
  border-radius: 8px;
  background: rgba(139,92,246,0.1);
  border: 1px solid rgba(139,92,246,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`;

const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
  .name { font-size:0.85rem; font-weight:700; color:white; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .meta { font-size:0.7rem; color:rgba(255,255,255,0.3); margin-top:2px; font-family:'JetBrains Mono',monospace; }
`;

const ExperiencesManager = ({ onDataUpdate }) => {
  const [exps,     setExps]     = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    role:'', company:'', type:'Full-time', date:'', current:false, desc:'', tags:'',
  });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setExps((await getAllExperiences()) || []); }
    catch(e) { console.error(e); }
  };

  const pick = (exp) => {
    setSelected(exp);
    setForm({
      role: exp.role||'', company: exp.company||'', type: exp.type||'Full-time',
      date: exp.date||'', current: exp.current||false, desc: exp.desc||'',
      tags: Array.isArray(exp.tags) ? exp.tags.join(', ') : exp.tags||'',
    });
  };

  const set = (k, v) => setForm(f => ({...f, [k]: v}));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (selected) await updateExperience(selected.id, data);
      else          await insertExperience(data);
      load(); reset(); onDataUpdate?.();
    } catch(e) { console.error(e); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try { await deleteExperience(id); load(); reset(); onDataUpdate?.(); }
    catch(e) { console.error(e); }
  };

  const reset = () => {
    setSelected(null);
    setForm({ role:'', company:'', type:'Full-time', date:'', current:false, desc:'', tags:'' });
  };

  return (
    <Wrap>
      <TwoCol>
        <Col>
          <SectionHead>
            <SectionTitle>Experiences ({exps.length})</SectionTitle>
            <Btn variant="ghost" sm onClick={reset}>+ New</Btn>
          </SectionHead>
          <ItemsList>
            {exps.map(exp => (
              <ListItem key={exp.id} selected={selected?.id === exp.id} onClick={() => pick(exp)}>
                <ExpIcon>◎</ExpIcon>
                <ItemBody>
                  <div className="name">{exp.role}</div>
                  <div className="meta">{exp.company} · {exp.type}</div>
                </ItemBody>
                {exp.current && <Badge color="green">current</Badge>}
                <Btn variant="danger" sm onClick={e => { e.stopPropagation(); del(exp.id); }}>
                  Delete
                </Btn>
              </ListItem>
            ))}
            {exps.length === 0 && <Empty>// no experiences yet</Empty>}
          </ItemsList>
        </Col>

        <Col>
          <SectionTitle>{selected ? 'Edit Experience' : 'New Experience'}</SectionTitle>
          <Card>
            <form onSubmit={submit}>
              <FormCol>
                <FormGroup>
                  <Label>Job Title / Role *</Label>
                  <Input required value={form.role} onChange={e => set('role', e.target.value)}
                    placeholder="e.g., Senior Frontend Developer" />
                </FormGroup>

                <FormGroup>
                  <Label>Company</Label>
                  <Input value={form.company} onChange={e => set('company', e.target.value)}
                    placeholder="e.g., TechCorp Global" />
                </FormGroup>

                <FormGroup>
                  <Label>Employment Type</Label>
                  <Input value={form.type} onChange={e => set('type', e.target.value)}
                    placeholder="Full-time, Contract, Freelance…" />
                </FormGroup>

                <FormGroup>
                  <Label>Duration</Label>
                  <Input value={form.date} onChange={e => set('date', e.target.value)}
                    placeholder="Aug 2024 — Present" />
                </FormGroup>

                <FormGroup>
                  <Label>Description *</Label>
                  <TextArea required minH="90px" value={form.desc} onChange={e => set('desc', e.target.value)}
                    placeholder="Responsibilities and achievements…" />
                </FormGroup>

                <FormGroup>
                  <Label>Skills Used</Label>
                  <Input value={form.tags} onChange={e => set('tags', e.target.value)}
                    placeholder="React, Node.js, AWS (comma-separated)" />
                  {form.tags && (
                    <TagList>
                      {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </TagList>
                  )}
                </FormGroup>

                <FormGroup style={{flexDirection:'row', alignItems:'center', gap:10}}>
                  <input type="checkbox" id="cur" checked={form.current}
                    onChange={e => set('current', e.target.checked)}
                    style={{width:16, height:16, cursor:'pointer', accentColor:'#10d9a8'}} />
                  <Label htmlFor="cur" style={{margin:0, cursor:'pointer'}}>Currently Working Here</Label>
                </FormGroup>

                <BtnRow stretch>
                  <Btn variant="primary" type="submit">
                    {selected ? 'Update Experience' : 'Create Experience'}
                  </Btn>
                  {selected && <Btn variant="ghost" type="button" onClick={reset}>Clear</Btn>}
                </BtnRow>
              </FormCol>
            </form>
          </Card>
        </Col>
      </TwoCol>
    </Wrap>
  );
};

export default ExperiencesManager;