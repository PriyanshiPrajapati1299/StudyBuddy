import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
  { name: 'HTML', desc: 'Basics of web structure and tags.', icon: 'https://cdn-icons-png.flaticon.com/512/732/732212.png' },
  { name: 'CSS', desc: 'Styling with colors, fonts, and layout.', icon: 'https://cdn-icons-png.flaticon.com/512/732/732190.png' },
  { name: 'JavaScript', desc: 'Dynamic behavior and interactivity.', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
  { name: 'Graphic Designing', desc: 'Learn tools like Photoshop, Illustrator.', icon: 'https://cdn-icons-png.flaticon.com/512/2503/2503508.png' },
  { name: 'Data Structures & Algorithms', desc: 'Master coding logic and problem solving.', icon: 'https://cdn-icons-png.flaticon.com/512/10681/10681276.png' },
  { name: 'UI/UX Designing', desc: 'Design stunning and user-friendly interfaces.', icon: 'https://cdn-icons-png.flaticon.com/512/1157/1157109.png' },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-4">Explore Our Courses</h2>
        <p className="text-center text-gray-600 mb-10">Boost your skills with these curated learning paths.</p>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-orange-200 transition duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img src={course.icon} alt={course.name} className="w-12 h-12" />
                <h3 className="text-xl font-semibold text-orange-600">{course.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{course.desc}</p>
              <div className="mt-4">
                <Link
                  to={`/courses/${course.name.toLowerCase().replace(/[^a-z]/g, '')}`}
                  className="inline-block mt-2 text-sm text-orange-500 font-medium hover:underline"
                >
                  Start Learning →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
