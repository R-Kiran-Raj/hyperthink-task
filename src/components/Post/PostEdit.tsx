import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost } from '../../services/api';
import { Card, Typography, Button, Spin, Form, Input, message, Modal, Skeleton, Space } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { TextArea } = Input;

const EditContainer = styled.div`
  padding: 24px;
  max-width: 1000px;
  margin: 32px auto 64px;
`;

const CustomCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);

  .ant-card-body {
    padding: 24px;
    background: #fff;
  }
`;

const CoverWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.55) 100%);
  }
`;

const CoverLabel = styled.div`
  position: absolute;
  left: 20px;
  bottom: 16px;
  z-index: 2;
  color: #fff;
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled(Button)`
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 8px;
`;

const SaveButton = styled(ActionButton)`
  background-color: #1677ff;
  border-color: #1677ff;
  color: #fff;
  &:hover {
    background-color: #4096ff;
    border-color: #4096ff;
    color: #fff;
  }
  &:focus {
    background-color: #1677ff;
    border-color: #1677ff;
    color: #fff;
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  &:hover {
    background-color: #e6e6e6;
    border-color: #bfbfbf;
  }
  &:focus {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
  }
`;

const StickyActions = styled.div`
  position: sticky;
  bottom: 12px;
  z-index: 10;
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
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

  if (loading) {
    return (
      <EditContainer>
        <HeaderBar>
          <Title level={3} style={{ margin: 0 }}>Edit Post</Title>
          <Space>
            <Skeleton.Button active size="large" shape="round" />
            <Skeleton.Button active size="large" shape="round" />
          </Space>
        </HeaderBar>
        <CustomCard
          cover={
            <CoverWrapper>
              <Skeleton.Image style={{ width: '100%', height: '100%' }} active />
            </CoverWrapper>
          }
        >
          <Skeleton active paragraph={{ rows: 6 }} />
        </CustomCard>
      </EditContainer>
    );
  }

  return (
    <EditContainer>
      <HeaderBar>
        <div>
          <Title level={3} style={{ margin: 0 }}>Edit Post</Title>
          <Text type="secondary">Make changes to your post content and title</Text>
        </div>
        <ButtonWrapper>
          <CancelButton onClick={showConfirmCancel} icon={<CloseOutlined />}>Cancel</CancelButton>
          <SaveButton type="primary" onClick={() => form.submit()} icon={<SaveOutlined />}>Save Changes</SaveButton>
        </ButtonWrapper>
      </HeaderBar>

      <CustomCard
        cover={
          <CoverWrapper>
            <img src={`/images/post-${post.id % 5 || 1}.jpg`} alt="Post" />
            <CoverLabel>
              <Title level={4} style={{ color: '#fff', margin: 0 }}>Editing Post #{post.id}</Title>
              <Text style={{ color: 'rgba(255,255,255,0.85)' }}>{post.title}</Text>
            </CoverLabel>
          </CoverWrapper>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateTrigger="onBlur"
          initialValues={{
            title: post?.title,
            body: post?.body
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Please input post title' },
              { min: 4, message: 'Title should be at least 4 characters' }
            ]}
          >
            <Input size="large" placeholder="Enter a clear, descriptive title" allowClear />
          </Form.Item>
          <Form.Item
            name="body"
            label="Content"
            rules={[
              { required: true, message: 'Please input post content' },
              { min: 20, message: 'Content should be at least 20 characters' }
            ]}
          >
            <TextArea rows={10} showCount maxLength={2000} placeholder="Write your post content here..." />
          </Form.Item>

          <StickyActions>
            <Space>
              <CancelButton onClick={showConfirmCancel} icon={<CloseOutlined />}>Cancel</CancelButton>
              <SaveButton type="primary" onClick={() => form.submit()} icon={<SaveOutlined />}>Save Changes</SaveButton>
            </Space>
          </StickyActions>
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
