import React from 'react';
import { Typography } from 'antd';
import { useUser } from '../../hooks/useUser';

const { Text, Title } = Typography;

export const UserProfile: React.FC = () => {
  const { user, loading, error } = useUser();

  if (loading) return <Text style={{ color: 'white' }}>Loading...</Text>;
  if (error) return <Text style={{ color: 'white' }} type="danger">{error}</Text>;

  return (
    <>
      <Text type="secondary">Hello</Text>
      <Title level={5} style={{ margin: 0 }}>{user?.name || 'Guest User'}</Title>
    </>
  );
};