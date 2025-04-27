import React from 'react';
import { Layout, Menu, Avatar, Button, Collapse, Typography } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  CalendarOutlined,
  BellOutlined,
  FileOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
  SendOutlined,
  SmileOutlined,
  InfoCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserProfile } from '../UserProfile';

const { Sider } = Layout;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const SidebarContainer = styled(Sider)`
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #f0f0f0;
  overflow: auto;
`;

const TopBar = styled.div`
  background: #2563eb;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const Logo = styled.div`
  color: white;
  font-weight: bold;
`;

const Hamburger = styled.div`
  color: white;
  font-size: 24px;
`;

const UserProfileContainer = styled.div`
  text-align: center;
  padding: 24px 16px 16px;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background: #2563eb;
  border: none;
  color: white;
  margin-bottom: 16px;

  &:hover {
    background: #1d4ed8;
    color: white;
  }
`;

const StyledMenu = styled(Menu)`
  border: none;

  .ant-menu-item-group-title {
  font-weight: bold;
  color: #000000;
  }

`;

const StyledCollapse = styled(Collapse)`
  border: none !important;
  background: white;
  
  .ant-collapse-item {
    border-bottom: none !important;
  }

  .ant-collapse-header {
    font-weight: 600;
    font-size: 14px;
  }
`;

const UserName = styled(Title)`
  color: white !important;
  margin-top: 16px !important;
  margin-bottom: 4px !important;
`;

const StatusIndicator = styled.div<{ isOnline: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background-color: ${(props) => (props.isOnline ? '#34D399' : '#D1D5DB')};
  border-radius: 50%;
  border: 2px solid white;
`;

export const Sidebar: React.FC = () => {
  const isOnline = true; // You can replace this with dynamic logic based on the user's status

  return (
    <SidebarContainer width={250}>
      <TopBar>
        <Logo><img src={`/images/logo.svg`} alt="Post" style={{ height: '40px' }} /></Logo>
        <Hamburger>☰</Hamburger>
      </TopBar>

      <UserProfileContainer>
        <div style={{ position: 'relative', width: '64px' }}>
          <Avatar size={64} src="/images/user.jpg" />
          <StatusIndicator isOnline={isOnline} />
        </div>
        <UserName level={4}>
          <UserProfile />
        </UserName>
        <StyledButton>Live Metrics</StyledButton>
      </UserProfileContainer>

      <StyledMenu mode="inline" selectable={false}>
        <Menu.ItemGroup key="dashboards" title="Dashboards">
          <Menu.Item key="overview" icon={<BarChartOutlined />}>
            <Link to="/">Overview</Link>
          </Menu.Item>
          <Menu.Item key="calendar" icon={<CalendarOutlined />}>
            Calendar
          </Menu.Item>
          <Menu.Item key="schedule" icon={<SendOutlined />} disabled>
            Schedule Actions
          </Menu.Item>
          <Menu.Item key="alerts" icon={<BellOutlined />} disabled>
            Live Alerts
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="blogs" title="Blogs">
          <Menu.Item key="all" icon={<SmileOutlined />}>
            <Link to="/blogs">All</Link>
          </Menu.Item>
          <Menu.Item key="latest" icon={<InfoCircleOutlined />}>
            Latest
          </Menu.Item>
          <Menu.Item key="archived" icon={<FileTextOutlined />}>
            Archived
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.Divider />
      </StyledMenu>

      <StyledCollapse ghost>
        <Panel header="DOCUMENTATION" key="1">
          {/* Add Documentation links here */}
        </Panel>
        <Panel header="REPORTS" key="2">
          {/* Add Reports links here */}
        </Panel>
        <Panel header="NEED HELP?" key="3">
          {/* Add Help links here */}
        </Panel>
      </StyledCollapse>
    </SidebarContainer>
  );
};
