import React from 'react';

const courses = [
  {
    title: "HTML & CSS Essentials",
    description: "Start your frontend journey by mastering the building blocks of web design.",
    image: "https://picsum.photos/seed/htmlcss/300/200",
  },
  {
    title: "JavaScript for Beginners",
    description: "Learn the language of the web with real-life examples and interactive tasks.",
    image: "https://picsum.photos/seed/js/300/200",
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Explore user interface and experience design with hands-on tools and tips.",
    image: "https://picsum.photos/seed/uiux/300/200",
  },
  {
    title: "Data Structures Simplified",
    description: "Understand core programming logic with beginner-friendly data structure concepts.",
    image: "https://picsum.photos/seed/dsa/300/200",
  },
];


const PopularCourses = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Popular Courses</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Enhance your learning with our most loved courses, tailored for modern students.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-orange-100"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-orange-500">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
                <button className="mt-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
