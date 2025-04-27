import React, { useState, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { fetchUserPosts } from '../../services/api';
import { PostList } from '../../components/Post';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const ContentContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
`;

const Blog: React.FC = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id) {
      const getPosts = async () => {
        try {
          const postsData = await fetchUserPosts(user.id);
          setPosts(postsData);
        } catch (err) {
          console.error('Failed to fetch posts', err);
        } finally {
          setLoading(false);
        }
      };

      getPosts();
    }
  }, [user]);

  return (
    <ContentContainer>
      <Title level={2}>Blog Posts</Title>
      <PostList posts={posts} loading={loading} />
    </ContentContainer>
  );
};

export default Blog;