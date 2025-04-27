import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost } from '../../services/api';
import { Card, Typography, Button, Spin, Form, Input } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { TextArea } = Input;

const EditContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
`;

export const PostEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const getPost = async () => {
      try {
        const postData = await fetchPost(Number(id));
        setPost(postData);
        form.setFieldsValue({
          title: postData.title,
          body: postData.body,
        });
      } catch (err) {
        console.error('Failed to fetch post', err);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id, form]);

  const handleSubmit = async (values: any) => {
    try {
      await updatePost(Number(id), {
        ...post,
        ...values,
      });
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error('Failed to update post', err);
    }
  };

  if (loading) return <Spin size="large" />;

  return (
    <EditContainer>
      <Card
        cover={<img src={`https://picsum.photos/seed/${id}/800/400`} alt="Post" />}
        actions={[
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
          <Button onClick={() => navigate(`/posts/${id}`)}>Cancel</Button>,
        ]}
      >
        <Title level={2}>Edit Post</Title>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="body" label="Content" rules={[{ required: true }]}>
            <TextArea rows={6} />
          </Form.Item>
        </Form>
      </Card>
    </EditContainer>
  );
};