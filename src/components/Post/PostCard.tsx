import React from 'react';
import { Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  height: 100%;
`;

const PostImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

interface PostCardProps {
  post: any;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <StyledCard
      cover={<PostImage src={`https://picsum.photos/seed/${post.id}/600/400`} alt="Post" />}
      actions={[
        <Link to={`/posts/${post.id}`}>
          <Button type="primary">View</Button>
        </Link>,
        <Link to={`/posts/${post.id}/edit`}>
          <Button>Edit</Button>
        </Link>,
      ]}
    >
      <Title level={4}>{post.title}</Title>
      <Paragraph ellipsis={{ rows: 3 }}>{post.body}</Paragraph>
    </StyledCard>
  );
};