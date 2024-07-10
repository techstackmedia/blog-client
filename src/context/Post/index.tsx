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
  createPost: (post: Post) => void;
  updatePost: (id: string, post: Post) => void;
  deletePost: (id: string) => void;
}

const PostContext = createContext<PostContextProps>({} as PostContextProps);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await api.get('/posts');
    setPosts(response.data);
  };

  const createPost = async (post: Post) => {
    const response = await api.post('/posts', post);
    setPosts([...posts, response.data]);
  };

  const updatePost = async (id: string, post: Post) => {
    const response = await api.put(`/posts/${id}`, post);
    setPosts(posts.map((p) => (p._id === id ? response.data : p)));
  };

  const deletePost = async (id: string) => {
    await api.delete(`/posts/${id}`);
    setPosts(posts.filter((p) => p._id !== id));
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
