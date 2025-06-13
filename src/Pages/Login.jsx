// src/Pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth, db } from '../Firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const mapErr = (code) => ({
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts, try later.',
    'auth/network-request-failed': 'Network error – check connection.',
  }[code] || 'Login failed, please try again.');

  const getUserRoleAndRedirect = async (user) => {
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const { role } = snap.data();
      if (role === 'Mentor') {
        toast.success('Welcome Mentor!', { autoClose: 1200 });
        setTimeout(() => navigate('/mentor-dashboard'), 1300);
      } else if (role === 'Learner') {
        toast.success('Welcome Learner!', { autoClose: 1200 });
        setTimeout(() => navigate('/learner-dashboard'), 1300);
      } else {
        toast.error('Role not defined.');
      }
    } else {
      toast.error('User data not found in database.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, pwd);
      await getUserRoleAndRedirect(res.user);
    } catch (err) {
      toast.error(mapErr(err.code));
      console.error(err);
    }
  };

  const socialLogin = async (provider) => {
    try {
      const res = await signInWithPopup(auth, provider);
      await getUserRoleAndRedirect(res.user);
    } catch (err) {
      toast.error(mapErr(err.code));
      console.error(err);
    }
  };

  const google = new GoogleAuthProvider();
  const fb = new FacebookAuthProvider();
  const apple = new OAuthProvider('apple.com');

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-10">
      <ToastContainer />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-orange-500">Login to StudyBuddy</h2>
          <p className="text-gray-600 text-sm mt-1">
            Empower your journey with StudyBuddy
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        <div className="pt-4">
          <p className="text-sm text-gray-500 text-center mb-2">Or login with</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => socialLogin(google)}
              className="flex items-center gap-2 border px-4 py-2 rounded-sm text-sm hover:bg-gray-100 transition"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="G" className="w-5 h-5" />
              Google
            </button>
            <button
              onClick={() => socialLogin(fb)}
              className="flex items-center gap-2 border px-4 py-2 rounded-sm text-sm hover:bg-gray-100 transition"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="F" className="w-5 h-5" />
              Facebook
            </button>
            <button
              onClick={() => socialLogin(apple)}
              className="flex items-center gap-2 border px-4 py-2 rounded-sm text-sm hover:bg-gray-100 transition"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="A" className="w-5 h-5" />
              Apple
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/signup" className="text-orange-500 font-semibold hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
