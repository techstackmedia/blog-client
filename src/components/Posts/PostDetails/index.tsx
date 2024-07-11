import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../../../context/Post';
import { useAuth } from '../../../context/Auth';

type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
};

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, deletePost } = usePosts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const foundPost = posts.find((p) => p._id === id);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [posts, id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (id) {
      await deletePost(id);
      navigate('/');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
      <p>{post.content}</p>
      <p className='text-gray-600'>Author: {post.author}</p>
      {isAuthenticated && (
        <div className='flex justify-end'>
          <button
            onClick={handleEdit}
            className='mr-2 p-2 bg-yellow-500 text-white rounded'
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className='p-2 bg-red-500 text-white rounded'
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
