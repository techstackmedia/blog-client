import PostList from '../../components/Posts/PostList';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <PostList />
    </div>
  );
};

export default Home;
