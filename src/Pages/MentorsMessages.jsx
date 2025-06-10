// src/Pages/MentorMessages.jsx
import React, { useState } from 'react';

const enrolledStudents = [
  { id: 1, name: 'Aarav Gupta', course: 'HTML & CSS' },
  { id: 2, name: 'Isha Verma', course: 'JavaScript Basics' },
  { id: 3, name: 'Yash Sharma', course: 'React.js Fundamentals' },
];

const sampleMessages = {
  1: [
    { sender: 'student', text: 'Ma’am, what is the difference between id and class?' },
    { sender: 'mentor', text: 'Great question! ID is unique, class can be reused.' },
  ],
  2: [
    { sender: 'student', text: 'How to use let vs var?' },
    { sender: 'mentor', text: 'Use let for block scope; var is function-scoped.' },
  ],
  3: [
    { sender: 'student', text: 'Can you explain useState again?' },
    { sender: 'mentor', text: 'Sure! useState allows functional components to store state.' },
  ],
};

const MentorMessages = () => {
  const [activeStudent, setActiveStudent] = useState(enrolledStudents[0]);
  const [messages, setMessages] = useState(sampleMessages[activeStudent.id]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const updated = [...messages, { sender: 'mentor', text: newMessage }];
    setMessages(updated);
    sampleMessages[activeStudent.id] = updated; 
    setNewMessage('');
  };

  const handleStudentClick = (student) => {
    setActiveStudent(student);
    setMessages(sampleMessages[student.id] || []);
  };

  return (
    <div className="min-h-screen flex bg-orange-50">
      {/* Sidebar - Student List */}
      <aside className="w-1/4 bg-white p-4 border-r border-orange-200">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Enrolled Students</h2>
        <ul className="space-y-3">
          {enrolledStudents.map((student) => (
            <li
              key={student.id}
              onClick={() => handleStudentClick(student)}
              className={`p-3 rounded-md cursor-pointer transition ${
                activeStudent.id === student.id
                  ? 'bg-orange-100 text-orange-600 font-semibold'
                  : 'hover:bg-orange-50'
              }`}
            >
              <p>{student.name}</p>
              <p className="text-xs text-gray-500">{student.course}</p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Window */}
      <main className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            Chat with {activeStudent.name}
          </h3>

          {/* Chat messages */}
          <div className="bg-white rounded-xl shadow p-4 h-[60vh] overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.sender === 'mentor'
                    ? 'bg-orange-500 text-white self-end ml-auto'
                    : 'bg-orange-100 text-gray-800 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>

        {/* Message input */}
        <div className="mt-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="Type your reply..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-orange-300 focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleSend}
            className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default MentorMessages;
