import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../../context/Post';
import { useUser } from '../../../context/User';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const { createPost } = usePosts();
  const navigate = useNavigate();
  const { user } = useUser();
  const name = user?.name;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await createPost({
        title,
        content,
        author: user?.name ? user?.name : '',
        _id: '',
      });
      navigate('/');
    } else {
      console.error('User is not authenticated');
    }
  };

  const handlePreviewMode = () => {
    if (isPreview) {
      setIsPreview(false);
    } else {
      setIsPreview(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-xl mx-auto p-4 shadow-md rounded-md bg-white'
    >
      <h2 className='text-2xl font-bold mb-4'>Create Post</h2>
      {isPreview ? null : (
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required
          className='w-full p-2 mb-4 border rounded outline-none'
        />
      )}
      {isPreview ? (
        <div className='min-h-96 flex flex-col justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-4'>{title}</h1>
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </div>
          <p className='text-gray-600 my-5'>Author: {name}</p>
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Content'
          required
          className='w-full p-2 mb-4 border rounded min-h-96 resize-none outline-none'
        />
      )}
      <div className='flex gap-4'>
        <button
          type='submit'
          className='w-full p-2 bg-purple-500 text-white rounded outline-none'
        >
          Create Post
        </button>
        <button
          type='button'
          className='w-full p-2 bg-blue-500 text-white rounded'
          onClick={handlePreviewMode}
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
