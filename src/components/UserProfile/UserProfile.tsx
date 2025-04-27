import React from 'react';
import { Typography } from 'antd';
import { useUser } from '../../hooks/useUser';

const { Text } = Typography;

export const UserProfile: React.FC = () => {
  const { user, loading, error } = useUser();

  if (loading) return <Text type="secondary">Loading...</Text>;
  if (error) return <Text type="danger">{error}</Text>;
  
  return <Text style={{ color: 'white' }}>{user?.name || 'Guest'}</Text>;
};