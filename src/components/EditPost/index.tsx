import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../../context/Post';
import { useAuth } from '../../context/Auth';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, updatePost } = usePosts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const post = posts.find((p) => p._id === id);
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
    }
  }, [posts, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updatePost(id, {
        _id: id,
        title,
        content,
        author,
      });
      navigate(`/posts/${id}`);
    }
  };

  if (!isAuthenticated) {
    return <div>You are not authenticated.</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Edit Post</h1>
      <form
        onSubmit={handleSubmit}
        className='max-w-md mx-auto p-4 shadow-md rounded-md bg-white'
      >
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required
          className='w-full p-2 mb-4 border rounded'
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Content'
          required
          className='w-full p-2 mb-4 border rounded'
        />
        <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='Author'
          required
          className='w-full p-2 mb-4 border rounded'
        />
        <button
          type='submit'
          className='w-full p-2 bg-blue-500 text-white rounded'
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
