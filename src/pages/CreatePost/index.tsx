import CreatePost from '../../components/Posts/CreatePost';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Post</h1>
      <CreatePost />
    </div>
  );
};

export default Home;