import React, { useState, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { fetchUserPosts } from '../../services/api';
import { Typography, Card, Divider, Pagination } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const BlogContainer = styled.div`
  margin-left: 250px;
  padding: 40px;
  background: #f5f7fa;
  min-height: 100vh;
`;

const BlogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SidebarSection = styled.div`
  width: 220px;
  float: left;
  padding-right: 30px;
`;

const ContentSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SectionTitle = styled(Title)`
  font-size: 16px !important;
  color: #6b7280 !important;
  margin-bottom: 16px !important;
  text-transform: uppercase;
`;

const MenuItem = styled.li`
  padding: 8px 0;
  color: #4b5563;
  cursor: pointer;
  &:hover {
    color: #1e40af;
  }
`;

const PostCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
  display: flex;
  gap: 20px;

  .ant-card-head {
    border-bottom: none;
    padding: 0;
  }
  
  .ant-card-body {
    padding: 0;
  }
`;

const PostTitle = styled(Title)`
  font-size: 20px !important;
  margin-bottom: 12px !important;
  color: #111827 !important;
`;

const PostContent = styled.div`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const ReadMoreLink = styled.a`
  color: #3b82f6;
  font-weight: 500;
  display: inline-block;
  margin-top: 8px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  
  .ant-pagination-item {
    border-radius: 6px;
    margin: 0 4px;
  }
  
  .ant-pagination-item-active {
    background: #3b82f6;
    border-color: #3b82f6;
  }
  
  .ant-pagination-item-active a {
    color: white;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const Blog: React.FC = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 4;

  useEffect(() => {
    if (user?.id) {
      const getPosts = async () => {
        try {
          const postsData = await fetchUserPosts(user.id);
          setPosts(postsData);
        } catch (err) {
          console.error('Failed to fetch posts', err);
        } finally {
          setLoading(false);
        }
      };

      getPosts();
    }
  }, [user]);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <BlogContainer>
      <BlogHeader>
        <Title level={2} style={{ marginBottom: 0 }}>All Blog posts</Title>
        <Text type="secondary">Call Blog, comment Bank</Text>
      </BlogHeader>

      <Divider style={{ margin: '16px 0 24px' }} />

      <div style={{ display: 'flex' }}>
        <ContentSection>
          <Text strong style={{ display: 'block', marginBottom: 24, fontSize: 16 }}>LATEST POSTS</Text>

          {paginatedPosts.map(post => (
            <PostCard key={post.id} bordered={false}
            cover={<PostImage src={`https://picsum.photos/seed/${post.id}/600/400`} alt="Post" />}
            >
              <PostTitle level={3}>{post.title}</PostTitle>
              <PostContent>
                {post.body}
              </PostContent>
              <Link to={`/posts/${post.id}`}>Read more</Link>
            </PostCard>
          ))}

          <PaginationContainer>
            <Pagination
              current={currentPage}
              total={posts.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showQuickJumper={false}
              showLessItems
              itemRender={(page, type) => {
                if (type === 'page') {
                  return <span style={{ display: 'inline-block', minWidth: 24 }}>{page}</span>;
                }
                return null;
              }}
            />
          </PaginationContainer>
        </ContentSection>
      </div>
    </BlogContainer>
  );
};

export default Blog;