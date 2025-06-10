import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Menu, X, User, BookOpen, FileText, Home, Info, Phone,
  ChevronDown, ChevronUp, GraduationCap, Users, MessageSquare, LogOut,
} from 'lucide-react';

import { auth, db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMobile = () => setMobileOpen((p) => !p);
  const toggleDropdown = () => setDropdownOpen((p) => !p);
  const closeMobile = () => setMobileOpen(false);

  /* ----------  dynamic profile path  ---------- */
  const profilePath =
    user?.role?.toLowerCase() === 'mentor' ? '/mentor-profile' : '/student-profile';

  /* ----------  confirm / cancel logout  ------- */
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setDropdownOpen(false);
  };
  const confirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      await onLogout();
      closeMobile();
    } catch (err) {
      toast.error('Failed to log out. Please try again.');
    }
  };
  const cancelLogout = () => setShowLogoutModal(false);

  /* ----------  click-outside dropdown  -------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ----------  nav links by role  -------------- */
  const common = [
    { name: 'Home', icon: <Home size={18} />, path: '/' },
    { name: 'Courses', icon: <BookOpen size={18} />, path: '/courses' },
    { name: 'About', icon: <Info size={18} />, path: '/about' },
    { name: 'Contact', icon: <Phone size={18} />, path: '/contact' },
  ];
  const studentExtra = [
    { name: 'Notes', icon: <FileText size={18} />, path: '/studybuddy-notes' },
    { name: 'Messages', icon: <MessageSquare size={18} />, path: '/messages' },
  ];
  const mentorExtra = [
    { name: 'Students', icon: <Users size={18} />, path: '/students' },
    { name: 'Materials', icon: <GraduationCap size={18} />, path: '/materials' },
  ];
  const navLinks =
    user?.role?.toLowerCase() === 'mentor'
      ? [...common, ...mentorExtra]
      : [...common, ...studentExtra];

  // UI PART
  return (
    <nav className="backdrop-blur-md bg-white/80 shadow-lg sticky top-0 z-50 border-b border-orange-100">
      {/* --- Logout Modal --- */}
      {showLogoutModal && (
        <div className="fixed h-[400px] inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50 mt-72">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Navbar main --- */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-extrabold flex items-center cursor-pointer"
          onClick={() => navigate('/')}>
          <span className="text-3xl animate-bounce">🎓</span>
          Study<span className="text-orange-500">Buddy</span>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-6 text-gray-700 font-medium">
          {navLinks.map(({ name, icon, path }) => (
            <li key={name}>
              <a
                href={path}
                className="flex items-center gap-1 px-4 py-2 rounded-md hover:text-orange-600 hover:bg-yellow-50 transition">
                {icon}
                {name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop user dropdown */}
        <div className="hidden md:flex items-center relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 p-2 rounded-full bg-white/60 backdrop-blur border border-orange-200 shadow">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <User size={18} className="text-orange-500" />
                </div>
                <div className="flex flex-col items-start text-sm max-w-[150px] truncate">
                  <span
                    className={`text-xs font-medium ${
                      user.role?.toLowerCase() === 'mentor'
                        ? 'text-purple-600'
                        : 'text-blue-600'
                    }`}>
                    {user.role}
                  </span>
                  <span className="text-orange-600 font-semibold truncate">
                    {user.displayName || user.email}
                  </span>
                </div>
                {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  {/* ↓↓↓ dynamic profile link ↓↓↓ */}
                  <a
                    href={profilePath}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-orange-100">
                    <User size={16} />
                    Profile
                  </a>
                  <a
                    href={
                      user.role?.toLowerCase() === 'mentor'
                        ? '/mentor-dashboard'
                        : '/learner-dashboard'
                    }
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-orange-100">
                    <BookOpen size={16} />
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-orange-100">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <a
              href="/login"
              className="p-2 rounded-full bg-white/60 backdrop-blur border border-orange-200 shadow">
              <User size={22} className="text-orange-500" />
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-700" onClick={toggleMobile}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 bg-white/90 backdrop-blur rounded-b-xl shadow-md">
          <ul className="space-y-3 text-gray-700 font-medium">
            {navLinks.map(({ name, icon, path }) => (
              <li key={name}>
                <a
                  href={path}
                  onClick={closeMobile}
                  className="flex items-center gap-2 hover:text-orange-500">
                  {icon}
                  {name}
                </a>
              </li>
            ))}

            {/* Mobile user dropdown */}
            <li ref={dropdownRef}>
              {user ? (
                <>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 w-full hover:text-orange-500">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <User size={14} className="text-orange-500" />
                    </div>
                    <div className="flex flex-col text-left truncate">
                      <span
                        className={`text-xs font-medium ${
                          user.role?.toLowerCase() === 'mentor'
                            ? 'text-purple-600'
                            : 'text-blue-600'
                        }`}>
                        {user.role}
                      </span>
                      <span className="truncate">{user.displayName || user.email}</span>
                    </div>
                    {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {dropdownOpen && (
                    <div className="mt-2 bg-white rounded-md shadow-lg border border-gray-200">
                      
                      <a
                        href={profilePath}
                        onClick={() => {
                          setDropdownOpen(false);
                          closeMobile();
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-orange-100">
                        <User size={16} />
                        Profile
                      </a>
                      <a
                        href={
                          user.role?.toLowerCase() === 'mentor'
                            ? '/mentor-dashboard'
                            : '/learner-dashboard'
                        }
                        onClick={() => {
                          setDropdownOpen(false);
                          closeMobile();
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-orange-100">
                        <BookOpen size={16} />
                        Dashboard
                      </a>
                      <button
                        onClick={handleLogoutClick}
                        className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-orange-100">
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <a
                  href="/login"
                  onClick={closeMobile}
                  className="flex items-center gap-2 hover:text-orange-500">
                  <User size={18} />
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
