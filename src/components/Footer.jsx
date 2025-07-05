import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useDarkMode } from '../components/DarkModeContext';

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  const footerVariants = {
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
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className={`relative z-10 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} text-center py-10`}
    >
      <div className="max-w-6xl mx-auto px-4 font-comic">
        <motion.div
          className="flex justify-center gap-6 mb-6"
        >
          <motion.a
            href="https://instagram.com/satwik_agnihotri"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-transform duration-300 hover:scale-110 ${isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-500 hover:text-yellow-600'}`}
            variants={itemVariants}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaInstagram size={24} className={isDarkMode ? "drop-shadow-[1px_1px_0px_white]" : "drop-shadow-[1px_1px_0px_black]"} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/satwik-agnihotri"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-transform duration-300 hover:scale-110 ${isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-500 hover:text-yellow-600'}`}
            variants={itemVariants}
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin size={24} className={isDarkMode ? "drop-shadow-[1px_1px_0px_white]" : "drop-shadow-[1px_1px_0px_black]"} />
          </motion.a>
          <motion.a
            href="https://github.com/Satwik-Agnihotri"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-transform duration-300 hover:scale-110 ${isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-500 hover:text-yellow-600'}`}
            variants={itemVariants}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub size={24} className={isDarkMode ? "drop-shadow-[1px_1px_0px_white]" : "drop-shadow-[1px_1px_0px_black]"} />
          </motion.a>
        </motion.div>

        <motion.p
          className={`${isDarkMode ? 'text-white' : 'text-black'} text-sm md:text-base font-light pt-6`}
          variants={itemVariants}
        >
          © {new Date().getFullYear()} Made with ❤️ by Satwik Agnihotri. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;