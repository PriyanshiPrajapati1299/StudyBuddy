// src/Pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth, db } from '../Firebase';          
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  /* ───── state ───── */
  const [role, setRole] = useState('Learner');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [strength, setStrength] = useState('');  // Weak | Moderate | Strong
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  /* ───── helpers ───── */
  const calcStrength = (p) => {
    const hasLetter = /[A-Za-z]/.test(p);
    const hasNum    = /[0-9]/.test(p);
    const hasSpec   = /[^A-Za-z0-9]/.test(p);
    if (p.length < 6) return 'Weak';
    if (p.length >= 8 && hasLetter && hasNum && hasSpec) return 'Strong';
    if (hasLetter && hasNum) return 'Moderate';
    return 'Weak';
  };

  const dashRoute = role === 'Mentor' ? '/mentor-dashboard' : '/learner-dashboard';

  const mapErr = (c) => ({
    'auth/email-already-in-use': 'Email already registered.',
    'auth/invalid-email'       : 'Invalid email address.',
    'auth/weak-password'       : 'Password must be at least 6 characters.',
  }[c] || 'Something went wrong, try again.');

  /* ───── email/password signup ───── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (strength === 'Weak') {
      toast.error('Password too weak (min 6 chars, letters & numbers)');
      return;
    }

    try {
      
      const cred = await createUserWithEmailAndPassword(auth, email, pwd);
      await updateProfile(cred.user, { displayName: name });

      
      await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      toast.success(`Signed-up as ${role}!`, { autoClose: 1500 });
      setTimeout(() => navigate(dashRoute), 1600);
    } catch (err) {
      toast.error(mapErr(err.code));
    }
  };

  /* ───── social signup/login ───── */
  const socialLogin = async (provider) => {
    try {
      const res = await signInWithPopup(auth, provider);
      
      if (res?.user) {
        await setDoc(doc(db, 'users', res.user.uid), {
          name : res.user.displayName || '',
          email: res.user.email,
          role : role,
          createdAt: new Date(),
        }, { merge: true });
      }
      toast.success('Login successful!', { autoClose: 1500 });
      setTimeout(() => navigate(dashRoute), 1600);
    } catch (err) {
      toast.error(mapErr(err.code));
    }
  };

  const google = new GoogleAuthProvider();
  const fb     = new FacebookAuthProvider();
  const apple  = new OAuthProvider('apple.com'); // Apple needs extra setup

  /* ───── UI ───── */
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-10">
      <ToastContainer />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">

        {/* heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-orange-500">Create your StudyBuddy Account</h2>
          <p className="text-gray-600 text-sm mt-1">
            {role === 'Mentor'
              ? 'Start mentoring and inspire learners.'
              : 'Start your learning journey today!'}
          </p>
        </div>

        {/* role toggle */}
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
          <input
            type="text" placeholder="Your Name" required value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email" placeholder="you@example.com" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />

          {/* password + eye + strength */}
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="••••••••"
              required
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                setStrength(calcStrength(e.target.value));
              }}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 pr-10"
            />
            {/* eye toggle */}
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
            >
              {showPwd ? (
                /* eye-off */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.98 9.98 0 012.093-3.42m1.414-1.414A9.969 9.969 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.967 9.967 0 01-1.054 2.235M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                </svg>
              ) : (
                /* eye */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>

            {pwd && (
              <p className={`mt-1 text-xs font-medium ${
                strength === 'Weak'      ? 'text-red-500'
                : strength === 'Moderate'? 'text-yellow-600'
                : 'text-green-600'
              }`}>
                Password strength: {strength}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={strength === 'Weak'}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              strength === 'Weak'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg'
            }`}
          >
            Sign Up as {role}
          </button>
        </form>

        {/* social buttons */}
        <div className="pt-4">
          <p className="text-sm text-gray-500 text-center mb-2">Or sign up with</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => socialLogin(google)}
                    className="flex items-center gap-2 border px-4 py-2 rounded-sm hover:bg-gray-100 transition">
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button onClick={() => socialLogin(fb)}
                    className="flex items-center gap-2 border px-4 py-2 rounded-sm hover:bg-gray-100 transition">
              <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" className="w-5 h-5" alt="Facebook" />
              Facebook
            </button>
            <button onClick={() => socialLogin(apple)}
                    className="flex items-center gap-2 border px-4 py-2 rounded-sm hover:bg-gray-100 transition">
              <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" className="w-5 h-5" alt="Apple" />
              Apple
            </button>
          </div>
        </div>

        {/* link */}
        <div className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-orange-500 font-semibold hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
