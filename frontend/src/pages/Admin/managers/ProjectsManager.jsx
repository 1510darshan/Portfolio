import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getAllProjects, uploadProjectImage, insertProject, deleteProject, updateProject } from '../../../Services/ManageData';
import {
  Card, TwoCol, Col, SectionTitle, SectionHead,
  FormCol, FormGroup, Label, Helper, Input, TextArea,
  Btn, BtnRow, ListItem, ItemsList, Badge, Empty, ImgPreview, Tag, TagList,
} from './Adminshared';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Extra bits ─────────────────────────────────────────────────
const Wrap = styled.div`
  animation: ${fadeUp} 0.4s ease both;
`;

const ProjectThumb = styled.div`
  width: 38px; height: 38px;
  border-radius: 7px;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;

  img { width: 100%; height: 100%; object-fit: cover; }
`;

const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
  .name { font-size: 0.85rem; font-weight: 700; color: white; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .meta { font-size: 0.72rem; color: rgba(255,255,255,0.3); margin-top: 2px; font-family: 'JetBrains Mono', monospace; }
`;

const ColorDot = styled.div`
  width: 10px; height: 10px;
  border-radius: 50%;
  background: ${({ $c }) => $c};
  border: 1px solid rgba(255,255,255,0.15);
  flex-shrink: 0;
`;

const FormCard = styled(Card)`
  max-height: 75vh;
  overflow-y: auto;
`;

// ── Component ──────────────────────────────────────────────────
const ProjectsManager = ({ onDataUpdate }) => {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [form, setForm] = useState({
    name: '', category: 'Fullstack', desc: '', tech: '',
    type: 'Web', accent: '#00d4ff', status: 'Completed', live: '', github: '', image: '',
  });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setProjects((await getAllProjects()) || []); }
    catch(e) { console.error(e); }
  };

  const pick = (p) => {
    setSelected(p);
    setForm({
      name: p.name || '', category: p.category || 'Fullstack',
      desc: p.desc || '', tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech || '',
      type: p.type || 'Web', accent: p.accent || '#00d4ff',
      status: p.status || 'Completed', live: p.live || '', github: p.github || '', image: p.image || '',
    });
    setImageUrl(p.image || ''); setImagePreview(p.image || '');
  };

  const set = (k, v) => setForm(f => ({...f, [k]: v}));

  const handleImageChange = (e) => {
    const u = e.target.value.trim();
    setImageUrl(u); setImagePreview(u || '');
  };

  const submit = async (e) => {
    e.preventDefault(); setUploading(true);
    try {
      const tech = form.tech.split(',').map(t => t.trim()).filter(Boolean);
      let data = {...form, tech};
      if (imageUrl) { data.image = await uploadProjectImage(imageUrl); }
      if (selected) { await updateProject(selected.id, data); }
      else          { await insertProject(data); }
      load(); reset(); onDataUpdate?.();
    } catch(e) { console.error(e); alert(e.message); }
    finally { setUploading(false); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await deleteProject(id); load(); reset(); onDataUpdate?.(); }
    catch(e) { console.error(e); }
  };

  const reset = () => {
    setSelected(null); setImageUrl(''); setImagePreview('');
    setForm({ name:'', category:'Fullstack', desc:'', tech:'', type:'Web', accent:'#00d4ff', status:'Completed', live:'', github:'', image:'' });
  };

  return (
    <Wrap>
      <TwoCol>
        <Col>
          <SectionHead>
            <SectionTitle>Projects ({projects.length})</SectionTitle>
            <Btn variant="ghost" sm onClick={reset}>+ New</Btn>
          </SectionHead>
          <ItemsList>
            {projects.map(p => (
              <ListItem key={p.id} selected={selected?.id === p.id} onClick={() => pick(p)}>
                <ProjectThumb>
                  {p.image ? <img src={p.image} alt={p.name} /> : '📷'}
                </ProjectThumb>
                <ItemBody>
                  <div className="name">{p.name}</div>
                  <div className="meta">{p.category} · {p.type}</div>
                </ItemBody>
                <ColorDot $c={p.accent || '#00d4ff'} />
                <Btn variant="danger" sm onClick={e => { e.stopPropagation(); del(p.id); }}>
                  Delete
                </Btn>
              </ListItem>
            ))}
            {projects.length === 0 && <Empty>// no projects yet</Empty>}
          </ItemsList>
        </Col>

        <Col>
          <SectionTitle>{selected ? 'Edit Project' : 'New Project'}</SectionTitle>
          <FormCard>
            <form onSubmit={submit}>
              <FormCol>
                <FormGroup>
                  <Label>Image URL</Label>
                  <Input type="text" value={imageUrl} onChange={handleImageChange}
                    placeholder="https://example.com/image.jpg" disabled={uploading} />
                  {imagePreview && (
                    <ImgPreview h="160px"><img src={imagePreview} alt="preview" /></ImgPreview>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Project Name *</Label>
                  <Input required value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="e.g., E-Commerce Platform" disabled={uploading} />
                </FormGroup>

                <FormGroup>
                  <Label>Category</Label>
                  <Input value={form.category} onChange={e => set('category', e.target.value)}
                    placeholder="Fullstack, Frontend, Backend..." disabled={uploading} />
                </FormGroup>

                <FormGroup>
                  <Label>Description *</Label>
                  <TextArea required value={form.desc} onChange={e => set('desc', e.target.value)}
                    placeholder="Describe your project..." disabled={uploading} />
                </FormGroup>

                <FormGroup>
                  <Label>Technologies</Label>
                  <Input value={form.tech} onChange={e => set('tech', e.target.value)}
                    placeholder="React, Node.js, MongoDB (comma-separated)" disabled={uploading} />
                  {form.tech && (
                    <TagList>
                      {form.tech.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </TagList>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Type</Label>
                  <Input value={form.type} onChange={e => set('type', e.target.value)}
                    placeholder="Web, Mobile, Desktop" disabled={uploading} />
                </FormGroup>

                <FormGroup>
                  <Label>Status</Label>
                  <Input value={form.status} onChange={e => set('status', e.target.value)}
                    placeholder="Completed, In Progress..." disabled={uploading} />
                </FormGroup>

                <FormGroup>
                  <Label>Accent Color</Label>
                  <div style={{display:'flex',gap:10,alignItems:'center'}}>
                    <Input type="color" value={form.accent} onChange={e => set('accent', e.target.value)}
                      style={{width:60,flexShrink:0}} disabled={uploading} />
                    <Input value={form.accent} onChange={e => set('accent', e.target.value)} disabled={uploading} />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>Live URL</Label>
                  <Input value={form.live} onChange={e => set('live', e.target.value)}
                    placeholder="https://example.com" disabled={uploading} />
                </FormGroup>

                <FormGroup>
                  <Label>GitHub URL</Label>
                  <Input value={form.github} onChange={e => set('github', e.target.value)}
                    placeholder="https://github.com/..." disabled={uploading} />
                </FormGroup>

                <BtnRow stretch>
                  <Btn variant="primary" type="submit" disabled={uploading}>
                    {uploading ? 'Saving...' : selected ? 'Update Project' : 'Create Project'}
                  </Btn>
                  {selected && (
                    <Btn variant="ghost" type="button" onClick={reset} disabled={uploading}>
                      Clear
                    </Btn>
                  )}
                </BtnRow>
              </FormCol>
            </form>
          </FormCard>
        </Col>
      </TwoCol>
    </Wrap>
  );
};

export default ProjectsManager;