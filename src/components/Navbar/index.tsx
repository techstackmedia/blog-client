import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between'>
        <Link to='/' className='text-white'>
          Home
        </Link>
        {isAuthenticated ? (
          <>
            <Link to='/create' className='text-white mr-4'>
              Create Post
            </Link>
            <button onClick={logout} className='text-white'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='text-white mr-4'>
              Login
            </Link>
            <Link to='/register' className='text-white'>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
