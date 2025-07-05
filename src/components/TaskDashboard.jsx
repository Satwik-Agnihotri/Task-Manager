import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilterIcon from "../assets/Filter.png";
import TaskFilterIconDark from "../assets/Filter_Dark.png";
import { saveTasks, loadTasks } from "../components/localStorage";
import { useDarkMode } from "../components/DarkModeContext";

const Dashboard = () => {
  const { isDarkMode } = useDarkMode();

  const [tasks, setTasks] = useState(() => loadTasks());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showGuestAlert, setShowGuestAlert] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  const navigate = useNavigate();
  const dashboardRef = useRef(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const isGuest = localStorage.getItem("guest") === "true";
    const expiry = localStorage.getItem("guestExpiry");

    if (isGuest && expiry) {
      const interval = setInterval(() => {
        const remaining = parseInt(expiry) - Date.now();

        if (remaining <= 0) {
          clearInterval(interval);
          setShowGuestAlert(true);
          setTimeout(() => {
            localStorage.clear();
            navigate("/");
          }, 3000);
        } else {
          setTimeLeft(Math.floor(remaining / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleAddTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // THIS IS THE CRITICAL FUNCTION FOR EDITING
  const handleEditTask = (id, updatedTaskData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedTaskData } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && !task.completed) ||
      (statusFilter === "Completed" && task.completed);
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;
    const matchesTag =
      tagFilter.trim() === "" ||
      (task.tags || []).some((tag) =>
        tag.toLowerCase().includes(tagFilter.toLowerCase())
      );
    return matchesSearch && matchesStatus && matchesPriority && matchesTag;
  });

  const allTasksCount = tasks.length;
  const activeTasksCount = tasks.filter(task => !task.completed).length;
  const completedTasksCount = tasks.filter(task => task.completed).length;


  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.div
      ref={dashboardRef}
      className={`min-h-screen pt-20 p-6 font-comic flex flex-col items-center justify-center relative ${isDarkMode ? 'text-white' : 'text-black'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {timeLeft !== null && (
        <motion.div
          drag
          dragConstraints={dashboardRef}
          dragElastic={0.2}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-30 border-[2.5px] ${isDarkMode ? 'border-white' : 'border-black'} px-4 py-2 rounded-xl ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-yellow-200 text-black'} font-bold text-sm font-comic shadow-[3px_3px_0_0_black] cursor-grab`}
        >
          ⏳ Guest Session Ends In: {" "}
          <span className="text-red-600">
            {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
          </span>
        </motion.div>
      )}

      {showGuestAlert && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 border-[2.5px] ${isDarkMode ? 'border-white' : 'border-black'} px-6 py-3 rounded-xl ${isDarkMode ? 'bg-red-700 text-white' : 'bg-pink-200 text-black'} font-bold text-base font-comic shadow-[4px_4px_0_0_black]`}
          >
            ⏰ Whoops! Guest session expired. Taking you home...
          </motion.div>
        </AnimatePresence>
      )}

      <motion.div
        className="w-full flex justify-end items-center gap-4 px-4 md:px-8 absolute top-4 right-0 z-10"
        variants={itemVariants}
      >
        <button
          className={`text-sm underline ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-all`}
          onClick={() => setShowHelpPopup(true)}
        >
          Need Help?
        </button>
        <button
          className={`px-4 py-2 text-sm border-[2px] ${isDarkMode ? 'border-white bg-red-500 text-white shadow-[3px_3px_0_0_white] hover:bg-red-600' : 'border-black bg-red-200 text-black shadow-[3px_3px_0_0_black] hover:bg-red-300'} rounded-xl transition-all`}
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Log Out
        </button>
      </motion.div>

      <motion.h1
        className={`text-4xl font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}
        variants={itemVariants}
      >
        Your Doodle Tasks 📝
      </motion.h1>

      <motion.div
        className="w-full max-w-md mb-4 relative"
        variants={itemVariants}
      >
        <div className={`flex items-center gap-2 border-[2px] border-dashed ${isDarkMode ? 'border-gray-500 bg-gray-700' : 'border-black bg-white'} px-4 py-2 rounded-xl shadow-[3px_3px_0_0_black]`}>
          <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>🔍</span>
          <input
            type="text"
            placeholder="Quick Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full bg-transparent outline-none ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-700 placeholder-gray-400'}`}
          />
          <button onClick={() => setShowFilters((prev) => !prev)}>
            <img src={isDarkMode ? TaskFilterIconDark : TaskFilterIcon} alt="Filter" className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`absolute w-full border-[2px] border-dashed ${isDarkMode ? 'border-gray-500 bg-gray-700' : 'border-black bg-white'} mt-2 rounded-xl shadow-[3px_3px_0_0_black] p-4 z-20`}
            >
              <div className="mb-3">
                <label className={`block text-sm font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Priority</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className={`w-full border-2 ${isDarkMode ? 'border-gray-500 bg-gray-600 text-white' : 'border-black bg-white text-black'} rounded-md px-2 py-1 text-sm shadow-[2px_2px_0_0_black]`}
                >
                  <option value="All">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Tag</label>
                <input
                  type="text"
                  placeholder="e.g. work, urgent"
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className={`w-full border-2 ${isDarkMode ? 'border-gray-500 bg-gray-600 text-white placeholder-gray-400' : 'border-black bg-white text-black placeholder-gray-400'} rounded-md px-2 py-1 text-sm shadow-[2px_2px_0_0_black]`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="w-full max-w-xl flex flex-col items-center gap-4"
        variants={itemVariants}
      >
        <TaskForm onAdd={handleAddTask} />

        <motion.div
          className="flex justify-center gap-3"
          variants={itemVariants}
        >
          {["All", "Active", "Completed"].map((label) => (
            <button
              key={label}
              className={`px-4 py-1 text-sm rounded-xl border-2 ${isDarkMode ? 'border-white' : 'border-black'} shadow-[2px_2px_0_0_black] transition-all ${
                statusFilter === label
                  ? isDarkMode ? "bg-blue-600 text-white" : "bg-yellow-300"
                  : isDarkMode ? "bg-gray-600 text-gray-200 hover:bg-gray-500" : "bg-white hover:bg-yellow-100"
              }`}
              onClick={() => setStatusFilter(label)}
            >
              {label} ({label === "All" ? allTasksCount : (label === "Active" ? activeTasksCount : completedTasksCount)})
            </button>
          ))}
        </motion.div>

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </motion.div>

      <AnimatePresence>
        {showHelpPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* The direct child of AnimatePresence must be a single component.
                If you have multiple, wrap them in a fragment or a div. */}
            <> {/* ADD THIS FRAGMENT */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setShowHelpPopup(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`relative z-50 p-6 rounded-xl border-[2.5px] font-comic max-w-sm sm:max-w-md text-center
                  ${isDarkMode ? 'bg-gray-800 border-white text-white shadow-[4px_4px_0_0_white]' : 'bg-white border-black text-black shadow-[4px_4px_0_0_black]'}
                `}
              >
                <h2 className="text-xl font-bold mb-4">Need Help?</h2>
                <p className="mb-6">
                  For assistance, please contact us at{" "}
                  <a href="mailto:support@checksy.com" className={`underline ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    support@checksy.com
                  </a>
                </p>
                <button
                  onClick={() => setShowHelpPopup(false)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold
                    ${isDarkMode
                      ? 'bg-blue-600 border-white text-white shadow-[2px_2px_0_0_white]'
                      : 'bg-yellow-300 border-black text-black shadow-[2px_2px_0_0_black]'
                    }
                    transition-colors duration-200 hover:${isDarkMode ? 'bg-blue-700' : 'bg-yellow-400'}
                  `}
                >
                  Got it!
                </button>
              </motion.div>
            </> {/* ADD THIS FRAGMENT */}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;