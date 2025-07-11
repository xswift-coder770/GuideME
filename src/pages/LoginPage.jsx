import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/preferences');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/preferences');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/man.jpg')` }}
    >
      <div className= " max-w-sm bg-[#220036] bg-opacity-95 text-white rounded-3xl shadow-2xl p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegistering ? 'Register' : 'Login'} to GuideMe
        </h2>

        <div className="space-y-4 w-[90%]">
          <input
            className="w-full px-4    py-2 rounded-xl bg-transparent text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-300 transition"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 rounded-xl bg-transparent text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-300 transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-[90%] bg-purple-700 hover:bg-purple-800 transition-colors text-white px-4 py-2 rounded-xl mt-6 font-semibold shadow-md"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-[90%] bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-xl mt-4 font-semibold shadow-md"
        >
          Continue with Google
        </button>

        <p
          className="text-center text-sm mt-4 text-purple-300 hover:text-purple-100 cursor-pointer transition"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
