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
  isLoading: boolean;
  isPosting: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  fetchPosts: () => void;
  createPost: (post: Post) => Promise<void>;
  updatePost: (id: string, post: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextProps>({} as PostContextProps);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (post: Post) => {
    setIsPosting(true);
    try {
      const response = await api.post('/api/posts', post);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  };

  const updatePost = async (id: string, updatedPost: Post) => {
    setIsUpdating(true);
    try {
      const response = await api.put(`/api/posts/${id}`, updatedPost);
      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const deletePost = async (id: string) => {
    setIsDeleting(true);
    try {
      await api.delete(`/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, isLoading, isPosting, isUpdating, isDeleting, fetchPosts, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
