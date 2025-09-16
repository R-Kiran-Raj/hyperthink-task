import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const ContentContainer = styled.div`
  padding: 0;
`;

const Dashboard: React.FC = () => {
  return (
    <ContentContainer>
      <Title level={2}>Dashboard</Title>
      <p>Welcome to your dashboard!</p>
    </ContentContainer>
  );
};

export default Dashboard;