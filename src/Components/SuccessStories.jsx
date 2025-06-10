import React from 'react';

const testimonials = [
  {
    name: 'Ananya Sharma',
    role: 'B.Tech Student',
    feedback: 'StudyBuddy helped me crack my semester exams with ease. The notes and courses are so well-organized!',
    image: 'https://i.pravatar.cc/150?img=47',
  },
  {
    name: 'Rahul Mehta',
    role: 'Computer Science Aspirant',
    feedback: 'Thanks to StudyBuddy, I finally understood DSA and built confidence for interviews!',
    image: 'https://i.pravatar.cc/150?img=32',
  },
  {
    name: 'Sneha Verma',
    role: 'GATE Aspirant',
    feedback: 'Interactive learning and smart tools made my preparation smooth and effective.',
    image: 'https://i.pravatar.cc/150?img=52',
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
          💬 Success <span className="text-orange-500">Stories</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Hear from students who’ve transformed their learning with StudyBuddy!
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((story, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-xl p-6 text-left hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
                />
                <div>
                  <h4 className="font-semibold text-black">{story.name}</h4>
                  <p className="text-sm text-gray-500">{story.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">“{story.feedback}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
