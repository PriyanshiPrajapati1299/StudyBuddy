// src/Pages/MentorDashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Users, BookOpen, Calendar, Star } from 'lucide-react';

const MentorDashboard = () => {
  

  

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
     
      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <h2 className="text-xl font-semibold text-orange-600 mb-6">Welcome back, <span className='text-black'>Mentor!</span></h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: My Learners */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <Users size={30} className="text-orange-500 mb-4" />
            <h3 className="text-lg font-bold mb-1">My Learners</h3>
            <p className="text-gray-600 text-sm mb-4">
              View and manage all learners assigned to you.
            </p>
            <Link to="/students" className="text-orange-500 font-medium hover:underline">View Learners →</Link>
          </div>

          {/* Card 2: Scheduled Sessions */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <Calendar size={30} className="text-orange-500 mb-4" />
            <h3 className="text-lg font-bold mb-1">Scheduled Sessions</h3>
            <p className="text-gray-600 text-sm mb-4">
              See your upcoming mentoring sessions and set availability.
            </p>
            <Link to="/mentor-profile" className="text-orange-500 font-medium hover:underline">Manage Sessions →</Link>
          </div>

          {/* Card 3: Resources */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <BookOpen size={30} className="text-orange-500 mb-4" />
            <h3 className="text-lg font-bold mb-1">Shared Resources</h3>
            <p className="text-gray-600 text-sm mb-4">
              Upload or share helpful content with your learners.
            </p>
            <Link to="/mentor-profile" className="text-orange-500 font-medium hover:underline">Upload Resource →</Link>
          </div>

          {/* Card 4: Feedback & Ratings */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <Star size={30} className="text-orange-500 mb-4" />
            <h3 className="text-lg font-bold mb-1">Feedback & Ratings</h3>
            <p className="text-gray-600 text-sm mb-4">
              Check feedback from learners and improve your sessions.
            </p>
            <Link to="/feedback" className="text-orange-500 font-medium hover:underline">View Feedback →</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
