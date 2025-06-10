import React from 'react';
import Study from '../Images/Study.png'

const Hero = () => {
  return (
    <section className="bg-white min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Meet Your
                <span className="block text-orange-500 mt-2">StudyBuddy</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Transform your learning journey with smart study tools, organized notes, and interactive courses designed for modern students.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Start Learning
              </button>
              <button className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                View Courses
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">500+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">10K+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Clipart Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={Study} 
              alt="Study Clipart"
              className="w-full max-w-md lg:max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
