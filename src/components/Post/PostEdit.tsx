import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost } from '../../services/api';
import { Card, Typography, Button, Spin, Form, Input, message, Modal } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { TextArea } = Input;

const EditContainer = styled.div`
  padding: 24px;
  max-width: 900px;
  margin: 40px auto;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
    img {
      max-height: 400px;
      object-fit: cover;
      width: 100%;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  margin-top: 24px;
`;

const ActionButton = styled(Button)`
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 8px;
`;

const SaveButton = styled(ActionButton)`
  background-color: #1890ff;
  border-color: #1890ff;
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  &:focus {
    background-color: #1890ff;
    border-color: #1890ff;
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: #f0f2f5;
  border-color: #d9d9d9;
  &:hover {
    background-color: #d9d9d9;
    border-color: #bfbfbf;
  }
  &:focus {
    background-color: #f0f2f5;
    border-color: #d9d9d9;
  }
`;

export const PostEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPost(Number(id));
        setPost(data);
        form.setFieldsValue({
          title: data.title,
          body: data.body
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, form]);

  const handleSubmit = async (values: any) => {
    try {
      await updatePost(Number(id), {
        ...post,
        ...values
      });
      message.success('Post updated successfully');
      navigate(`/posts/${id}`);
    } catch (error) {
      message.error('Failed to update post');
      console.error('Error updating post:', error);
    }
  };

  const showConfirmCancel = () => {
    setIsModalVisible(true);
  };

  const handleCancelConfirm = () => {
    setIsModalVisible(false);
    navigate(`/posts/${id}`);
  };

  if (loading) return <Spin size="large" />;

  return (
    <EditContainer>
      <CustomCard
        cover={<img src={`/images/post-${post.id % 5 || 1}.jpg`} alt="Post" />}
        actions={[
          <SaveButton type="primary" onClick={() => form.submit()}>
            Save Changes
          </SaveButton>,
          <CancelButton onClick={showConfirmCancel}>Cancel</CancelButton>,
        ]}
      >
        <Title level={2}>Edit Post</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            title: post?.title,
            body: post?.body
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input post title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label="Content"
            rules={[{ required: true, message: 'Please input post content' }]}
          >
            <TextArea rows={6} />
          </Form.Item>
        </Form>
      </CustomCard>

      {/* Confirmation Modal */}
      <Modal
        title="Cancel Changes"
        open={isModalVisible}
        onOk={handleCancelConfirm}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes, Cancel"
        cancelText="No, Stay"
        centered
        bodyStyle={{ padding: '16px 24px' }}
      >
        <p>Are you sure you want to discard the changes and go back without saving?</p>
      </Modal>
    </EditContainer>
  );
};
