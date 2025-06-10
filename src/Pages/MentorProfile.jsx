// src/Pages/MentorProfile.jsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../Firebase';

const menuItems = [
  'Enrolled Students',
  'Start a Session (Zoom)',
  'Professional Details',
  'Personal Details',
  'Upload Course Contents',
];

const MentorProfile = () => {
  /* ───────── state ───────── */
  const [active, setActive] = useState('Enrolled Students');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [experience, setExperience] = useState('');
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ───────── fetch user ───── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      setUid(user.uid);
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const d = snap.data();
          setName(d.name || '');
          setEmail(d.email || '');
          setDesignation(d.designation || '');
          setExperience(d.experience || '');
        }
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  /* ───────── save handlers ─ */
  const saveProfessional = async () => {
    if (!uid) return;
    await updateDoc(doc(db, 'users', uid), { designation, experience });
  };
  const savePersonal = async () => {
    if (!uid) return;
    await updateDoc(doc(db, 'users', uid), { name, email });
  };

  /* ───────── render tiles ─── */
  const render = () => {
    if (loading) return <p>Loading…</p>;

    switch (active) {
      case 'Enrolled Students':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {['Aarav Gupta', 'Isha Verma', 'Yash Sharma'].map((stu) => (
              <div key={stu} className="bg-white rounded-xl shadow p-4">
                <h3 className="text-orange-600 font-semibold">{stu}</h3>
                <p className="text-sm text-gray-600">Course: JavaScript Basics</p>
                <button className="mt-3 bg-orange-500 text-white px-4 py-1 rounded-md hover:bg-orange-600">
                  Message
                </button>
              </div>
            ))}
          </div>
        );

      case 'Start a Session (Zoom)':
        return (
          <div className="bg-white rounded-xl shadow p-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-orange-600">Quick Zoom Session</h3>
            <p className="text-gray-600">
              Generate a Zoom meeting link and share with your learners instantly.
            </p>
            <button
              onClick={() => alert('🔗  Zoom link generated (demo)!')}
              className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
              Generate Link
            </button>
          </div>
        );

      case 'Professional Details':
        return (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-orange-600">Designation</label>
              <input
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full mt-1 border border-orange-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
                placeholder="e.g., Senior Front-End Mentor"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-orange-600">Industry Experience</label>
              <input
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full mt-1 border border-orange-300 px-3 py-2 rounded-md"
                placeholder="e.g., 5 years at Google"
              />
            </div>
            <button
              onClick={saveProfessional}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
              Save Changes
            </button>
          </div>
        );

      case 'Personal Details':
        return (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-orange-600">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 border border-orange-300 px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-orange-600">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border border-orange-300 px-3 py-2 rounded-md"
              />
            </div>
            <button
              onClick={savePersonal}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
              Save Changes
            </button>
          </div>
        );

      case 'Upload Course Contents':
        return (
          <div className="bg-white rounded-xl shadow p-6">
            <label className="block text-sm font-semibold text-orange-600 mb-2">
              Upload PDF / PPT:
            </label>
            <input type="file" className="w-full border border-orange-300 p-2 rounded-md" />
            <p className="text-sm text-gray-500 mt-2">PDF, PPTX up to 20 MB.</p>
            <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
              Upload
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  /* ───────── layout ───────── */
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-1/4 bg-white p-5 border-r border-orange-100">
        <h2 className="text-xl font-bold text-orange-600 mb-6">Mentor Panel</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => setActive(item)}
              className={`cursor-pointer px-4 py-2 rounded-md transition ${
                active === item
                  ? 'bg-orange-100 text-orange-600 font-semibold'
                  : 'hover:bg-orange-50'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">{render()}</main>
    </div>
  );
};

export default MentorProfile;
