import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { auth } from './Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LearnerDashboard from './Pages/LearnerDashboard';
import MentorDashboard from './Pages/MentorDashboard';
import Courses from './Pages/Courses';
import CourseDetails from './Pages/CourseDetails';
import About from './Pages/About';
import Contact from './Pages/Contact';
import StudentNotes from './Pages/StudentNotes';
import StudentMessages from './Pages/StudentMessages';
import StudentProfile from './Pages/StudentProfile';
import MentorMessages from './Pages/MentorsMessages';
import Materials from './Pages/Materials';
import MentorProfile from './Pages/MentorProfile';
import Feedback from './Pages/Feedback';
import GiveFeedback from './Pages/GiveFeedback';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
      if (userCredential) {
        try {
          const userDoc = await getDoc(doc(db, "users", userCredential.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ 
              uid: userCredential.uid,
              email: userCredential.email, 
              role: userData.role || 'student',
              displayName: userData.displayName || userCredential.displayName || 'User'
            });
          } else {
            setUser({ 
              uid: userCredential.uid,
              email: userCredential.email, 
              role: 'student',
              displayName: userCredential.displayName || 'User'
            });
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUser({ 
            uid: userCredential.uid,
            email: userCredential.email, 
            role: 'student',
            displayName: userCredential.displayName || 'User'
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logged out successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Logout Error:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/learner-dashboard" element={<LearnerDashboard />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/studybuddy-notes" element={<StudentNotes />} />
        <Route path="/messages" element={<StudentMessages />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/students" element={<MentorMessages />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/mentor-profile" element={<MentorProfile />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/give-feedback" element={<GiveFeedback />} />


      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
