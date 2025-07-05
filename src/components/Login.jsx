import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";
import LogoDark from "../assets/logo_dark.png";
import ArrowPng from "../assets/arrow.png";
import { useDarkMode } from "../components/DarkModeContext";

const Login = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showSplash) {
        setShowSplash(false);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [showSplash]);

  const splashVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, staggerChildren: 0.2 },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, type: "spring", stiffness: 100, damping: 15, staggerChildren: 0.1 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "4px 4px 0px 0px black" },
    tap: { scale: 0.95 },
  };

  const handleGuestLogin = () => {
    const expiry = Date.now() + 2 * 60 * 1000;
    localStorage.setItem("guest", "true");
    localStorage.setItem("guestExpiry", expiry.toString());
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent font-comic p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/src/assets/paper-texture.png')] bg-repeat opacity-20 z-0" />
      <div
        className={`absolute inset-0 z-0 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900 opacity-95"
            : "bg-gradient-to-br from-gray-100 to-white opacity-95"
        }`}
      />

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className={`absolute -top-10 md:-top-12 right-6 md:-right-16 text-sm font-medium flex items-center gap-1 z-20 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <span className="italic">Psst... new here?</span>
          <motion.svg
            viewBox="0 0 100 50"
            className={`w-16 h-10 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 1.2 }}
          >
            <path d="M5,5 Q20,45 60,30 Q90,20 95,45" />
          </motion.svg>
        </motion.div>
      )}

      <motion.div
        className={`w-full max-w-xl min-h-[600px] border-[3.5px] p-8 rounded-3xl shadow-[8px_8px_0_0_black] text-center flex flex-col items-center gap-6 z-10 relative ${
          isDarkMode ? "border-white bg-gray-700" : "border-black bg-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {showSplash ? (
            <motion.div
              key="splash"
              className="absolute inset-0 flex flex-col items-center justify-center gap-10 p-8 rounded-3xl"
              variants={splashVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.img
                src={isDarkMode ? LogoDark : Logo}
                alt="CheckSy Logo"
                className="w-32 h-32 object-contain transform rotate-[-5deg]"
                variants={itemVariants}
              />
              <motion.button
                onClick={() => setShowSplash(false)}
                className={`w-3/4 border-[3px] py-4 rounded-xl text-xl font-bold shadow-[4px_4px_0_0_black] transition-all duration-200 ${
                  isDarkMode
                    ? "border-white bg-yellow-300 text-black hover:bg-yellow-400 active:bg-yellow-500"
                    : "border-black bg-green-300 text-black hover:bg-green-400 active:bg-green-500"
                }`}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Ready To Doodle Tasks? 🎉
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              className="absolute inset-0 flex flex-col items-center gap-4 px-8 pt-4 pb-8 rounded-3xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.img
                src={isDarkMode ? LogoDark : Logo}
                alt="CheckSy Logo"
                className="w-28 h-28 object-contain mb-2 transform rotate-[-5deg]"
                variants={itemVariants}
              />
              <motion.h1
                className={`text-4xl font-bold tracking-wider ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
                variants={itemVariants}
              >
                Welcome to CheckSy
              </motion.h1>
              <motion.p
                className={`text-md -mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                variants={itemVariants}
              >
                Your sketched task tracker ✏️
              </motion.p>

              <motion.form
                className="w-full flex flex-col gap-4 mt-2 px-2"
                variants={itemVariants}
                onSubmit={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("guest");
                  localStorage.removeItem("guestExpiry");
                  navigate("/dashboard");
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className={`w-full border-[2.5px] py-3 px-4 rounded-xl shadow-[2px_2px_0_0_black] outline-none focus:ring-2 ${
                    isDarkMode
                      ? "border-white bg-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
                      : "border-black bg-gray-50 text-gray-700 placeholder-gray-500 focus:ring-blue-300"
                  }`}
                />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className={`w-full border-[2.5px] py-3 px-4 rounded-xl shadow-[2px_2px_0_0_black] outline-none focus:ring-2 ${
                    isDarkMode
                      ? "border-white bg-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
                      : "border-black bg-gray-50 text-gray-700 placeholder-gray-500 focus:ring-blue-300"
                  }`}
                />
                <motion.button
                  type="submit"
                  className={`w-full mt-4 border-[3px] py-3 rounded-xl text-lg font-semibold shadow-[4px_4px_0_0_black] transition-all duration-200 ${
                    isDarkMode
                      ? "border-white bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                      : "border-black bg-yellow-300 text-black hover:bg-yellow-400 active:bg-yellow-500"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Log In
                </motion.button>
              </motion.form>

              <motion.div
                className="w-full flex justify-between gap-4 mt-2 px-2 relative"
                variants={itemVariants}
              >
                <div
                  className="absolute left-0 -top-8 flex flex-col items-center bg-transparent rotate-12"
                  style={{ left: "-110px" }}
                >
                  <span
                    className={`text-sm font-medium whitespace-nowrap ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    New here?
                  </span>
                  <img src={ArrowPng} alt="Arrow" className="w-8 h-auto" style={{ transform: "rotate(20deg)" }} />
                </div>

                <motion.button
                  onClick={() => navigate("/signup")}
                  className={`w-1/2 border-[2.5px] py-3 rounded-xl text-lg shadow-[3px_3px_0_0_black] transition-all duration-200 ${
                    isDarkMode
                      ? "border-white bg-gray-600 text-white hover:bg-gray-500 active:bg-gray-400"
                      : "border-black bg-gray-200 text-black hover:bg-gray-300 active:bg-gray-400"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Sign Up
                </motion.button>

                <div
                  className="absolute right-0 -top-8 flex flex-col items-center bg-transparent -rotate-12"
                  style={{ right: "-130px" }}
                >
                  <span
                    className={`text-sm font-medium whitespace-nowrap ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Try it yourself
                  </span>
                  <img
                    src={ArrowPng}
                    alt="Arrow"
                    className="w-8 h-auto transform scale-x-[-1]"
                    style={{ transform: "scaleX(-1) rotate(20deg)" }}
                  />
                </div>

                <motion.button
                  onClick={handleGuestLogin}
                  className={`w-1/2 border-[2.5px] py-3 rounded-xl text-lg shadow-[3px_3px_0_0_black] transition-all duration-200 ${
                    isDarkMode
                      ? "border-white bg-gray-600 text-white hover:bg-gray-500 active:bg-gray-400"
                      : "border-black bg-gray-200 text-black hover:bg-gray-300 active:bg-gray-400"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Guest Login
                </motion.button>
              </motion.div>

              <motion.div className="mt-2 text-sm w-full px-2 text-center" variants={itemVariants}>
                <a
                  href="#"
                  className={`${
                    isDarkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                  } hover:underline transition-colors duration-200`}
                >
                  Forgot Password?
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;