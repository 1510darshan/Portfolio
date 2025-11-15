import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaUser, FaTrash, FaCheck } from 'react-icons/fa';
import { contactAPI } from '../services/api';

const ContactMessages = ({ onUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, read, unread
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data.data);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactAPI.markAsRead(id);
      fetchMessages();
    } catch (error) {
      setError('Failed to mark message as read');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await contactAPI.delete(id);
        setSelectedMessage(null);
        fetchMessages();
      } catch (error) {
        setError('Failed to delete message');
      }
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'read') return msg.isRead;
    if (filter === 'unread') return !msg.isRead;
    return true;
  });

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <Container>
      <Header>
        <div>
          <Title>Contact Messages</Title>
          <MessageCount>
            {filteredMessages.length} messages
            {unreadCount > 0 && <UnreadBadge>{unreadCount} unread</UnreadBadge>}
          </MessageCount>
        </div>
        <FilterButtons>
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </FilterButton>
          <FilterButton active={filter === 'unread'} onClick={() => setFilter('unread')}>
            Unread ({unreadCount})
          </FilterButton>
          <FilterButton active={filter === 'read'} onClick={() => setFilter('read')}>
            Read
          </FilterButton>
        </FilterButtons>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ContentWrapper>
        <MessageList>
          {filteredMessages.length === 0 ? (
            <EmptyState>
              <FaEnvelope />
              <p>No messages found</p>
            </EmptyState>
          ) : (
            filteredMessages.map(msg => (
              <MessageItem
                key={msg._id}
                isUnread={!msg.isRead}
                isSelected={selectedMessage?._id === msg._id}
                onClick={() => setSelectedMessage(msg)}
              >
                <MessageIcon isUnread={!msg.isRead}>
                  <FaUser />
                </MessageIcon>
                <MessagePreview>
                  <MessageHeader>
                    <SenderName>{msg.name}</SenderName>
                    <MessageDate>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </MessageDate>
                  </MessageHeader>
                  <SenderEmail>{msg.email}</SenderEmail>
                  <MessageSubject>{msg.subject || 'No Subject'}</MessageSubject>
                  <MessageExcerpt>{msg.message.substring(0, 80)}...</MessageExcerpt>
                </MessagePreview>
                {!msg.isRead && <UnreadDot />}
              </MessageItem>
            ))
          )}
        </MessageList>

        <MessageDetail>
          {selectedMessage ? (
            <>
              <DetailHeader>
                <SenderInfo>
                  <DetailIcon>
                    <FaUser />
                  </DetailIcon>
                  <div>
                    <DetailName>{selectedMessage.name}</DetailName>
                    <DetailEmail>{selectedMessage.email}</DetailEmail>
                  </div>
                </SenderInfo>
                <DetailActions>
                  {!selectedMessage.isRead && (
                    <ActionButton
                      color="#4CAF50"
                      onClick={() => handleMarkAsRead(selectedMessage._id)}
                    >
                      <FaCheck /> Mark as Read
                    </ActionButton>
                  )}
                  <ActionButton
                    color="#ff4757"
                    onClick={() => handleDelete(selectedMessage._id)}
                  >
                    <FaTrash /> Delete
                  </ActionButton>
                </DetailActions>
              </DetailHeader>

              <DetailContent>
                <DetailSection>
                  <DetailLabel>Subject</DetailLabel>
                  <DetailText>{selectedMessage.subject || 'No Subject'}</DetailText>
                </DetailSection>

                <DetailSection>
                  <DetailLabel>Message</DetailLabel>
                  <DetailMessage>{selectedMessage.message}</DetailMessage>
                </DetailSection>

                <DetailSection>
                  <DetailLabel>Received</DetailLabel>
                  <DetailText>
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </DetailText>
                </DetailSection>

                {selectedMessage.isRead && (
                  <DetailSection>
                    <DetailLabel>Read At</DetailLabel>
                    <DetailText>
                      {new Date(selectedMessage.readAt).toLocaleString()}
                    </DetailText>
                  </DetailSection>
                )}
              </DetailContent>
            </>
          ) : (
            <EmptyDetail>
              <FaEnvelope />
              <p>Select a message to view details</p>
            </EmptyDetail>
          )}
        </MessageDetail>
      </ContentWrapper>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 30px;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 5px;
`;

const MessageCount = styled.div`
  color: #aaa;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UnreadBadge = styled.span`
  background: #ff4757;
  color: #fff;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.active ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#0a0a0a' : '#fff'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#00d4ff' : 'rgba(255, 255, 255, 0.15)'};
  }
`;

const ErrorMessage = styled.div`
  background: #ff4757;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 20px;
  flex: 1;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MessageList = styled.div`
  background: #1a1a2e;
  border-radius: 12px;
  overflow-y: auto;
  padding: 10px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #aaa;

  svg {
    font-size: 4rem;
    margin-bottom: 15px;
    opacity: 0.5;
  }

  p {
    font-size: 1.1rem;
  }
`;

const MessageItem = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isSelected ? 'rgba(0, 212, 255, 0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.isSelected ? '#00d4ff' : 'transparent'};
  position: relative;
  margin-bottom: 5px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const MessageIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.isUnread ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isUnread ? '#0a0a0a' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.2rem;
  }
`;

const MessagePreview = styled.div`
  flex: 1;
  min-width: 0;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const SenderName = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
`;

const MessageDate = styled.div`
  color: #aaa;
  font-size: 0.85rem;
`;

const SenderEmail = styled.div`
  color: #00d4ff;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const MessageSubject = styled.div`
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageExcerpt = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadDot = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: #00d4ff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
`;

const MessageDetail = styled.div`
  background: #1a1a2e;
  border-radius: 12px;
  overflow-y: auto;
  padding: 30px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const EmptyDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #aaa;

  svg {
    font-size: 5rem;
    margin-bottom: 20px;
    opacity: 0.3;
  }

  p {
    font-size: 1.2rem;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
`;

const SenderInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const DetailIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.8rem;
    color: #fff;
  }
`;

const DetailName = styled.div`
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const DetailEmail = styled.div`
  color: #00d4ff;
  font-size: 1rem;
`;

const DetailActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.color};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const DetailContent = styled.div``;

const DetailSection = styled.div`
  margin-bottom: 25px;
`;

const DetailLabel = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const DetailText = styled.div`
  color: #fff;
  font-size: 1rem;
`;

const DetailMessage = styled.div`
  color: #fff;
  font-size: 1rem;
  line-height: 1.7;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
  white-space: pre-wrap;
`;

export default ContactMessages;
