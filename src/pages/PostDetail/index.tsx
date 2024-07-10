import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../../context/Post';
import { useAuth } from '../../context/Auth';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, deletePost } = usePosts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const post = posts.find((p) => p._id === id);

  if (!post) {
    return <div className="container mx-auto p-4">Post not found</div>;
  }

  const handleEdit = () => {
    navigate(`/edit/${post._id}`);
  };

  const handleDelete = () => {
    deletePost(post._id);
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      <p className="text-gray-600">Author: {post.author}</p>
      {isAuthenticated && (
        <div className="flex justify-end">
          <button 
            onClick={handleEdit} 
            className="mr-2 p-2 bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            className="p-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
