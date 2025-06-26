"use client";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  status: "pending" | "done";
  createdAt: string;
}

// API base URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingStatus, setEditingStatus] = useState<"pending" | "done">("pending");

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) throw new Error();
      setNewTitle("");
      fetchTasks();
    } catch {
      setError("Failed to add task");
    }
  };

  // Delete task
  const deleteTask = async (id: number) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  // Start editing
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
    setEditingStatus(task.status);
  };

  // Save edit
  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editingTitle, status: editingStatus }),
      });
      if (!res.ok) throw new Error();
      setEditingId(null);
      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4"> 
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Mini Task Manager</h1>
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Add a new task..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
        </form>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500">No tasks yet.</div>
        ) : (
          <ul className="space-y-3">
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between border rounded px-3 py-2">
                {editingId === task.id ? (
                  <form onSubmit={saveEdit} className="flex-1 flex gap-2 items-center">
                    <input
                      className="flex-1 border rounded px-2 py-1"
                      value={editingTitle}
                      onChange={e => setEditingTitle(e.target.value)}
                    />
                    <select
                      className="border rounded px-2 py-1"
                      value={editingStatus}
                      onChange={e => setEditingStatus(e.target.value as "pending" | "done")}
                    >
                      <option value="pending">Pending</option>
                      <option value="done">Done</option>
                    </select>
                    <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Save</button>
                    <button type="button" className="ml-2 text-gray-500" onClick={() => setEditingId(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <div className="flex-1">
                      <span className={task.status === "done" ? "line-through text-gray-400" : ""}>{task.title}</span>
                      <span className="ml-2 text-xs text-gray-400">({new Date(task.createdAt).toLocaleString()})</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:underline" onClick={() => startEdit(task)}>Edit</button>
                      <button className="text-red-600 hover:underline" onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
