import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost } from '../../services/api';
import { Card, Typography, Button, Spin, Form, Input, message } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { TextArea } = Input;

const EditContainer = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

export const PostEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
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

  if (loading) return <Spin size="large" />;

  return (
    <EditContainer>
      <Card
        cover={<img src={`/images/post-${post.id % 5 || 1}.jpg`} alt="Post" />}
        actions={[
          <Button type="primary" onClick={() => form.submit()}>
            Save Changes
          </Button>,
          <Button onClick={() => navigate(`/posts/${id}`)}>Cancel</Button>
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
      </Card>
    </EditContainer>
  );
};