// src/App.jsx
import { useState, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "./components/DarkModeContext";
import Loader from "./components/Loader";
import Login from "./components/Login";
import TaskDashboard from "./components/TaskDashboard";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import { motion } from "framer-motion"; 

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === "/dashboard" || location.pathname === "/guest-dashboard";

  const hasShownLoader = useRef(false);
  const shouldShowLoader = location.pathname === "/" && !hasShownLoader.current;
  const [showLoader, setShowLoader] = useState(shouldShowLoader);

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleFinishLoading = () => {
    hasShownLoader.current = true;
    setShowLoader(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic Background - bg.png for light mode, bg_dark.png for dark mode */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat z-0`}
        style={{ backgroundImage: isDarkMode ? "url('/bg_dark.png')" : "url('/bg.webp')" }}
      />
      {/* Dashboard overlay (adjusting for dark mode) */}
      {!showLoader && isDashboard && (
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} opacity-90 z-10 pointer-events-none`} />
      )}

      {/* Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* ✅ Dark Mode Toggle Button - Updated Styling */}
        <motion.button
          onClick={toggleDarkMode}
          className={`fixed top-4 left-4 z-50 p-2 border-[2px] rounded-full text-lg transition-all duration-300 
            ${isDarkMode
              ? 'bg-yellow-300 text-black border-black shadow-[2px_2px_0_0_black]'
              : 'bg-gray-800 text-yellow-300 border-yellow-300 shadow-[2px_2px_0_0_black]'
            }`}
          whileHover={{ scale: 1.1, rotate: 15 }} 
          whileTap={{ scale: 0.9, rotate: -15 }} 
        >
          {isDarkMode ? '🌞' : '🌙'} {/* Sun for light mode, Moon for dark mode */}
        </motion.button>

        {showLoader ? (
          <Loader onFinish={handleFinishLoading} />
        ) : (
          <>
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<TaskDashboard />} />
                <Route path="/guest-dashboard" element={<TaskDashboard />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </main>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default App;