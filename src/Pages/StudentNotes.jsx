import React from 'react';

const notesData = [
  {
    subject: 'HTML Basics',
    mentor: 'Swati Rajsingh',
    file: '/home', 
    description: 'Learn the foundation of webpage structure and semantic tags.',
  },
  {
    subject: 'CSS Layouts',
    mentor: 'Aayushi Sharma',
    file: '/home',
    description: 'Master Flexbox, Grid, and responsive design techniques.',
  },
  {
    subject: 'JavaScript Essentials',
    mentor: 'Rahul Mehta',
    file: '/home',
    description: 'Understand variables, loops, functions, and DOM manipulation.',
  },
  {
    subject: 'Graphic Designing',
    mentor: 'Priyanka Singh',
    file: '/home',
    description: 'Intro to design principles, Photoshop, and color theory.',
  },
  {
    subject: 'DSA Basics',
    mentor: 'Dr. Shivesh Raichand',
    file: '/home',
    description: 'Learn about arrays, linked lists, recursion and sorting.',
  },
];

const StudentNotes = () => {
  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-10">
          📚 Student Notes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {notesData.map((note, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-2xl font-bold text-orange-600 mb-2">{note.subject}</h2>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-medium text-gray-700">Mentor:</span> {note.mentor}
                </p>
                <p className="text-gray-700 mb-4">{note.description}</p>
              </div>

              <a
                href={note.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto bg-orange-500 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Download Notes
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentNotes;
