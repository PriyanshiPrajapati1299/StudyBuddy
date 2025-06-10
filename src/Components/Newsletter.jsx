import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Stay Updated with <span className="text-orange-500">StudyBuddy</span>
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Subscribe to our newsletter and get the latest courses, study tips, and resources delivered straight to your inbox!
        </p>
        
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Subscribe
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-4">
          We respect your privacy. No spam ever.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
