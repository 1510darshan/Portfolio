import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resolveIcon as resolveIconAsync, findIcon } from '../../../Services/IconLoader';
import { getAllSkills, updateSkill, insertSkill, deleteSkill } from '../../../Services/ManageData';
import {
  Card, TwoCol, Col, SectionTitle, SectionHead,
  FormCol, FormGroup, Label, Input,
  Btn, BtnRow, ListItem, ItemsList, Badge, Empty,
} from './Adminshared';

const fadeUp = keyframes`
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
`;

const Wrap = styled.div`
  animation: ${fadeUp} 0.4s ease both;
`;

const SkillIcon = styled.div`
  width: 34px; height: 34px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $c }) => $c};
  font-size: 0.95rem;
  flex-shrink: 0;
`;

const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
  .name { font-size: 0.85rem; font-weight: 700; color: white; }
  .meta { font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-top: 2px; font-family:'JetBrains Mono',monospace; }
`;

const LevelBar = styled.div`
  height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
  margin-top: 4px;

  div {
    height: 100%;
    border-radius: 2px;
    background: ${({ $c }) => $c};
    width: ${({ $w }) => $w}%;
  }
`;

// ── Icon picker ────────────────────────────────────────────────
const BRAND_ICONS = [
  'java','js','react','vuejs','angular','python','node','php',
  'html5','css3','sass','docker','git','github','gitlab',
  'aws','google','microsoft','apple','linux','ubuntu','android',
  'swift','kotlin','figma','firebase','mongodb','wordpress','npm',
];
const SOLID_ICONS = [
  'database','server','code','terminal','bug','cog','cubes',
  'cloud','lock','microchip','chart-line','layer-group',
  'puzzle-piece','wrench','bolt','robot','brain','infinity',
  'sitemap','plug','wifi','shield-halved','network-wired',
];

const PickerWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PickerPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PreviewBox = styled.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $c }) => $c};
  font-size: 1rem;
`;

const PickerInfo = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
`;

const TabRow = styled.div`
  display: flex;
  gap: 5px;
`;

const PickTab = styled.button`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.68rem;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.18s;
  border: 1px solid ${({ $a }) => $a ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.1)'};
  background: ${({ $a }) => $a ? 'rgba(0,212,255,0.12)' : 'transparent'};
  color: ${({ $a }) => $a ? '#00d4ff' : 'rgba(255,255,255,0.35)'};
  &:hover { border-color:rgba(0,212,255,0.35); color:#00d4ff; }
`;

const SearchInp = styled.input`
  padding: 7px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 7px;
  color: white;
  font-size: 0.82rem;
  font-family: 'JetBrains Mono', monospace;
  &:focus { outline:none; border-color:rgba(0,212,255,0.4); }
  &::placeholder { color:rgba(255,255,255,0.2); }
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8,1fr);
  gap: 5px;
  max-height: 160px;
  overflow-y: auto;
