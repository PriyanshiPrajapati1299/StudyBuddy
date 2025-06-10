// src/Pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from '../Firebase';   
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const Login = () => {
  /* ────────────────── state ────────────────── */
  const [role, setRole]   = useState('Learner');
  const [email, setEmail] = useState('');
  const [pwd,   setPwd]   = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const navigate          = useNavigate();

  
  const mapErr = (code) => ({
    'auth/invalid-email'         : 'Invalid email address.',
    'auth/user-not-found'        : 'No user found with this email.',
    'auth/wrong-password'        : 'Incorrect password.',
    'auth/too-many-requests'     : 'Too many attempts, try later.',
    'auth/network-request-failed': 'Network error – check connection.',
  }[code] || 'Login failed, please try again.');

  
  const dashRoute = role === 'Mentor' ? '/mentor-dashboard' : '/learner-dashboard';

  /* ─────────── email/password login ─────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
      toast.success(`Logged in as ${role}!`, { autoClose: 1200 });
      setTimeout(() => navigate(dashRoute), 1300);
    } catch (err) {
      toast.error(mapErr(err.code));
      console.error(err);
    }
  };

  /* ─────────── social login ─────────── */
  const socialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      toast.success('Login successful!', { autoClose: 1200 });
      setTimeout(() => navigate(dashRoute), 1300);
    } catch (err) {
      toast.error(mapErr(err.code));
      console.error(err);
    }
  };

  const google = new GoogleAuthProvider();
  const fb     = new FacebookAuthProvider();
  const apple  = new OAuthProvider('apple.com');   

  /* ────────────────── UI ────────────────── */
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-10">
      <ToastContainer />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        {/* title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-orange-500">Login to StudyBuddy</h2>
          <p className="text-gray-600 text-sm mt-1">
            {role === 'Mentor'
              ? 'Guide learners and share your knowledge'
              : 'Empower your learning journey'}
          </p>
        </div>

        {/* role */}
        <div className="flex justify-center gap-4 bg-orange-100 rounded-full p-1">
          {['Learner', 'Mentor'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                role === r
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-orange-500 hover:bg-orange-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* form */}
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

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPwd ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 pr-10"
            />
            {/* Password Eye toggle */}
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPwd ? 'Hide password' : 'Show password'}
            >
              {showPwd ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9a8.963 8.963 0 012.292-5.953m1.421 1.422A8.963 8.963 0 0112 5c5 0 9 4 9 9a8.964 8.964 0 01-2.003 5.718M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c1.61 0 3.147.46 4.414 1.25M19.542 12c-1.274 4.057-5.065 7-9.542 7-1.61 0-3.147-.46-4.414-1.25" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login as {role}
          </button>
        </form>

        {/* social login */}
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

        {/* link */}
        <div className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/signup" className="text-orange-500 font-semibold hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
