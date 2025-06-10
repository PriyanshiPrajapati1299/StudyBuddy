import React, { useState } from 'react';

const teachers = [
  { id: 't1', name: 'Swati Rajsingh (HTML/CSS)', avatar: '🧑‍🏫' },
  { id: 't2', name: 'Dr. Shivesh Raichand (DSA)', avatar: '👨‍🏫' },
  { id: 't3', name: 'Ritika Sharma (UI/UX)', avatar: '👩‍🎨' },
  { id: 't4', name: 'Rahul Jain (JavaScript)', avatar: '💻' },
];

const initialMessages = {
  t1: [{ sender: 'teacher', text: 'Hi, how can I help you with HTML or CSS?' }],
  t2: [{ sender: 'teacher', text: 'Ask your DSA queries freely!' }],
  t3: [{ sender: 'teacher', text: 'Let’s talk design! What’s your doubt?' }],
  t4: [{ sender: 'teacher', text: 'Need help with JS? Ask me anything.' }],
};

const StudentMessages = () => {
  const [selectedTeacher, setSelectedTeacher] = useState('t1');
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const updated = {
      ...messages,
      [selectedTeacher]: [
        ...messages[selectedTeacher],
        { sender: 'student', text: newMessage },
      ],
    };
    setMessages(updated);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-1/4 bg-white border-r border-orange-100 p-4">
        <h3 className="text-xl font-bold text-orange-600 mb-4">Teachers</h3>
        <ul className="space-y-3">
          {teachers.map((t) => (
            <li
              key={t.id}
              onClick={() => setSelectedTeacher(t.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                selectedTeacher === t.id
                  ? 'bg-orange-100 text-orange-600 font-semibold'
                  : 'hover:bg-orange-50'
              }`}
            >
              <span className="text-2xl">{t.avatar}</span>
              <span>{t.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Box */}
      <main className="flex-1 flex flex-col p-6">
        <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-y-auto mb-4">
          <h2 className="text-lg font-bold text-orange-600 mb-3">
            Chat with {teachers.find((t) => t.id === selectedTeacher)?.name}
          </h2>

          <div className="space-y-3">
            {messages[selectedTeacher]?.map((msg, index) => (
              <div
                key={index}
                className={`max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === 'student'
                    ? 'bg-orange-200 self-end ml-auto text-right'
                    : 'bg-orange-100 text-left'
                }`}
              >
                <p className="text-gray-800 text-sm">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="flex gap-3">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Type your doubt here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default StudentMessages;