`;

const IBtn = styled.button`
  width: 34px; height: 34px;
  border-radius: 7px;
  border: 1px solid ${({ $s }) => $s ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.07)'};
  background: ${({ $s }) => $s ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.03)'};
  color: ${({ $s }) => $s ? '#00d4ff' : 'rgba(255,255,255,0.45)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color:rgba(0,212,255,0.4); color:#00d4ff; background:rgba(0,212,255,0.08); }
`;

const NoIcons = styled.p`
  grid-column:1/-1;
  text-align:center;
  padding:16px 0;
  font-family:'JetBrains Mono',monospace;
  font-size:0.72rem;
  color:rgba(255,255,255,0.2);
`;

const resolveIcon = (def) => {
  if (!def?.prefix || !def?.name) return null;
  try { return findIconDefinition({prefix:def.prefix, iconName:def.name}) ?? null; }
  catch { return null; }
};

const IconPicker = ({ value, onChange, color }) => {
  const [tab,    setTab]    = useState('brands');
  const [search, setSearch] = useState('');
  const [ready,  setReady]  = useState(false);

  const src    = tab === 'brands' ? BRAND_ICONS : SOLID_ICONS;
  const prefix = tab === 'brands' ? 'fab' : 'fas';
  const list   = src.filter(n => n.includes(search.toLowerCase()));
  const prev   = findIcon(value);
  const c      = color || '#00d4ff';
  const bg     = `${c}14`;
  const border = `${c}28`;

  // Preload all picker icons on mount
  useEffect(() => {
    const all = [
      ...BRAND_ICONS.map(name => ({ prefix: 'fab', name })),
      ...SOLID_ICONS.map(name => ({ prefix: 'fas', name })),
    ];
    Promise.all(all.map(resolveIconAsync)).then(() => setReady(true));
  }, []);

  return (
    <PickerWrap>
      <PickerPreview>
        <PreviewBox $bg={bg} $border={border} $c={c}>
          {prev
            ? <FontAwesomeIcon icon={prev} />
            : <span style={{fontSize:'0.55rem',color:'rgba(255,255,255,0.2)'}}>none</span>
          }
        </PreviewBox>
        <PickerInfo>{value ? `${value.prefix} / ${value.name}` : 'No icon selected'}</PickerInfo>
      </PickerPreview>

      <TabRow>
        <PickTab $a={tab==='brands'} onClick={() => { setTab('brands'); setSearch(''); }}>Brands</PickTab>
        <PickTab $a={tab==='solid'}  onClick={() => { setTab('solid');  setSearch(''); }}>Solid</PickTab>
      </TabRow>

      <SearchInp placeholder="Search icons…" value={search} onChange={e => setSearch(e.target.value)} />

      <IconGrid>
        {!ready
          ? <NoIcons>Loading icons…</NoIcons>
          : list.length > 0
          ? list.map(name => {
              const icon = findIcon({prefix, name});
              if (!icon) return null;
              const isSel = value?.prefix === prefix && value?.name === name;
              return (
                <IBtn key={name} title={name} $s={isSel} type="button"
                  onClick={() => onChange({prefix, name})}>
                  <FontAwesomeIcon icon={icon} />
                </IBtn>
              );
            })
          : <NoIcons>No icons found</NoIcons>
        }
      </IconGrid>
    </PickerWrap>
  );
};

// ── Main ───────────────────────────────────────────────────────
const SkillsManager = ({ onDataUpdate }) => {
  const [skills,   setSkills]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name:'', category:'Frontend', level:80, color:'#00d4ff', icon:null, featured:false, order:0,
  });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = (await getAllSkills()) || [];
      setSkills(data);
      // Preload icons for all existing skills
      Promise.all(data.map(s => s.icon ? resolveIconAsync(s.icon) : null));
    }
    catch(e) { console.error(e); }
  };

  const pick = (s) => {
    setSelected(s);
    setForm({ name:s.name||'', category:s.category||'Frontend', level:s.level||80,
              color:s.color||'#00d4ff', icon:s.icon||null, featured:s.featured||false, order:s.order||0 });
  };

  const set = (k, v) => setForm(f => ({...f, [k]: v}));

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (selected) await updateSkill(selected.id, form);
      else          await insertSkill(form);
      load(); reset(); onDataUpdate?.();
    } catch(e) { console.error(e); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try { await deleteSkill(id); load(); reset(); onDataUpdate?.(); }
    catch(e) { console.error(e); }
  };

  const reset = () => {
    setSelected(null);
    setForm({ name:'', category:'Frontend', level:80, color:'#00d4ff', icon:null, featured:false, order:0 });
  };

  return (
    <Wrap>
      <TwoCol>
        <Col>
          <SectionHead>
            <SectionTitle>Skills ({skills.length})</SectionTitle>
            <Btn variant="ghost" sm onClick={reset}>+ New</Btn>
          </SectionHead>
          <ItemsList>
            {skills.map(s => {
              const icon = findIcon(s.icon);
              const c = s.color || '#00d4ff';
              return (
                <ListItem key={s.id} selected={selected?.id === s.id} onClick={() => pick(s)}>
                  <SkillIcon $c={c} $bg={`${c}14`} $border={`${c}28`}>
                    {icon ? <FontAwesomeIcon icon={icon} /> : '?'}
                  </SkillIcon>
                  <ItemBody>
                    <div className="name">{s.name}</div>
                    <div className="meta">{s.category}</div>
                    <LevelBar $c={c} $w={s.level || 0}><div /></LevelBar>
                  </ItemBody>
                  <Badge color="gray">{s.level}%</Badge>
                  <Btn variant="danger" sm onClick={e => { e.stopPropagation(); del(s.id); }}>
                    Delete
                  </Btn>
                </ListItem>
              );
            })}
            {skills.length === 0 && <Empty>// no skills yet</Empty>}
          </ItemsList>
        </Col>

        <Col>
          <SectionTitle>{selected ? 'Edit Skill' : 'New Skill'}</SectionTitle>
          <Card>
            <form onSubmit={submit}>
              <FormCol>
                <FormGroup>
                  <Label>Skill Name *</Label>
                  <Input required value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="e.g., React" />
                </FormGroup>

                <FormGroup>
                  <Label>Category</Label>
                  <Input value={form.category} onChange={e => set('category', e.target.value)}
                    placeholder="Frontend, Backend, DevOps…" />
                </FormGroup>

                <FormGroup>
                  <Label>Proficiency — {form.level}%</Label>
                  <Input type="range" min="0" max="100" value={form.level}
                    onChange={e => set('level', parseInt(e.target.value))}
                    style={{padding:'4px 0', background:'transparent', border:'none'}} />
                  <LevelBar $c={form.color} $w={form.level}><div /></LevelBar>
                </FormGroup>

                <FormGroup>
                  <Label>Color</Label>
                  <div style={{display:'flex', gap:10, alignItems:'center'}}>
                    <Input type="color" value={form.color} onChange={e => set('color', e.target.value)}
                      style={{width:60, flexShrink:0}} />
                    <Input value={form.color} onChange={e => set('color', e.target.value)} />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>Icon</Label>
                  <IconPicker value={form.icon} onChange={v => set('icon', v)} color={form.color} />
                </FormGroup>

                <FormGroup>
                  <Label>Order</Label>
                  <Input type="number" value={form.order} onChange={e => set('order', parseInt(e.target.value))} />
                </FormGroup>

                <FormGroup style={{flexDirection:'row', alignItems:'center', gap:10}}>
                  <input type="checkbox" id="feat" checked={form.featured}
                    onChange={e => set('featured', e.target.checked)}
                    style={{width:16, height:16, cursor:'pointer', accentColor:'#00d4ff'}} />
                  <Label htmlFor="feat" style={{margin:0, cursor:'pointer'}}>Featured (show in rings)</Label>
                </FormGroup>

                <BtnRow stretch>
                  <Btn variant="primary" type="submit">
                    {selected ? 'Update Skill' : 'Create Skill'}
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

export default SkillsManager;