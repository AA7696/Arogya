import { useState } from "react";

// Task type declared locally
interface Task {
  id: string;
  text: string;
  important: boolean;
  urgent: boolean;
  done: boolean;
}

// Props type
interface TodoCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, updated: Partial<Task>) => void;
}

export default function TodoCard({ task, onDelete, onToggle, onEdit }: TodoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [important, setImportant] = useState(task.important);
  const [urgent, setUrgent] = useState(task.urgent);

  const handleSave = () => {
    const trimmed = text.trim();
    if (!trimmed) return alert("Task cannot be empty.");
    onEdit(task.id, { text: trimmed, important, urgent });
    setIsEditing(false);
  };

  const borderColor = task.important
    ? task.urgent
      ? "border-red-500"
      : "border-yellow-400"
    : task.urgent
    ? "border-orange-400"
    : "border-[#1fbcf9]";

  if (isEditing) {
    return (
      <div className="bg-[#1fbcf9]/10 p-4 rounded-lg shadow space-y-3 border border-blue-300">
        <input
          className="w-full border border-gray-300 p-2 rounded-md text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Update task..."
        />
        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
            />
            Important
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
            />
            Urgent
          </label>
        </div>
        <div className="flex justify-end gap-2 text-sm">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-red-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`shadow p-4 rounded-md flex flex-col gap-2 border-2 ${borderColor}`}>
      <span
        className={`font-medium text-sm ${
          task.done ? "line-through text-gray-400" : "text-white"
        }`}
      >
        {task.text}
      </span>

      <div className="flex justify-between items-center text-xs text-white">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggle(task.id)}
            />
            Done
          </label>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:text-blue-600"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-400 hover:text-red-600"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
