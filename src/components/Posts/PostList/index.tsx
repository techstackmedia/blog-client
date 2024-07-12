import { usePosts } from '../../../context/Post';
import { useAuth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/User';
import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';
import truncateContent from '../../../utils/truncate';

const PostList = () => {
  const { posts, deletePost, isLoading, isDeleting } = usePosts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { user } = useUser();

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    deletePost(id);
  };

  const handlePost = (id: string) => {
    navigate(`/posts/${id}`);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      {posts.map((post) => (
        <div
          key={post._id}
          className='mb-4 p-4 shadow-md rounded-md bg-white border'
        >
          <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
          <Markdown remarkPlugins={[remarkGfm]} className='mb-2'>
            {truncateContent(post.content, 25)}
          </Markdown>
          <p className='text-gray-600'>Author: {post.author}</p>
          <button
            onClick={() => handlePost(post._id)}
            className='bg-blue-500 text-white py-2 px-4 rounded-md mt-5'
          >
            Read Post
          </button>
          {isAuthenticated && post.author === user?.name && (
            <div className='flex justify-end'>
              <button
                onClick={() => handleEdit(post._id)}
                className='mr-2 p-2 bg-yellow-500 text-white rounded'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className='p-2 bg-red-500 text-white rounded'
              >
                {isDeleting ? 'Loading...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
