import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPost } from '../../services/api';
import { Card, Typography, Button, Spin } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const DetailContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
`;

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const postData = await fetchPost(Number(id));
        setPost(postData);
      } catch (err) {
        console.error('Failed to fetch post', err);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  if (loading) return <Spin size="large" />;

  return (
    <DetailContainer>
      <Card
        cover={<img src={`https://picsum.photos/seed/${id}/800/400`} alt="Post" />}
        actions={[
          <Link to={`/posts/${id}/edit`}>
            <Button type="primary">Edit</Button>
          </Link>,
          <Link to="/blogs">
            <Button>Back to List</Button>
          </Link>,
        ]}
      >
        <Title level={2}>{post?.title}</Title>
        <Paragraph>{post?.body}</Paragraph>
      </Card>
    </DetailContainer>
  );
};