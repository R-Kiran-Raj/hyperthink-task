import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost } from '../../services/api';
import { Card, Typography, Button, Spin } from 'antd';
import styled from 'styled-components';
import { deletePost } from '../../services/api';

const { Title, Paragraph } = Typography;

const DetailContainer = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;


export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPost(Number(id));
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleDelete = async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await deletePost(post.id);
        // if (onDelete) onDelete(post.id);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    };

  if (loading) return <Spin size="large" />;

  return (
    <DetailContainer>
      <Card
        cover={<img src={`/images/post-${post.id % 5 || 1}.jpg`} alt="Post" />}
        actions={[
          <Button type="primary" onClick={() => navigate(`/posts/${id}/edit`)}>
            Edit Post
          </Button>,
          <Button danger onClick={handleDelete}>Delete</Button>,
          <Button onClick={() => navigate(-1)}>Back to List</Button>
        ]}
      >
        <Title level={2}>{post?.title}</Title>
        <Paragraph>{post?.body}</Paragraph>
      </Card>
    </DetailContainer>
  );
};