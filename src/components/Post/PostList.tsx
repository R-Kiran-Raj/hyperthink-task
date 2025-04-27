import React from 'react';
import { List, Card, Skeleton, Button } from 'antd';
import { PostCard } from './PostCard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledList = styled(List)`
  margin-top: 20px;
`;

interface PostListProps {
  posts: any[];
  loading: boolean;
}

export const PostList: React.FC<PostListProps> = ({ posts, loading }) => {
  if (loading) {
    return <Skeleton active />;
  }

  return (
    <StyledList
      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
      dataSource={posts}
      renderItem={(post) => (
        <List.Item>
          <PostCard post={post} />
        </List.Item>
      )}
    />
  );
};