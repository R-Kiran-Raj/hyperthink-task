import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import { UserOutlined, DashboardOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserProfile } from '../UserProfile';

const { Sider } = Layout;
const { Title, Text } = Typography;

const SidebarContainer = styled(Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #1e40af !important;
  z-index: 100;
`;

const UserProfileContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const UserName = styled(Title)`
  color: white !important;
  margin-top: 16px !important;
  margin-bottom: 4px !important;
`;

const UserEmail = styled(Text)`
  color: rgba(255, 255, 255, 0.7) !important;
`;

const StyledMenu = styled(Menu)`
  background: transparent !important;
  border-right: none !important;
  color: white;
  
  .ant-menu-item {
    height: 48px;
    line-height: 48px;
    margin: 0 !important;
    width: 100% !important;
    border-radius: 0 !important;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  .ant-menu-item-selected {
    background: rgba(255, 255, 255, 0.2) !important;
  }
`;

export const Sidebar: React.FC = () => {
  return (
    <SidebarContainer width={250}>
      <UserProfileContainer>
        <Avatar size={64} icon={<UserOutlined />} />
        <UserName level={4}>
          <UserProfile />
        </UserName>
        <UserEmail>user@example.com</UserEmail>
      </UserProfileContainer>
      <StyledMenu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BookOutlined />}>
          <Link to="/blogs">Blogs</Link>
        </Menu.Item>
      </StyledMenu>
    </SidebarContainer>
  );
};