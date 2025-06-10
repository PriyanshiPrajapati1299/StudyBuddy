// src/Pages/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../Firebase';          
import Certificate from '../Images/certificate.jpg';


const profileSections = [
  'Achieved Certificates',
  'Enrolled Courses',
  'Completed Courses',
  'Educational Details',
  'Personal Details',
];

const StudentProfile = () => {
  
  const [activeSection, setActiveSection] = useState('Achieved Certificates');
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [degree,  setDegree]  = useState('');
  const [college, setCollege] = useState('');
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      setUid(user.uid);
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setName(data.name || '');
          setEmail(data.email || '');
          setDegree(data.degree || '');
          setCollege(data.college || '');
        }
      } catch (err) {
        console.error('Firestore fetch error:', err);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  
  const saveEducational = async () => {
    if (!uid) return;
    await updateDoc(doc(db, 'users', uid), {
      degree,
      college,
    });
  };

  const savePersonal = async () => {
    if (!uid) return;
    await updateDoc(doc(db, 'users', uid), {
      name,
      email,
    });
  };

  
  const renderSection = () => {
    if (loading) return <p>Loading…</p>;

    switch (activeSection) {
      /* Certificates */
      case 'Achieved Certificates':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4">
                <h3 className="text-orange-600 font-semibold text-lg mb-2">
                  Certificate #{i}
                </h3>
                <img
                  src={Certificate}
                  alt="Certificate"
                  className="w-full object-cover p-3 bg-orange-100"
                />
              </div>
            ))}
          </div>
        );

      /* Enrolled */
      case 'Enrolled Courses':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {['HTML', 'CSS', 'JavaScript'].map((c, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold text-orange-600 mb-1">
                  {c}
                </h3>
                <p className="text-sm text-gray-600">In Progress</p>
                <div className="w-full bg-orange-100 h-2 rounded-full mt-3">
                  <div className="h-2 bg-orange-500 rounded-full w-3/5"></div>
                </div>
              </div>
            ))}
          </div>
        );

      /* Completed */
      case 'Completed Courses':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {['Graphic Designing', 'UI/UX Designing'].map((c, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold text-orange-600 mb-1">
                  {c}
                </h3>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            ))}
          </div>
        );

      /* Educational */
      case 'Educational Details':
        return (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-orange-600">
                Degree
              </label>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full mt-1 border border-orange-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
                placeholder="e.g., B.Tech CSE"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-orange-600">
                College Name
              </label>
              <input
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full mt-1 border border-orange-300 px-3 py-2 rounded-md"
                placeholder="e.g., College of Engineering"
              />
            </div>
            <button
              onClick={saveEducational}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
              Save Changes
            </button>
          </div>
        );

      /* Personal */
      case 'Personal Details':
        return (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-orange-600">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 border border-orange-300 px-3 py-2 rounded-md"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-orange-600">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border border-orange-300 px-3 py-2 rounded-md"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-orange-600">
                Phone Number
              </label>
              <input
                className="w-full mt-1 border border-orange-300 px-3 py-2 rounded-md"
                placeholder="e.g., 9876543210"
              />
            </div>
            <button
              onClick={savePersonal}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
              Save Changes
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-1/4 bg-white border-r border-orange-100 p-4">
        <h3 className="text-xl font-bold text-orange-600 mb-6">Student Profile</h3>
        <ul className="space-y-4">
          {profileSections.map((section) => (
            <li
              key={section}
              onClick={() => setActiveSection(section)}
              className={`cursor-pointer px-4 py-2 rounded-md transition ${
                activeSection === section
                  ? 'bg-orange-100 text-orange-600 font-semibold'
                  : 'hover:bg-orange-50'
              }`}
            >
              {section}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">{renderSection()}</main>
    </div>
  );
};

export default StudentProfile;
