import React from 'react';
import { Card, Typography, Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../../services/api';

const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  height: 100%;
  cursor: pointer;
  transition: box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 16px;
`;

interface PostCardProps {
  post: any;
  onDelete?: (postId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if click was on a button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/posts/${post.id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deletePost(post.id);
      if (onDelete) onDelete(post.id);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <PostImage
        src={`/images/post-${post.id % 5 || 1}.jpg`} // Using local images
        alt="Post"
      />
      <Title level={4}>{post.title}</Title>
      <Paragraph ellipsis={{ rows: 3 }}>{post.body}</Paragraph>

      <ActionButtons onClick={(e) => e.stopPropagation()}>
        <Space>
          <Link to={`/posts/${post.id}/edit`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Button danger onClick={handleDelete}>Delete</Button>
        </Space>
      </ActionButtons>
    </StyledCard>
  );
};