import React, { useState } from 'react';
import { Star, Send, User } from 'lucide-react';

const dummyMentors = [
  { id: 1, name: 'Anjali Sharma', email: 'anjali@studybuddy.com' },
  { id: 2, name: 'Ravi Mehta', email: 'ravi@studybuddy.com' },
  { id: 3, name: 'Priya Verma', email: 'priya@studybuddy.com' },
];

const GiveFeedback = () => {
  const [selectedMentor, setSelectedMentor] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMentor || !rating || !feedback.trim()) {
      alert('Please complete all fields!');
      return;
    }

    console.log('Feedback submitted:', {
      mentor: selectedMentor,
      rating,
      feedback,
    });

    setSubmitted(true);
    setSelectedMentor('');
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/80 rounded-xl shadow-md mt-10 border border-orange-100">
      <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
        Give Feedback to Your Mentor
      </h2>

      {submitted && (
        <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-center font-medium">
          🎉 Thank you for your feedback!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Mentor */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Select Mentor
          </label>
          <select
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">-- Select Mentor --</option>
            {dummyMentors.map((mentor) => (
              <option key={mentor.id} value={mentor.name}>
                {mentor.name} ({mentor.email})
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Rate Mentor
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                size={28}
                onClick={() => setRating(num)}
                className={`cursor-pointer ${
                  num <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Feedback Text */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Your Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="5"
            placeholder="Write your feedback here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2 transition"
        >
          <Send size={18} />
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default GiveFeedback;
