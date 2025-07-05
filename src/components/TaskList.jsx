import { useState, useRef, useEffect } from "react"; // Added useEffect
import { motion, AnimatePresence } from "framer-motion";
import notebookClosed from "../assets/notebook-closed.png";
import { useDarkMode } from "../components/DarkModeContext";

// Nested component for open notebook view (no change here)
const OpenNotebook = ({ task, isDarkMode }) => {
  const ruledLineStyle = {
    backgroundImage: `linear-gradient(to bottom, transparent 24px, ${isDarkMode ? '#555' : '#e0e0e0'} 25px)`,
    backgroundSize: '100% 25px',
    backgroundPosition: '0 15px',
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`relative w-[300px] h-[360px] border-[3px] rounded-xl shadow-[6px_6px_0_0_black] p-[6px] mx-auto flex flex-col overflow-hidden ${
      isDarkMode ? "border-blue-600 bg-blue-900" : "border-blue-400 bg-blue-200"
    }`}>
      <div className={`flex flex-1 w-full h-full border-[2.5px] rounded-lg overflow-hidden relative ${
        isDarkMode ? "border-gray-500 bg-gray-200" : "border-black bg-yellow-50"
      }`}>
        {/* Left Page */}
        <div className="flex-1 relative" style={ruledLineStyle}>
          <div className="absolute inset-0 flex items-center justify-center pt-4 px-3">
            <h3 className={`text-md font-bold leading-tight text-center ${isDarkMode ? "text-gray-900" : "text-gray-800"}`}>
              {task.text}
            </h3>
          </div>
        </div>

        {/* Spine */}
        <div className={`w-[2px] ${isDarkMode ? "bg-gray-600" : "bg-gray-400"}`}></div>

        {/* Right Page */}
        <div className="flex-1 relative" style={ruledLineStyle}>
          <div className="absolute inset-0 flex flex-col justify-between pt-4 px-3">
            <div className={`text-xs flex flex-col gap-1 ${isDarkMode ? "text-gray-700" : "text-gray-700"}`}>
              <span><strong>Priority:</strong> {task.priority}</span>
              {task.dueDate && <span><strong>Due:</strong> {task.dueDate}</span>}
              {task.createdAt && <span><strong>Created:</strong> {formatDateTime(task.createdAt)}</span>}
            </div>
            {task.tags?.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-1 justify-end items-end pb-1 text-xs">
                <strong className={isDarkMode ? "text-gray-700" : ""}>Tags:</strong>
                {task.tags.map((tag, idx) => (
                  <span key={idx} className={`px-1 py-0.5 rounded-full text-xs ${
                    isDarkMode ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Tabs */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-[6px] pr-[1px]">
        <div className={`w-[10px] h-6 border-[1.5px] rounded-sm shadow-[1px_1px_0_0_black] ${isDarkMode ? "bg-pink-600 border-white" : "bg-pink-300 border-black"}`} />
        <div className={`w-[10px] h-6 border-[1.5px] rounded-sm shadow-[1px_1px_0_0_black] ${isDarkMode ? "bg-yellow-600 border-white" : "bg-yellow-300 border-black"}`} />
        <div className={`w-[10px] h-6 border-[1.5px] rounded-sm shadow-[1px_1px_0_0_black] ${isDarkMode ? "bg-green-600 border-white" : "bg-green-300 border-black"}`} />
      </div>
    </div>
  );
};

// Main TaskList component
const TaskList = ({ tasks, onToggleComplete, onDelete, onEdit }) => {
  const [viewMode, setViewMode] = useState("list");
  const { isDarkMode } = useDarkMode();

  // State to manage which task is currently being edited
  const [editingTaskId, setEditingTaskId] = useState(null);

  // States to hold the values for the *currently* edited task's fields
  // These will be initialized when an "Edit" button is clicked
  const [currentEditText, setCurrentEditText] = useState('');
  const [currentEditPriority, setCurrentEditPriority] = useState('Medium');
  const [currentEditDueDate, setCurrentEditDueDate] = useState('');
  const [currentEditTags, setCurrentEditTags] = useState('');

  // Ref for focusing the input when editing
  const editInputRef = useRef(null);

  // useEffect to focus the input when editing mode is entered
  useEffect(() => {
    if (editingTaskId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTaskId]);

  const getPriorityBgColor = (priority) => {
    if (isDarkMode) {
      switch (priority) {
        case "Low":
          return "bg-blue-800";
        case "Medium":
          return "bg-yellow-800";
        case "High":
          return "bg-red-800";
        default:
          return "bg-gray-800";
      }
    } else {
      switch (priority) {
        case "Low":
          return "bg-blue-100";
        case "Medium":
          return "bg-yellow-100";
        case "High":
          return "bg-red-100";
        default:
          return "bg-gray-100";
      }
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setCurrentEditText(task.text);
    setCurrentEditPriority(task.priority);
    setCurrentEditDueDate(task.dueDate || '');
    setCurrentEditTags((task.tags || []).join(', '));
  };

  const handleSaveEdit = (taskId) => {
    if (currentEditText.trim() === '') {
      alert('Task text cannot be empty!');
      return;
    }
    onEdit(taskId, {
      text: currentEditText.trim(),
      priority: currentEditPriority,
      dueDate: currentEditDueDate,
      tags: currentEditTags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
    setEditingTaskId(null); // Exit editing mode
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null); // Exit editing mode
  };

  const handleDeleteClick = (id, taskText) => {
    if (window.confirm(`Are you sure you want to delete "${taskText}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Toggle View Mode */}
      <div className="flex justify-end mb-2 gap-2">
        <button
          className={`px-3 py-1 border rounded-lg text-sm shadow-[2px_2px_0_0_black] transition-all ${
            isDarkMode
              ? viewMode === "list"
                ? "bg-yellow-600 text-white border-white"
                : "bg-gray-600 text-gray-200 border-white hover:bg-gray-500"
              : viewMode === "list"
                ? "bg-yellow-200 text-black border-black"
                : "bg-white text-black border-black hover:bg-yellow-100"
          }`}
          onClick={() => setViewMode("list")}
        >
          📋 List View
        </button>
        <button
          className={`px-3 py-1 border rounded-lg text-sm shadow-[2px_2px_0_0_black] transition-all ${
            isDarkMode
              ? viewMode === "block"
                ? "bg-yellow-600 text-white border-white"
                : "bg-gray-600 text-gray-200 border-white hover:bg-gray-500"
              : viewMode === "block"
                ? "bg-yellow-200 text-black border-black"
                : "bg-white text-black border-black hover:bg-yellow-100"
          }`}
          onClick={() => setViewMode("block")}
        >
          📒 Block View
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          No tasks to show.
        </p>
      ) : viewMode === "list" ? (
        <AnimatePresence> {/* Add AnimatePresence here */}
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              className={`w-full border-[2.5px] p-4 rounded-xl shadow-[4px_4px_0_0_black] flex flex-col gap-2 transition-all duration-300 ${
                task.completed
                  ? isDarkMode ? 'bg-green-800 opacity-70 border-white' : 'bg-green-200 opacity-70 border-black'
                  : `${getPriorityBgColor(task.priority)} ${isDarkMode ? 'border-white' : 'border-black'}`
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {editingTaskId === task.id ? (
                // Edit Mode
                <div className="flex flex-col gap-2">
                  <input
                    ref={editInputRef}
                    type="text"
                    value={currentEditText} // Use currentEditText
                    onChange={(e) => setCurrentEditText(e.target.value)}
                    className={`w-full border-[2px] px-3 py-1 rounded-lg outline-none shadow-[1px_1px_0_0_black] ${
                      isDarkMode ? 'border-white bg-gray-600 text-white' : 'border-black bg-gray-50 text-gray-700'
                    }`}
                  />
                  <select
                    value={currentEditPriority} // Use currentEditPriority
                    onChange={(e) => setCurrentEditPriority(e.target.value)}
                    className={`w-full border-[2px] px-3 py-1 rounded-lg ${
                      isDarkMode ? 'border-white bg-gray-600 text-white' : 'border-black bg-gray-50 text-gray-700'
                    }`}
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                  <input
                    type="date"
                    value={currentEditDueDate} // Use currentEditDueDate
                    onChange={(e) => setCurrentEditDueDate(e.target.value)}
                    className={`w-full border-[2px] px-3 py-1 rounded-lg ${
                      isDarkMode ? 'border-white bg-gray-600 text-white' : 'border-black bg-gray-50 text-gray-700'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={currentEditTags} // Use currentEditTags
                    onChange={(e) => setCurrentEditTags(e.target.value)}
                    className={`w-full border-[2px] px-3 py-1 rounded-lg outline-none shadow-[1px_1px_0_0_black] ${
                      isDarkMode ? 'border-white bg-gray-600 text-white' : 'border-black bg-gray-50 text-gray-700'
                    }`}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className={`text-sm px-3 py-1 border rounded-md shadow-[1px_1px_0_0_black] ${
                        isDarkMode ? "bg-blue-600 text-white border-white hover:bg-blue-700" : "bg-yellow-300 text-black border-black hover:bg-yellow-400"
                      }`}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className={`text-sm px-3 py-1 border rounded-md shadow-[1px_1px_0_0_black] ${
                        isDarkMode ? "bg-gray-600 text-white border-white hover:bg-gray-500" : "bg-gray-300 text-black border-black hover:bg-gray-400"
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <>
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-600 italic" : isDarkMode ? "text-white" : "text-black"}`}>
                      {task.text}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleComplete(task.id)}
                        className={`text-sm px-2 py-1 border rounded-md transition-all ${
                          isDarkMode
                            ? task.completed
                              ? "bg-gray-600 text-white border-white hover:bg-gray-500"
                              : "bg-blue-600 text-white border-white hover:bg-blue-700"
                            : task.completed
                              ? "bg-gray-300 text-black border-black hover:bg-gray-400"
                              : "bg-white text-black border-black hover:bg-gray-100"
                        }`}
                      >
                        {task.completed ? "Undo" : "Done"}
                      </button>
                      <button
                        onClick={() => handleEditClick(task)}
                        className={`text-sm px-2 py-1 border rounded-md ${
                          isDarkMode
                            ? "bg-purple-600 text-white border-white hover:bg-purple-700"
                            : "bg-purple-300 text-black border-black hover:bg-purple-400"
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(task.id, task.text)}
                        className={`text-sm px-2 py-1 border rounded-md ${
                          isDarkMode
                            ? "bg-red-600 text-white border-white hover:bg-red-700"
                            : "bg-red-300 text-black border-black hover:bg-red-400"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className={`text-sm flex flex-wrap gap-x-4 gap-y-2 ${task.completed ? 'text-gray-500' : isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span><strong>Priority:</strong> {task.priority}</span>
                    {task.dueDate && <span><strong>Due:</strong> {task.dueDate}</span>}
                    {task.createdAt && <span><strong>Created:</strong> {formatDateTime(task.createdAt)}</span>}
                    {task.tags?.length > 0 && (
                      <span className="flex gap-2 items-center">
                        <strong>Tags:</strong>
                        {task.tags.map((tag, idx) => (
                          <span key={idx} className={`px-2 py-0.5 rounded-full text-xs ${
                            isDarkMode ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700"
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AnimatePresence> {/* Add AnimatePresence here too for block view */}
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                className="relative w-full max-w-xs flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                {task.completed ? (
                  <>
                    <div className="relative w-[300px] h-[360px] mx-auto">
                      <img
                        src={notebookClosed}
                        alt="Notebook Closed"
                        className={`w-full h-full object-cover border-[2px] rounded-xl shadow-[4px_4px_0_0_black] pointer-events-none ${isDarkMode ? 'border-white' : 'border-black'}`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                        <h3 className={`text-xl font-bold text-center leading-snug ${isDarkMode ? 'text-gray-900' : 'text-black'}`}>
                          {task.text}
                        </h3>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 z-10">
                      <button
                        onClick={() => onToggleComplete(task.id)}
                        className={`text-sm px-3 py-1 border rounded-md shadow-[1px_1px_0_0_black] ${
                          isDarkMode
                            ? "bg-gray-600 text-white border-white hover:bg-gray-500"
                            : "bg-white text-black border-black hover:bg-gray-100"
                        }`}
                      >
                        Undo
                      </button>
                      <button
                        onClick={() => handleDeleteClick(task.id, task.text)}
                        className={`text-sm px-3 py-1 border rounded-md shadow-[1px_1px_0_0_black] ${
                          isDarkMode
                            ? "bg-red-600 text-white border-white hover:bg-red-700"
                            : "bg-red-300 text-black border-black hover:bg-red-400"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <OpenNotebook task={task} isDarkMode={isDarkMode} />
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => onToggleComplete(task.id)}
                        className={`text-sm px-3 py-1 border rounded-md shadow-[1px_1px_0_0_black] ${
                          isDarkMode
                            ? "bg-blue-600 text-white border-white hover:bg-blue-700"
                            : "bg-white text-black border-black hover:bg-gray-100"
                        }`}
                      >
                        Done
                      </button>
                      {/* Note: Edit button is currently only in list view, as per your previous code. */}
                      {/* You can add an edit button here for block view if desired. */}
                      <button
                        onClick={() => handleDeleteClick(task.id, task.text)}
                        className={`text-sm px-3 py-1 border rounded-md shadow-[1px_1px_0_0_black] ${
                          isDarkMode
                            ? "bg-red-600 text-white border-white hover:bg-red-700"
                            : "bg-red-300 text-black border-black hover:bg-red-400"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;