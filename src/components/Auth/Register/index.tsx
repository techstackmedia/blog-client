import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/Auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
    navigate('/');
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Register as a New User</h1>
      <form
        onSubmit={handleSubmit}
        className='mx-auto p-4 shadow-md rounded-md bg-white'
      >
        {/* <h2 className='text-2xl font-bold mb-4'>Register</h2> */}
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          required
          className='w-full p-2 mb-4 border rounded'
        />
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
          className='w-full p-2 mb-4 border rounded'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
          className='w-full p-2 mb-4 border rounded'
        />
        <button
          type='submit'
          className='w-full p-2 bg-blue-500 text-white rounded'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
