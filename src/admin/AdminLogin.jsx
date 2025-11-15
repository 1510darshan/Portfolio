import React, { useState } from 'react';
import styled from 'styled-components';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminEmail', response.data.admin.email);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>🎨</Logo>
        <Title>Admin Login</Title>
        <Subtitle>Portfolio Management System</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@portfolio.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </Form>

        <DefaultCredentials>
          <small>Default credentials: admin@portfolio.com / admin123</small>
        </DefaultCredentials>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const Logo = styled.div`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #f8fafc;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  color: #94a3b8;
  text-align: center;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #cbd5e1;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #f8fafc;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.6);
    background: rgba(15, 23, 42, 0.7);
  }

  &::placeholder {
    color: #64748b;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(168, 85, 247, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const DefaultCredentials = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #64748b;
`;
