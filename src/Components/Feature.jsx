import React from 'react';
import { Lightbulb, BookOpen, Users, Laptop } from 'lucide-react';

const features = [
  {
    icon: <Lightbulb className="w-8 h-8 text-orange-500" />,
    title: 'Smart Study Tools',
    description: 'Access intelligent tools that simplify your learning journey with ease and efficiency.',
  },
  {
    icon: <BookOpen className="w-8 h-8 text-orange-500" />,
    title: 'Organized Notes',
    description: 'Save time with structured notes categorized by topics, subjects, and classes.',
  },
  {
    icon: <Laptop className="w-8 h-8 text-orange-500" />,
    title: 'Interactive Courses',
    description: 'Learn through interactive videos, quizzes, and real-time practice sessions.',
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: 'Peer Community',
    description: 'Connect, collaborate, and grow with a vibrant student community like you.',
  },
];

const Features = () => {
  return (
    <section className="bg-orange-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
          Why Choose <span className="text-orange-500">StudyBuddy?</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-lg mb-12">
          Unlock your full potential with features that make learning fun, fast, and effective.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
