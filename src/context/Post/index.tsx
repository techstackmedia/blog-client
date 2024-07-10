import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../../services/api';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
}

interface PostContextProps {
  posts: Post[];
  fetchPosts: () => void;
  createPost: (post: Post) => Promise<void>;
  updatePost: (id: string, post: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextProps>({} as PostContextProps);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await api.get('/api/posts');
    setPosts(response.data);
  };

  const createPost = async (post: Post) => {
    const response = await api.post('/api/posts', post);
    setPosts([...posts, response.data]);
  };

  const updatePost = async (id: string, updatedPost: Post) => {
    const response = await api.put(`/api/posts/${id}`, updatedPost);
    setPosts(posts.map((post) => (post._id === id ? response.data : post)));
  };

  const deletePost = async (id: string) => {
    await api.delete(`/api/posts/${id}`);
    setPosts(posts.filter((post) => post._id !== id));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, fetchPosts, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
