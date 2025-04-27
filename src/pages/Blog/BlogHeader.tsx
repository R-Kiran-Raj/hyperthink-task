import React from 'react';
import { Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Container = styled.div`
  background: #f7f9fc;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: #2563eb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  font-size: 24px;
  color: white;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #94a3b8;
`;

const FilterButton = styled(Button)`
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
`;

export const BlogHeader: React.FC = () => {
  return (
    <Container>
      <LeftSection>
        <IconWrapper>
          <Icon>⭐</Icon> {/* Replace ⭐ with any icon you like */}
        </IconWrapper>

        <TextSection>
          <Title>All Blog posts</Title>
          <Subtitle>Qatar Development Bank</Subtitle>
        </TextSection>
      </LeftSection>

      <FilterButton>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0 }}>
          <UpOutlined />
          <DownOutlined />
        </div>
        Filter/Sort by
      </FilterButton>
    </Container>
  );
};
