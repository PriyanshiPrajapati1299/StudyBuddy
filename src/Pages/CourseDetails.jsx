import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import Certificate from '../Images/certificate.jpg'

/* ───────────────
   Dummy Course Data
──────────────── */
const courseInfo = {
  html: {
    title: 'HTML',
    overview:
      'HTML (HyperText Markup Language) is the standard language for creating webpages and web applications.',
    points: [
      'HTML document structure',
      'Common tags and attributes',
      'Semantic HTML & accessibility',
      'Forms and inputs',
    ],
    mentor: 'Mehak Verma',
    experience: '5+ years in Web Development',
    progress: 60,
  },
  css: {
    title: 'CSS',
    overview:
      'CSS (Cascading Style Sheets) lets you control the appearance of webpages—from colors to layouts.',
    points: [
      'Selectors & specificity',
      'Flexbox and Grid',
      'Responsive design',
      'Animations & transitions',
    ],
    mentor: 'Abhishek Sharma',
    experience: '3+ years as Frontend Designer',
    progress: 40,
  },
  javascript: {
    title: 'JavaScript',
    overview:
      'JavaScript adds dynamic behavior, logic, and interactivity to your web-pages.',
    points: [
      'Variables & data types',
      'DOM manipulation',
      'ES6 features',
      'Asynchronous JS (Promises, async/await)',
    ],
    mentor: 'Shreejita Mehta',
    experience: '6+ years at Microsoft & Startups',
    progress: 20,
  },
  graphicdesigning: {
    title: 'Graphic Designing',
    overview:
      'Master visual storytelling with design principles and popular tools like Photoshop & Illustrator.',
    points: [
      'Color theory & typography',
      'Layouts & composition',
      'Adobe Photoshop basics',
      'Vector design with Illustrator',
    ],
    mentor: 'Amartya Sahani',
    experience: '4+ years in UI Art and Design',
    progress: 70,
  },
  datastructuresalgorithms: {
    title: 'Data Structures & Algorithms',
    overview:
      'Sharpen your problem-solving skills for technical interviews and competitive coding.',
    points: [
      'Arrays, Linked Lists, Trees',
      'Sorting & searching algorithms',
      'Time & space complexity',
      'Practice problems',
    ],
    mentor: 'Dr. Shivesh Raichand',
    experience: 'Professor, IIT Kanpur, 10+ years',
    progress: 10,
  },
  uiuxdesigning: {
    title: 'UI/UX Designing',
    overview:
      'Design intuitive and delightful digital experiences focusing on users and aesthetics.',
    points: [
      'Design thinking process',
      'Wireframing & prototyping',
      'User research & testing',
      'Figma / Adobe XD workflows',
    ],
    mentor: 'Swati Rajsingh',
    experience: 'UI/UX Expert & Startup Founder',
    progress: 55,
  },
};

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = courseInfo[slug];

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [quizPopup, setQuizPopup] = useState(false);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
        <h2 className="text-3xl font-bold text-orange-600">Course Not Found</h2>
        <button
          onClick={() => navigate('/courses')}
          className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-orange-600">{data.title}</h1>
          <Link
            to="/courses"
            className="text-sm text-orange-500 font-medium hover:underline"
          >
            ← Back to Courses
          </Link>
        </div>

        {/* Overview Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-3">Course Overview</h2>
          <p className="text-gray-700 mb-4">{data.overview}</p>

          {/* Mentor Info */}
          <div className="bg-orange-100 text-orange-800 rounded-md p-3 mb-4">
            <p><strong>Mentor:</strong> {data.mentor}</p>
            <p><strong>Experience:</strong> {data.experience}</p>
          </div>

          {/* Learn Points */}
          <h3 className="text-lg font-medium text-orange-600 mb-2">What you’ll learn</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {data.points.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <button
              onClick={() => setIsEnrolled(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Start Learning
            </button>
            <button
              onClick={() => setQuizPopup(true)}
              className="bg-white text-orange-500 border border-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-100 transition"
            >
              Start Quiz
            </button>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <p className="text-gray-600 mb-1">Progress: {data.progress}%</p>
            <div className="w-full bg-orange-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-orange-500 h-full transition-all duration-500"
                style={{ width: `${data.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sample Certificate */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Sample Certificate</h2>
          <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 flex flex-col items-center">
            <img
              src={Certificate}
              alt="Sample Certificate"
              className="w-full max-w-md object-contain bg-orange-100 p-3"
            />
            <p className="text-gray-500 text-sm mt-3">
              Complete all modules & quizzes to earn a personalized certificate!
            </p>
          </div>
        </div>
      </div>

      {/* Animated Enrollment Dialog */}
      {isEnrolled && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md  flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center shadow-xl animate-bounce">
            <h2 className="text-xl font-bold text-green-600 mb-2">🎉 You're successfully enrolled!</h2>
            <p className="text-gray-600">Start your journey now.</p>
            <button
              onClick={() => setIsEnrolled(false)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {quizPopup && (
        <Dialog open={quizPopup} onClose={() => setQuizPopup(false)} className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md  flex items-center justify-center px-4">
            <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
              <Dialog.Title className="text-xl font-semibold text-orange-600 mb-2">
                📝 Quiz Coming Soon!
              </Dialog.Title>
              <p className="text-gray-700">
                This course’s quiz will be activated soon. Stay tuned!
              </p>
              <div className="mt-4 text-right">
                <button
                  onClick={() => setQuizPopup(false)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                >
                  Okay
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CourseDetails;
