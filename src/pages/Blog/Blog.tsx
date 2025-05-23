import React, { useState, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { fetchUserPosts } from '../../services/api';
import { Typography, Card, Divider, Pagination, Tabs, Spin } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BlogHeader } from './BlogHeader';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const BlogContainer = styled.div`
  padding: 40px;
  background: #f5f7fa;
  min-height: 100vh;
  width: 100%;
`;

const ContentSection = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
    padding: 15px;
    border-radius: 15px;
`;

const TabContent = styled.div`
  width: 100%;
      display: flex
;

`;

const PostCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
box-shadow: none!important;
  display: flex;
  overflow: hidden;
  gap: 20px;
  width: 100%;
border-radius: 0px!important;

  .ant-card-body {
    display: flex;
    padding: 0;
    width: 100%;
  }
`;

const PostImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  flex-shrink: 0;
`;

const PostDetails = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const PostTitle = styled(Title)`
  font-size: 18px !important;
  margin: 0 !important;
  color: #111827 !important;
`;

const PostDate = styled(Text)`
  font-size: 12px;
  color: #9ca3af;
`;

const PostContent = styled.div`
  margin-top: 8px;
  color: #4b5563;
  line-height: 1.5;
  font-size: 14px;
`;

const ReadMoreLink = styled(Link)`
  color: #3b82f6;
  font-weight: 500;
  display: inline-block;
  margin-top: auto;
  font-size: 14px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
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

  if (loading) {
    return (
      <BlogContainer>
        <BlogHeader />
        <LoaderContainer>
          <Spin size="large" />
        </LoaderContainer>
      </BlogContainer>
    );
  }

  return (
    <BlogContainer>
      <BlogHeader />
      <ContentSection>
        <TabContent>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="All Posts" key="1" />
            <TabPane tab="Latest Posts" key="2" />
            <TabPane tab="Archived" key="3" />
          </Tabs>
        </TabContent>

        {paginatedPosts.map(post => (
          <PostCard key={post.id} bordered={false}>
            <PostImage src={`https://picsum.photos/seed/${post.id}/300/300`} alt="Post" />
            <PostDetails>
              <PostHeader>
                <PostTitle level={4}>{post.title}</PostTitle>
                <PostDate>{new Date().toLocaleDateString()}</PostDate>
              </PostHeader>
              <PostContent>{post.body}</PostContent>
              <ReadMoreLink to={`/posts/${post.id}`}>Read more</ReadMoreLink>
            </PostDetails>
          </PostCard>
        ))}

        <PaginationContainer>
          <Pagination
            current={currentPage}
            total={posts.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </PaginationContainer>
      </ContentSection>
    </BlogContainer>
  );
};

export default Blog;
