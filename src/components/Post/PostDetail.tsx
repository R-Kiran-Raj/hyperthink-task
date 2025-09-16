import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, deletePost } from '../../services/api';
import { Card, Typography, Button, Spin, Modal } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const DetailContainer = styled.div`
  width: 100%;
  padding: 16px;
  max-width: 1200px; /* Set max-width for better control on larger screens */
  margin: 40px auto;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px 8px; /* Adjust padding for smaller screens */
  }
`;

const CustomCard = styled(Card)`
  .ant-card-body {
    padding: 24px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }

  .ant-card-cover {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-top: 16px;
`;

const DeleteButton = styled(Button)`
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 8px;
  &:hover {
    background-color: #ff7875;
    border-color: #ff7875;
  }
  &:focus {
    background-color: #ff4d4f;
    border-color: #ff4d4f;
  }
`;

const EditButton = styled(Button)`
  background-color: #1890ff;
  border-color: #1890ff;
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 8px;
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  &:focus {
    background-color: #1890ff;
    border-color: #1890ff;
  }
`;

const BackButton = styled(Button)`
  background-color: #f0f2f5;
  border-color: #d9d9d9;
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 8px;
  &:hover {
    background-color: #d9d9d9;
    border-color: #bfbfbf;
  }
  &:focus {
    background-color: #f0f2f5;
    border-color: #d9d9d9;
  }
`;

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      navigate('/blogs'); // Redirect to Blogs after successful deletion
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setIsModalVisible(false); // Close the modal after the operation
    }
  };

  const showDeleteConfirm = () => {
    setIsModalVisible(true); // Show the confirmation modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal without deleting
  };

  if (loading) return <Spin size="large" />;

  return (
    <DetailContainer>
      <CustomCard
        cover={<img src={`/images/post-${post.id % 5 || 1}.jpg`} alt="Post" style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }} />}
        actions={[
          <EditButton type="primary" onClick={() => navigate(`/posts/${id}/edit`)}>
            Edit Post
          </EditButton>,
          <DeleteButton danger onClick={showDeleteConfirm}>
            Delete
          </DeleteButton>,
          <BackButton onClick={() => navigate(`/blogs`)}>Back to List</BackButton>,
        ]}
      >
        <Title level={2}>{post?.title}</Title>
        <Paragraph>{post?.body}</Paragraph>
      </CustomCard>

      {/* Confirmation Modal */}
      <Modal
        title="Delete Post"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ style: { borderRadius: '8px' } }}
        centered
        bodyStyle={{ padding: '16px 24px' }}
      >
        <p style={{ fontSize: '16px', color: '#333' }}>
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
      </Modal>
    </DetailContainer>
  );
};
