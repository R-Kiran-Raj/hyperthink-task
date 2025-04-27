import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import { UserOutlined, DashboardOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserProfile } from '../UserProfile';

const { Sider } = Layout;
const { Title } = Typography;

const SidebarContainer = styled(Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

const LogoContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Sidebar: React.FC = () => {
  return (
    <SidebarContainer width={250}>
      <LogoContainer>
        <Avatar size={64} icon={<UserOutlined />} />
        <Title level={4} style={{ color: 'white', marginTop: '10px' }}>
          <UserProfile />
        </Title>
      </LogoContainer>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BookOutlined />}>
          <Link to="/blogs">Blogs</Link>
        </Menu.Item>
      </Menu>
    </SidebarContainer>
  );
};