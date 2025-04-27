import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Sidebar } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import { PostDetail } from './components/Post/PostDetail';
import { PostEdit } from './components/Post/PostEdit';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Content style={{ marginLeft: 250, background: '#f5f7fa' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/posts/:id/edit" element={<PostEdit />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;