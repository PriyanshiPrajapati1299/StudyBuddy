// src/Pages/Feedback.jsx
import React from 'react';
import {
  Star,
  User,
} from 'lucide-react';

/* ───────── dummy data ───────── */
const feedbacks = [
  {
    id: 1,
    student: 'Aarav Shah',
    avatar: 'https://i.pravatar.cc/40?img=1',
    rating: 5,
    comment:
      'The sessions were extremely insightful! The mentor explained every concept patiently and gave real-world examples.',
    date: 'Apr 24 2025',
  },
  {
    id: 2,
    student: 'Diya Patel',
    avatar: 'https://i.pravatar.cc/40?img=2',
    rating: 4,
    comment:
      'Great teaching style. A bit more practice problems would be awesome, but overall very helpful.',
    date: 'May 03 2025',
  },
  {
    id: 3,
    student: 'Rohan Verma',
    avatar: 'https://i.pravatar.cc/40?img=3',
    rating: 5,
    comment:
      'Loved the interactive approach and quick doubt-resolution. Highly recommended!',
    date: 'May 17 2025',
  },
  {
    id: 4,
    student: 'Sneha Gupta',
    avatar: 'https://i.pravatar.cc/40?img=4',
    rating: 3,
    comment:
      'Content was good but pacing felt a bit fast for beginners like me.',
    date: 'Jun 09 2025',
  },
];

/* ───────── rating helper ───────── */
const Stars = ({ count }) => (
  <div className="flex gap-0.5 text-orange-500">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < count ? '#f97316' : 'none'}
        strokeWidth={1.75}
      />
    ))}
  </div>
);

/* ───────── page component ───────── */
const Feedback = () => (
  <div className="min-h-screen bg-orange-50/60 py-10 px-4">
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 text-white p-8">
        <h1 className="text-3xl font-extrabold tracking-wide">
          Student Feedback & Ratings
        </h1>
        <p className="text-orange-50/90 mt-1">
          What your learners say about your sessions
        </p>
      </div>

      {/* list */}
      <div className="divide-y divide-orange-100">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center p-6 hover:bg-orange-50/40 transition"
          >
            {/* avatar */}
            {fb.avatar ? (
              <img
                src={fb.avatar}
                alt={fb.student}
                className="w-12 h-12 rounded-full object-cover shadow"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shadow">
                <User size={20} className="text-orange-500" />
              </div>
            )}

            {/* content */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="font-semibold text-gray-800">
                  {fb.student}
                </span>
                <div className="flex items-center gap-2">
                  <Stars count={fb.rating} />
                  <span className="text-sm text-gray-500">{fb.date}</span>
                </div>
              </div>
              <p className="text-gray-700 mt-2 leading-relaxed">
                {fb.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Feedback;
