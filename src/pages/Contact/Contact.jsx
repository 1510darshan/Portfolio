import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// ── Animations ──────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(34, 211, 238, 0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// ── Styled Components ────────────────────────────────────────
const ContactContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #040d1a 0%, #071428 50%, #040d1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 40px;
  scroll-margin-top: 80px;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const Inner = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  animation: ${fadeInUp} 0.8s ease forwards;
`;

const SectionTag = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #22d3ee;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  color: white;
  letter-spacing: 0.05em;

  span {
    background: linear-gradient(135deg, #22d3ee, #7b2fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.8;
  max-width: 500px;
  margin-top: 12px;
`;

// ── Grid ─────────────────────────────────────────────────────
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 50px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

// ── Left Panel ────────────────────────────────────────────────
const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(10, 26, 46, 0.8);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(34,211,238,0.4);
    box-shadow: 0 0 20px rgba(34,211,238,0.08);
    transform: translateX(6px);
  }
`;

const ItemIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${({ color }) => `${color}15`};
  border: 1px solid ${({ color }) => `${color}30`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${ContactItem}:hover & {
    background: ${({ color }) => `${color}25`};
    border-color: ${({ color }) => `${color}60`};
  }
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ItemLabel = styled.span`
  font-size: 0.68rem;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-family: 'Space Mono', monospace;
`;

const ItemValue = styled.span`
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
  transition: color 0.3s ease;

  ${ContactItem}:hover & {
    color: #22d3ee;
  }
`;

// ── Social Row ────────────────────────────────────────────────
const SocialTitle = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SocialBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(10,26,46,0.8);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: rgba(255,255,255,0.5);
  font-size: 0.78rem;
  font-family: 'Space Mono', monospace;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ color }) => color || '#22d3ee'};
    color: ${({ color }) => color || '#22d3ee'};
    background: ${({ color }) => `${color || '#22d3ee'}10`};
    box-shadow: 0 0 14px ${({ color }) => `${color || '#22d3ee'}20`};
    transform: translateY(-2px);
  }
`;

// ── Availability Badge ────────────────────────────────────────
const AvailBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(0,255,136,0.06);
  border: 1px solid rgba(0,255,136,0.2);
  border-radius: 10px;
`;

const AvailDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff88;
  animation: ${pulse} 2s ease-in-out infinite;
  flex-shrink: 0;
`;

const AvailText = styled.span`
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  font-family: 'Space Mono', monospace;

  strong {
    color: #00ff88;
  }
`;

// ── Form ──────────────────────────────────────────────────────
const FormCard = styled.div`
  background: rgba(10, 26, 46, 0.7);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 16px;
  padding: 36px;

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
`;

const FormSubtitle = styled.p`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
  margin-bottom: 28px;
  font-family: 'Space Mono', monospace;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FormGroupFull = styled(FormGroup)`
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-family: 'Space Mono', monospace;
`;

const Input = styled.input`
  padding: 12px 16px;
  background: rgba(4, 13, 26, 0.6);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-family: 'Rajdhani', sans-serif;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255,255,255,0.2);
  }

  &:focus {
    border-color: rgba(34,211,238,0.4);
    background: rgba(4,13,26,0.9);
    box-shadow: 0 0 16px rgba(34,211,238,0.08);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  background: rgba(4, 13, 26, 0.6);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
  appearance: none;

  option {
    background: #071428;
    color: white;
  }

  &:focus {
    border-color: rgba(34,211,238,0.4);
    box-shadow: 0 0 16px rgba(34,211,238,0.08);
  }
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  background: rgba(4, 13, 26, 0.6);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-family: 'Rajdhani', sans-serif;
  outline: none;
  resize: vertical;
  min-height: 130px;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255,255,255,0.2);
  }

  &:focus {
    border-color: rgba(34,211,238,0.4);
    background: rgba(4,13,26,0.9);
    box-shadow: 0 0 16px rgba(34,211,238,0.08);
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 14px 28px;
  background: ${({ sent }) =>
    sent
      ? 'linear-gradient(135deg, #00ff88, #00aa55)'
      : 'linear-gradient(135deg, rgba(34,211,238,0.8), rgba(123,47,255,0.8))'};
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'Space Mono', monospace;
  cursor: ${({ loading }) => loading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: ${({ loading }) => loading ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ sent }) =>
      sent
        ? '0 8px 24px rgba(0,255,136,0.3)'
        : '0 8px 24px rgba(34,211,238,0.3)'};
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

