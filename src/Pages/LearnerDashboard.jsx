// src/Pages/LearnerDashboard.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LearnerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Welcome, Learner! 🎓</h1>
        <p className="text-gray-600 mt-1">Explore your dashboard to continue your learning journey</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <h3 className="text-lg text-gray-500">Courses Enrolled</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">3</p>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <h3 className="text-lg text-gray-500">Lessons Completed</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">12</p>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <h3 className="text-lg text-gray-500">Progress</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">45%</p>
        </div>
      </div>

      {/* Recommended Courses Section */}
      <div>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Card */}
          <div className="bg-white rounded-xl p-4 shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">JavaScript Basics</h3>
              <p className="text-sm text-gray-500 mt-1">Beginner-friendly course to start your web dev journey.</p>
            </div>
            <button
              onClick={() => navigate('/course/javascript')}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Start
            </button>
          </div>

          {/* Course Card */}
          <div className="bg-white rounded-xl p-4 shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">HTML & CSS Mastery</h3>
              <p className="text-sm text-gray-500 mt-1">Build beautiful websites with HTML and CSS.</p>
            </div>
            <button
              onClick={() => navigate('/course/html-css')}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Start
            </button>
          </div>

          <Link to="/give-feedback"
              className="mt-4 bg-orange-500 w-[200px] absolute right-1 bottom-20 text-white px-6 py-2 rounded-xl text-center hover:bg-orange-600">
              Give Feedback
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
