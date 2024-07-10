import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import { PostProvider } from './context/Post';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/User';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <UserProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/posts/:id' element={<PostDetail />} />
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
          </Routes>
          </UserProvider>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