// ── Footer Strip ──────────────────────────────────────────────
const FooterStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: white;
`;

const FooterCopy = styled.p`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.25);
  font-family: 'Space Mono', monospace;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  a {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    font-family: 'Space Mono', monospace;
    letter-spacing: 0.1em;
    transition: color 0.2s ease;

    &:hover { color: #22d3ee; }
  }
`;

// ── Data ─────────────────────────────────────────────────────
const contactItems = [
  { icon: '✉', label: 'Email',    value: 'darshan@example.com', href: 'mailto:darshan@example.com', color: '#22d3ee' },
  { icon: '📍', label: 'Location', value: 'Pune, Maharashtra, India', href: '#',                    color: '#7b2fff' },
  { icon: '💼', label: 'LinkedIn', value: '/in/darshanwalhe',          href: '#',                    color: '#0077b5' },
  { icon: '⬡',  label: 'GitHub',   value: '/darshanwalhe-dev',         href: '#',                    color: '#00ff88' },
];

const socials = [
  { icon: '💼', label: 'LinkedIn', color: '#0077b5', href: '#' },
  { icon: '🐙', label: 'GitHub',   color: '#00ff88', href: '#' },
  { icon: '🐦', label: 'Twitter',  color: '#1d9bf0', href: '#' },
  { icon: '📸', label: 'Instagram',color: '#ff2d78', href: '#' },
];

const subjects = [
  'Freelance Project',
  'Full-time Opportunity',
  'Collaboration',
  'Open Source',
  'Just Saying Hi',
];

// ── Component ────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1800);
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  return (
    <ContactContainer id="contact">
      <Inner>

        {/* Header */}
        <div>
          <SectionTag>// Get In Touch</SectionTag>
          <SectionTitle>Contact <span>Me</span></SectionTitle>
          <SectionSubtitle>
            Have a project in mind or want to collaborate?
            I'm always open to discussing new opportunities.
          </SectionSubtitle>
        </div>

        {/* Grid */}
        <Grid>

          {/* Left — Info */}
          <InfoPanel>

            <ContactItems>
              {contactItems.map(item => (
                <ContactItem key={item.label} href={item.href}>
                  <ItemIcon color={item.color}>{item.icon}</ItemIcon>
                  <ItemText>
                    <ItemLabel>{item.label}</ItemLabel>
                    <ItemValue>{item.value}</ItemValue>
                  </ItemText>
                </ContactItem>
              ))}
            </ContactItems>

            {/* Socials */}
            <div>
              <SocialTitle>// Find me on</SocialTitle>
              <SocialRow>
                {socials.map(s => (
                  <SocialBtn key={s.label} href={s.href} color={s.color}>
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </SocialBtn>
                ))}
              </SocialRow>
            </div>

            {/* Availability */}
            <AvailBadge>
              <AvailDot />
              <AvailText>
                <strong>Available for work</strong> — Open to freelance & full-time roles
              </AvailText>
            </AvailBadge>

          </InfoPanel>

          {/* Right — Form */}
          <FormCard>
            <FormTitle>Send a Message</FormTitle>
            <FormSubtitle>// I'll get back to you within 24 hours</FormSubtitle>

            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <Label>Your Name *</Label>
                  <Input
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    style={{ borderColor: errors.name ? '#ff2d78' : '' }}
                  />
                  {errors.name && (
                    <span style={{ fontSize: '0.7rem', color: '#ff2d78', fontFamily: 'Space Mono' }}>
                      {errors.name}
                    </span>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    style={{ borderColor: errors.email ? '#ff2d78' : '' }}
                  />
                  {errors.email && (
                    <span style={{ fontSize: '0.7rem', color: '#ff2d78', fontFamily: 'Space Mono' }}>
                      {errors.email}
                    </span>
                  )}
                </FormGroup>
              </FormGrid>

              <FormGroupFull>
                <Label>Subject</Label>
                <Select
                  value={form.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                >
                  <option value="">Select a subject...</option>
                  {subjects.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
              </FormGroupFull>

              <FormGroupFull>
                <Label>Message *</Label>
                <Textarea
                  placeholder="Tell me about your project or idea..."
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  style={{ borderColor: errors.message ? '#ff2d78' : '' }}
                />
                {errors.message && (
                  <span style={{ fontSize: '0.7rem', color: '#ff2d78', fontFamily: 'Space Mono' }}>
                    {errors.message}
                  </span>
                )}
              </FormGroupFull>

              <SubmitBtn
                type="submit"
                sent={sent ? 1 : 0}
                loading={loading ? 1 : 0}
                disabled={loading}
              >
                {loading ? (
                  <><Spinner /> Sending...</>
                ) : sent ? (
                  <>✓ Message Sent!</>
                ) : (
                  <>Send Message →</>
                )}
              </SubmitBtn>
            </form>
          </FormCard>

        </Grid>

        {/* Footer Strip */}
        <FooterStrip>
          <FooterLogo>Darshan Walhe</FooterLogo>
          <FooterCopy>© 2024 Darshan Walhe. All rights reserved.</FooterCopy>
          <FooterLinks>
            {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
            ))}
          </FooterLinks>
        </FooterStrip>

      </Inner>
    </ContactContainer>
  );
};

export default Contact;