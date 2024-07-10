import { usePosts } from '../../../context/Post';
import { useAuth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/User';

const PostList = () => {
  const { posts, deletePost } = usePosts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { user } = useUser();

  console.log(user?.name)
  const id = user?._id

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    deletePost(id);
  };

  const handlePost = (id: string) => {
    navigate(`/posts/${id}`);
  };
  console.log(posts)

  return (
    <div className='container mx-auto p-4'>
      {posts.map((post) => (
        <div key={post._id} className='mb-4 p-4 shadow-md rounded-md bg-white border'>
          <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
          <p className='mb-2'>{post.content}</p>
          <p className='text-gray-600'>Author: {post.author}</p>
          <button onClick={() => handlePost(post._id)} className='bg-blue-500 text-white py-2 px-4 rounded-md mt-5'>Read Post</button>
          {isAuthenticated && post.author && (
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
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
