import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What is StudyBuddy?',
    answer:
      'StudyBuddy is your smart learning partner that offers interactive courses, organized notes, and tools to make your learning journey efficient and fun.',
  },
  {
    question: 'Is StudyBuddy free to use?',
    answer:
      'Yes, you can access many resources for free. We also offer premium content to enhance your learning experience.',
  },
  {
    question: 'How do I enroll in a course?',
    answer:
      'Just click on “Start Learning” or “View Courses,” select a course you like, and hit the Enroll button!',
  },
  {
    question: 'Can I track my learning progress?',
    answer:
      'Absolutely! StudyBuddy offers personalized dashboards where you can track your progress, goals, and achievements.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-orange-50 py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-orange-500 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md transition-all duration-300 border border-orange-100"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 font-medium text-lg text-left text-black focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="text-orange-500" />
                ) : (
                  <ChevronDown className="text-orange-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
