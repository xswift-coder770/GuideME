import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">{isRegister ? 'Register' : 'Login'}</h2>
        <input
          className="w-full border mb-2 px-3 py-2 rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border mb-2 px-3 py-2 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailAuth} className="w-full bg-blue-600 text-white py-2 rounded mb-2">
          {isRegister ? 'Register' : 'Login'}
        </button>
        <button onClick={handleGoogle} className="w-full bg-red-500 text-white py-2 rounded mb-2">
          Continue with Google
        </button>
        <p className="text-sm text-center">
          {isRegister ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
        <button onClick={onClose} className="mt-2 text-gray-500 text-sm hover:underline block mx-auto">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
