import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../../context/Post';
import { useAuth } from '../../context/Auth';
import { useUser } from '../../context/User';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, updatePost } = usePosts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { user } = useUser();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const post = posts.find((p) => p._id === id);
    if (post && post?.author === user?.name) {
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
    }
  }, [posts, id, user?.name]);

  const handlePreviewMode = () => {
    if (isPreview) {
      setIsPreview(false);
    } else {
      setIsPreview(true);
    }
  };

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
      <h1 className='text-3xl font-bold mb-4'>Edit Existing Post</h1>
      <form
        onSubmit={handleSubmit}
        className='mx-auto border p-4 shadow-md rounded-md bg-white'
      >
        {/* <h2 className='text-2xl font-bold mb-4'>Edit</h2> */}
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
            <p className='text-gray-600 my-5'>Author: {author}</p>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Content'
            required
            className='w-full p-2 mb-4 border rounded resize-none min-h-96 outline-none'
          />
        )}

        {isPreview ? null : (
          <input
            type='text'
            readOnly
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='Author'
            required
            className='w-full p-2 mb-4 border rounded outline-none'
          />
        )}
        <div className='flex gap-4'>
          <button
            type='submit'
            className='w-full p-2 bg-blue-500 text-white rounded'
          >
            Update Post
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
    </div>
  );
};

export default EditPost;
