import React, { useState } from "react";

interface TaskInput {
  text: string;
  important: boolean;
  urgent: boolean;
}

interface TaskFormProps {
  onAdd: (task: TaskInput) => void;
}

export default function TodoForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState("");
  const [important, setImportant] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return alert("Task can't be empty.");
    onAdd({ text: trimmed, important, urgent });
    setText("");
    setImportant(false);
    setUrgent(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4  p-4 rounded shadow space-y-3"
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Enter your task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-4 items-center">
        <label>
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
          />
          <span className="ml-1">Important</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
          />
          <span className="ml-1">Urgent</span>
        </label>
        <button
          type="submit"
          className="bg-[#1fbcf9] text-white px-4 py-1 rounded  ml-auto"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
