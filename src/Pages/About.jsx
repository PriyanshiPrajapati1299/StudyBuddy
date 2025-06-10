import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-orange-50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600">About StudyBuddy</h1>
          <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
            Empowering learners with high-quality content, real-world skills, and certification for a brighter future.
          </p>
        </div>

        {/* About Description */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At <strong>StudyBuddy</strong>, we believe in learning that is accessible, engaging, and practical.
            We’re building a platform that helps students and professionals explore and master skills in web development,
            design, and computer science – through well-structured courses, interactive modules, and real-time mentorship.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Expert Instructors',
              desc: 'Learn from industry experts with real-world experience and a passion for teaching.',
              icon: '🎓',
            },
            {
              title: 'Hands-on Projects',
              desc: 'Each course is loaded with hands-on tasks to help you apply what you learn.',
              icon: '🛠️',
            },
            {
              title: 'Verified Certificates',
              desc: 'Earn digital certificates to validate your skillset and boost your portfolio.',
              icon: '📜',
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-orange-600">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-orange-100 border-l-4 border-orange-500 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-orange-600">Ready to start learning?</h2>
          <p className="text-gray-700 mt-2">Browse our wide range of courses and take the first step towards upskilling.</p>
          <Link
            to="/courses"
            className="inline-block mt-4 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
          >
            Explore Courses →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
