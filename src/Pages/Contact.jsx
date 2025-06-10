import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left: Contact Info + Form */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-orange-600">Contact Us</h1>
          <p className="text-gray-700">
            Have questions or need help? Reach out to us and we’ll get back to you shortly!
          </p>

          {/* Contact Details */}
          <div className="space-y-2 text-gray-700">
            <p><strong>Email:</strong> support@studybuddy.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> New Delhi, India</p>
          </div>

          {/* Contact Form */}
          <form className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Message</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
                rows="4"
                placeholder="Write your message here..."
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Google Map */}
        <div className="rounded-xl overflow-hidden shadow-md border-2 border-orange-200">
          <iframe
            title="StudyBuddy Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.17493528952!2d77.068899983898!3d28.527280343093303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e6b5d7b50f%3A0x4bfb6c3e39f07dc5!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1718037801052!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
