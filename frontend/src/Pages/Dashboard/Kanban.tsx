import React, { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";
import {loadTasks ,saveTasks} from './storage';
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

interface Task {
  id: string;
  text: string;
  important: boolean;
  urgent: boolean;
  done: boolean;
}

interface Quadrant {
  important: boolean;
  urgent: boolean;
}

const quadrantId = (important: boolean, urgent: boolean): string => {
  if (important && urgent) return "q1";
  if (!important && urgent) return "q2";
  if (important && !urgent) return "q3";
  return "q4";
};

const quadrantFromId = (id: string): Quadrant => {
  switch (id) {
    case "q1": return { important: true, urgent: true };
    case "q2": return { important: false, urgent: true };
    case "q3": return { important: true, urgent: false };
    case "q4": return { important: false, urgent: false };
    default: return { important: false, urgent: false };
  }
};

export default function Kanban() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = ({ text, important, urgent }: Omit<Task, 'id' | 'done'>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      important,
      urgent,
      done: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleDone = (id: string) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const editTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedFields } : task
    ));
  };

  const getTasks = (imp: boolean, urg: boolean) =>
    tasks.filter(t => t.important === imp && t.urgent === urg);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && active) {
      const newQuadrant = quadrantFromId(over.id as string);
      setTasks(tasks.map(task =>
        task.id === active.id
          ? { ...task, ...newQuadrant }
          : task
      ));
    }
  };

  return (
    <div>
      <TodoForm onAdd={addTask} />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DroppableColumn id="q1" title="Important & Urgent" tasks={getTasks(true, true)} onDelete={deleteTask} onToggle={toggleDone} onEdit={editTask} />
          <DroppableColumn id="q2" title="Not Important but Urgent" tasks={getTasks(false, true)} onDelete={deleteTask} onToggle={toggleDone} onEdit={editTask} />
          <DroppableColumn id="q3" title="Important but Not Urgent" tasks={getTasks(true, false)} onDelete={deleteTask} onToggle={toggleDone} onEdit={editTask} />
          <DroppableColumn id="q4" title="Not Important & Not Urgent" tasks={getTasks(false, false)} onDelete={deleteTask} onToggle={toggleDone} onEdit={editTask} />
        </div>
      </DndContext>
    </div>
  );
}

interface DroppableColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, updatedFields: Partial<Task>) => void;
}

function DroppableColumn({ id, title, tasks, onDelete, onToggle, onEdit }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-white/5 backdrop-blur-md border border-white/10  rounded-lg p-4 shadow min-h-[150px] transition ${isOver ? "ring-2 ring-blue-500" : ""}`}
    >
      <h2 className="font-bold text-lg mb-3">{title}</h2>
      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <DraggableCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No tasks</p>
        )}
      </div>
    </div>
  );
}

interface DraggableCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, updatedFields: Partial<Task>) => void;
}

function DraggableCard({ task, onDelete, onToggle, onEdit }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });

  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} className="cursor-move w-full">
        <div className="text-xs text-gray-400">Drag</div>
      </div>
      <TodoCard task={task} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
    </div>
  );
}