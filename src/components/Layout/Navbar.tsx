import React from 'react';
import { Layout, Input, Button, Avatar, Dropdown, Menu } from 'antd';
import {
  PlusOutlined,
  BellOutlined,
  MailOutlined,
  AppstoreOutlined,
  UserOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Header } = Layout;

const NavbarContainer = styled(Header)`
  background: #ffffff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const SearchInput = styled(Input)`
  max-width: 300px;
  background: #f5faff;
  border: none;
  border-radius: 8px;

  input {
    background: transparent;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.div`
  font-size: 20px;
  color: #5f6368;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

export const Navbar: React.FC = () => {
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <NavbarContainer>
      <LeftSection>
        <SearchInput
          prefix={<UserOutlined style={{ color: '#b0bec5' }} />}
          placeholder="Type here to search..."
        />
      </LeftSection>

      <RightSection>
        <Button type="link" icon={<PlusOutlined />} style={{ padding: 0 }}>
          Add
        </Button>
        <IconButton>
          <BellOutlined />
        </IconButton>
        <IconButton>
          <MailOutlined />
        </IconButton>
        <IconButton>
          <AppstoreOutlined />
        </IconButton>

        <Dropdown overlay={userMenu} trigger={['click']}>
          <Avatar src="/images/user.jpg" style={{ cursor: 'pointer' }} />
        </Dropdown>
      </RightSection>
    </NavbarContainer>
  );
};
