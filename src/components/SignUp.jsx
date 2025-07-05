import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../components/DarkModeContext'; // <--- CORRECTED: Import from components

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    console.log('Sign Up Data:', { username, email, password });
    alert('Sign Up successful! (This is a demo, no actual registration occurred)');
    navigate('/');
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent font-comic p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/src/assets/paper-texture.png')] bg-repeat opacity-20 z-0" />
      <div
        className={`absolute inset-0 z-0 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900 opacity-90"
            : "bg-gradient-to-br from-gray-100 to-white opacity-90"
        }`}
      />

      <motion.div
        className={`w-full max-w-md border-[3.5px] p-8 rounded-3xl shadow-[8px_8px_0_0_black] text-center flex flex-col items-center gap-6 z-10 relative ${
          isDarkMode ? "border-white bg-gray-700" : "border-black bg-white"
        }`}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Sign Up
        </motion.h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <motion.input
            variants={itemVariants}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full border-[2px] px-4 py-2 rounded-lg outline-none shadow-[2px_2px_0_0_black] focus:ring-2 ${
              isDarkMode
                ? "border-white bg-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
                : "border-black bg-gray-50 text-gray-700 placeholder-gray-500 focus:ring-yellow-300"
            }`}
            required
          />
          <motion.input
            variants={itemVariants}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border-[2px] px-4 py-2 rounded-lg outline-none shadow-[2px_2px_0_0_black] focus:ring-2 ${
              isDarkMode
                ? "border-white bg-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
                : "border-black bg-gray-50 text-gray-700 placeholder-gray-500 focus:ring-yellow-300"
            }`}
            required
          />
          <motion.input
            variants={itemVariants}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full border-[2px] px-4 py-2 rounded-lg outline-none shadow-[2px_2px_0_0_black] focus:ring-2 ${
              isDarkMode
                ? "border-white bg-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
                : "border-black bg-gray-50 text-gray-700 placeholder-gray-500 focus:ring-yellow-300"
            }`}
            required
          />
          <motion.input
            variants={itemVariants}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full border-[2px] px-4 py-2 rounded-lg outline-none shadow-[2px_2px_0_0_black] focus:ring-2 ${
              isDarkMode
                ? "border-white bg-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
                : "border-black bg-gray-50 text-gray-700 placeholder-gray-500 focus:ring-yellow-300"
            }`}
            required
          />

          <motion.button
            variants={itemVariants}
            type="submit"
            className={`w-full mt-4 border-[3px] py-3 rounded-xl font-bold text-lg shadow-[4px_4px_0_0_black] transition-all duration-200 ${
              isDarkMode
                ? "border-white bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                : "border-black bg-yellow-300 text-black hover:bg-yellow-400 active:bg-yellow-500"
            }`}
          >
            Create Account ✨
          </motion.button>
        </form>

        <motion.p variants={itemVariants} className={`text-sm mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Already have an account?{' '}
          <Link to="/" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-semibold underline`}>
            Login here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;