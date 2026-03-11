import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #040d1a 0%, #071428 50%, #040d1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginBox = styled.div`
  padding: 48px;
  background: rgba(10, 26, 46, 0.8);
  border: 1px solid rgba(34, 211, 238, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(34, 211, 238, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 32px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #22d3ee;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 211, 238, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: 'Space Mono', monospace;

  &:focus {
    outline: none;
    border-color: #22d3ee;
    background: rgba(34, 211, 238, 0.08);
    box-shadow: 0 0 12px rgba(34, 211, 238, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(135deg, #22d3ee, #7b2fff);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.05em;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(34, 211, 238, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  padding: 12px;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 6px;
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-bottom: 20px;
`;

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple password check (default: "admin123")
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    setTimeout(() => {
      if (password === adminPassword) {
        localStorage.setItem('adminAuth', 'true');
        onLogin();
      } else {
        setError('Invalid password. Try "admin123"');
        setPassword('');
      }
      setLoading(false);
    }, 300);
  };

  return (
    <Container>
      <LoginBox>
        <Title>Admin Panel</Title>
        <Subtitle>Enter password to access portfolio management</Subtitle>

        <form onSubmit={handleSubmit}>
          {error && <Error>{error}</Error>}

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              autoFocus
            />
          </FormGroup>

          <Button type="submit" disabled={loading || !password.trim()}>
            {loading ? 'Verifying...' : 'Access Admin Panel'}
          </Button>
        </form>
      </LoginBox>
    </Container>
  );
};

export default AdminLogin;
