import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RepeatPng from "../assets/Repeat.png";
import ArrowPng from "../assets/arrow.png";
import { useDarkMode } from "../components/DarkModeContext";

const TaskForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const { isDarkMode } = useDarkMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      dueDate,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString(), // ADDED: Creation timestamp
    };

    onAdd(newTask);
    setText("");
    setPriority("Medium");
    setDueDate("");
    setTags("");
    // Optionally, reset showMore if you want the form to collapse after adding
    // setShowMore(false);
    // setIsArrowRotated(false);
  };

  const handleToggleShowMore = () => {
    setShowMore((prev) => !prev);
    setIsArrowRotated((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full relative flex flex-col gap-4 border-[2px] p-4 rounded-xl shadow-[4px_4px_0_0_black] ${
        isDarkMode ? "border-white bg-gray-700" : "border-black bg-white"
      }`}
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full border-[2px] px-4 py-2 rounded-lg outline-none shadow-[2px_2px_0_0_black] ${
          isDarkMode
            ? "border-white bg-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
            : "border-black bg-gray-50 text-gray-700 placeholder-gray-500 focus:ring-yellow-300"
        }`}
      />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className={`flex-1 border-[2px] py-2 px-4 rounded-lg font-bold shadow-[3px_3px_0_0_black] transition-all ${
            isDarkMode
              ? "border-white bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              : "border-black bg-yellow-300 text-black hover:bg-yellow-400 active:bg-yellow-500"
          }`}
        >
          Add Task ➕
        </button>

        <motion.div
          onClick={handleToggleShowMore}
          className="cursor-pointer select-none p-2 relative"
          animate={{
            rotate: isArrowRotated ? 270 : 90,
            scale: [1, 1.2, 1],
            y: [0, -5, 0],
          }}
          transition={{
            rotate: { duration: 0.4, ease: "easeInOut" },
            scale: { duration: 0.2, ease: "easeOut" },
            y: { duration: 0.2, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.9, y: 2 }}
        >
          <img
            src={RepeatPng}
            alt="Toggle More Options"
            className={`w-6 h-6 object-contain ${isDarkMode ? 'filter invert' : ''}`}
          />
        </motion.div>
      </div>

      <div
        className="absolute top-12 right-0 flex flex-col items-center bg-transparent -rotate-6"
        style={{ right: "-90px" }}
      >
        <span className={`text-sm font-medium whitespace-nowrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          More Options
        </span>
        <img
          src={ArrowPng}
          alt="Arrow"
          className={`w-8 h-auto transform scale-x-[-1] ${isDarkMode ? 'filter invert' : ''}`}
          style={{ transform: "scaleX(-1) rotate(20deg)" }}
        />
      </div>

      <AnimatePresence>
        {showMore && (
          <motion.div
            key="more-options"
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 18,
              mass: 0.8,
            }}
            className="flex flex-col gap-4 mt-2"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`flex-1 border-[2px] px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "border-white bg-gray-600 text-white"
                    : "border-black bg-gray-50 text-gray-700"
                }`}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`flex-1 border-[2px] px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "border-white bg-gray-600 text-white"
                    : "border-black bg-gray-50 text-gray-700"
                }`}
              />
            </div>

            <input
              type="text"
              placeholder="Add tags separated by commas (e.g. Work, Personal)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={`w-full border-[2px] px-4 py-2 rounded-lg outline-none shadow-[2px_2px_0_0_black] ${
                isDarkMode
                  ? "border-white bg-gray-600 text-white placeholder-gray-400 focus:ring-blue-400"
                  : "border-black bg-gray-50 text-gray-700 placeholder-gray-500 focus:ring-yellow-300"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default TaskForm;