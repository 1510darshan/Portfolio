import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getAboutMe, uploadProfileImage, updateAboutMe } from '../../../Services/ManageData';
import {
  Card, TwoCol, Col, SectionTitle,
  FormCol, FormGroup, Label, Helper, Input, TextArea,
  Btn, Toast, ImgPreview,
} from './Adminshared';

const fadeUp = keyframes`
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
`;

const Wrap = styled.div`
  animation: ${fadeUp} 0.4s ease both;
`;

const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AvatarPreview = styled.div`
  width: 100%;
  height: 260px;
  border-radius: 12px;
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

const PlaceholderIcon = styled.div`
  font-size: 4rem;
  opacity: 0.15;
`;

const InfoCard = styled(Card)`
  padding: 16px;
  background: rgba(0,212,255,0.04);
  border-color: rgba(0,212,255,0.12);
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
`;

const AboutManager = ({ onDataUpdate }) => {
  const [loading,  setLoading]  = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [imgUrl,   setImgUrl]   = useState('');
  const [imgPrev,  setImgPrev]  = useState('');
  const [form, setForm] = useState({
    bio:'', role:'', location:'', downloadCV:'', profileImage:'',
  });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const d = await getAboutMe();
      if (d) {
        setForm({ bio:d.bio||'', role:d.role||'', location:d.location||'',
                  downloadCV:d.downloadCV||'', profileImage:d.profileImage||'' });
        if (d.profileImage) { setImgUrl(d.profileImage); setImgPrev(d.profileImage); }
      }
    } catch(e) { console.error(e); }
  };

  const set = (k, v) => setForm(f => ({...f, [k]: v}));

  const handleImgChange = (e) => {
    const u = e.target.value.trim();
    setImgUrl(u); setImgPrev(u || '');
  };

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      let data = {...form};
      if (imgUrl) { data.profileImage = await uploadProfileImage(imgUrl); }
      await updateAboutMe(data);
      setSaved(true); setTimeout(() => setSaved(false), 3000);
      loadData(); onDataUpdate?.();
    } catch(e) { console.error(e); alert(e.message); }
    finally { setLoading(false); }
  };

  return (
    <Wrap>
      <TwoCol>
        <Col>
          <SectionTitle>Profile Image</SectionTitle>
          <ProfileCard>
            <AvatarPreview>
              {imgPrev
                ? <img src={imgPrev} alt="Profile" />
                : <PlaceholderIcon>👤</PlaceholderIcon>
              }
            </AvatarPreview>
            <InfoCard>
              📸 Upload a professional profile photo for the Hero section.<br />
              Recommended: 400×400px or larger · JPG, PNG, WebP
            </InfoCard>
          </ProfileCard>
        </Col>

        <Col>
          <SectionTitle>About & Profile</SectionTitle>
          <Card>
            {saved && <Toast>✓ About section updated successfully!</Toast>}
            <form onSubmit={submit}>
              <FormCol>
                <FormGroup>
                  <Label>Profile Image URL</Label>
                  <Input type="text" value={imgUrl} onChange={handleImgChange}
                    placeholder="https://example.com/image.jpg" disabled={loading} />
                  <Helper>Paste a direct image URL to update your profile photo</Helper>
                </FormGroup>

                <FormGroup>
                  <Label>Your Role / Title</Label>
                  <Input value={form.role} onChange={e => set('role', e.target.value)}
                    placeholder="e.g., Full-Stack Developer" disabled={loading} />
                </FormGroup>

                <FormGroup>
                  <Label>Location</Label>
                  <Input value={form.location} onChange={e => set('location', e.target.value)}
                    placeholder="e.g., San Francisco, CA" disabled={loading} />
                </FormGroup>

                <FormGroup>
                  <Label>Bio / About You</Label>
                  <TextArea minH="130px" value={form.bio} onChange={e => set('bio', e.target.value)}
                    placeholder="Tell visitors about yourself, your experience, and what you're passionate about…"
                    disabled={loading} />
                </FormGroup>

                <FormGroup>
                  <Label>Resume / CV URL</Label>
                  <Input value={form.downloadCV} onChange={e => set('downloadCV', e.target.value)}
                    placeholder="https://example.com/resume.pdf" disabled={loading} />
                </FormGroup>

                <Btn variant="primary" type="submit" disabled={loading} style={{width:'100%'}}>
                  {loading ? 'Saving…' : 'Save About Section'}
                </Btn>
              </FormCol>
            </form>
          </Card>
        </Col>
      </TwoCol>
    </Wrap>
  );
};

export default AboutManager;