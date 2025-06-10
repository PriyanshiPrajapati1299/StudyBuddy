import React from 'react';

const mentors = [
  {
    name: "Anjali Sharma",
    subject: "DSA Expert",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Rahul Mehta",
    subject: "UI/UX Mentor",
    image: "https://i.pravatar.cc/150?img=33",
  },
  {
    name: "Sneha Verma",
    subject: "Graphic Designing Mentor",
    image: "https://i.pravatar.cc/150?img=56",
  },
  {
    name: "Aman Kapoor",
    subject: "GATE Preparation Expert",
    image: "https://i.pravatar.cc/150?img=12",
  },
];

const MeetOurMentors = () => {
  return (
    <section className="bg-orange-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center space-y-10">
        <h2 className="text-4xl font-bold text-black">
          Meet Our <span className="text-orange-500">Mentors</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Learn from top educators who are passionate about helping you succeed.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pt-6">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-orange-400"
              />
              <h3 className="text-xl font-semibold text-black mt-4">{mentor.name}</h3>
              <p className="text-sm text-gray-500">{mentor.subject}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurMentors;
