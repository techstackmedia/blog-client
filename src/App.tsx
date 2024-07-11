import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PostList from './components/Posts/PostList';
import CreatePost from './components/Posts/CreatePost';
import EditPost from './components/EditPost';
import PostDetails from './components/Posts/PostDetails';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/Auth';
import { PostProvider } from './context/Post';
import { UserProvider } from './context/User';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <UserProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<PostList />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route
                path='/create'
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/edit/:id'
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                }
              />
              <Route path='/posts/:id' element={<PostDetails />} />
            </Routes>
          </UserProvider>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
