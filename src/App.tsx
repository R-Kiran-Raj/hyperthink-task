import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Sidebar } from './components/Layout';
import { Dashboard, Blog } from './pages';
import { PostDetail, PostEdit } from './components/Post';
import styled from 'styled-components';

const AppContainer = styled(Layout)`
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;