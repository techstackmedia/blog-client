import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/Auth';
import { usePosts } from '../../../context/Post';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { isAuthenticated } = useAuth();
  const { createPost } = usePosts();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ title, content, author: 'Current User', _id: '' });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md rounded-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Content" 
        required 
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-purple-500 text-white rounded">Create Post</button>
    </form>
  );
};

export default CreatePost;
