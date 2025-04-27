import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUser = async (userId: number) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
  return response.data;
};

export const fetchUserPosts = async (userId: number) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`);
  return response.data;
};

export const fetchPost = async (postId: number) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
  return response.data;
};

export const updatePost = async (postId: number, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, data);
  return response.data;
};