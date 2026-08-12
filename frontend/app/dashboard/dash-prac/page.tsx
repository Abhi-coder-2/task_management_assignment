"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  ChevronDown,
  Moon,
  Sun,
  LayoutGrid,
  CheckSquare,
  FolderKanban,
  CalendarDays,
  Clock3,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  user: string;
  initials: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const columns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: 1,
        title: "Write API Documentation",
        user: "Alex",
        initials: "A",
        category: "Development",
        priority: "High",
        dueDate: "29 Aug",
      },
      {
        id: 2,
        title: "Implement Search Function",
        user: "Alex",
        initials: "A",
        category: "Development",
        priority: "Medium",
        dueDate: "30 Aug",
      },
      {
        id: 3,
        title: "Deploy to Production",
        user: "Alex",
        initials: "A",
        category: "Deployment",
        priority: "High",
        dueDate: "31 Aug",
      },
    ],
  },

  {
    id: "doing",
    title: "Doing",
    tasks: [
      {
        id: 4,
        title: "Code Review Completed",
        user: "Alex",
        initials: "A",
        category: "Development",
        priority: "High",
        dueDate: "31 Aug",
      },
      {
        id: 5,
        title: "Design Mockups Finalized",
        user: "Alex",
        initials: "A",
        category: "Design",
        priority: "Medium",
        dueDate: "01 Sep",
      },
    ],
  },

  {
    id: "completed",
    title: "Completed",
    tasks: [
      {
        id: 6,
        title: "Feature Testing Passed",
        user: "QA Team",
        initials: "Q",
        category: "Testing",
        priority: "Low",
        dueDate: "30 Aug",
      },
      {
        id: 7,
        title: "UI Design Updated",
        user: "Designer",
        initials: "D",
        category: "Design",
        priority: "Medium",
        dueDate: "31 Aug",
      },
      {
        id: 8,
        title: "Security Audit Scheduled",
        user: "Security",
        initials: "S",
        category: "Security",
        priority: "High",
        dueDate: "02 Sep",
      },
    ],
  },

  {
    id: "onhold",
    title: "On Hold",
    tasks: [
      {
        id: 9,
        title: "UI Review",
        user: "Designer",
        initials: "D",
        category: "Review",
        priority: "Medium",
        dueDate: "03 Sep",
      },
      {
        id: 10,
        title: "Backend Review",
        user: "Developer",
        initials: "D",
        category: "Backend",
        priority: "Low",
        dueDate: "04 Sep",
      },
      {
        id: 11,
        title: "User Feedback",
        user: "Product",
        initials: "P",
        category: "Product",
        priority: "Medium",
        dueDate: "05 Sep",
      },
    ],
  },
];

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="group rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Task title */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[13px] font-semibold leading-5 text-gray-800">
          {task.title}
        </h3>

        <button className="opacity-0 transition group-hover:opacity-100">
          <MoreHorizontal size={16} className="text-gray-400" />
        </button>
      </div>

      {/* User */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-[10px] font-semibold text-purple-700">
          {task.initials}
        </div>

        <span className="text-[11px] text-gray-500">
          {task.user}
        </span>
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded bg-gray-100 px-2 py-1 text-[10px] text-gray-500">
          {task.category}
        </span>

        <span
          className={`rounded px-2 py-1 text-[10px] ${
            task.priority === "High"
              ? "bg-red-50 text-red-500"
              : task.priority === "Medium"
              ? "bg-yellow-50 text-yellow-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Due date */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
        <span className="flex items-center gap-1 text-[10px] text-gray-400">
          <CalendarDays size={12} />
          {task.dueDate}
        </span>

        <Clock3 size={13} className="text-gray-400" />
      </div>
    </div>
  );
}

function TaskColumn({ column }: { column: Column }) {
  return (
    <div className="flex w-[280px] min-w-[280px] flex-col">
      {/* Column header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-500" />

          <h2 className="text-xs font-semibold text-gray-700">
            {column.title}
          </h2>

          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] text-gray-500">
            {column.tasks.length}
          </span>
        </div>

        <button>
          <MoreHorizontal
            size={16}
            className="text-gray-400"
          />
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add task */}
      <button className="mt-3 flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-gray-400 transition hover:bg-white hover:text-gray-700">
        <Plus size={14} />
        Add Task
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#111318]" : "bg-[#f7f7f8]"
      }`}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-[#292929] text-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[64px] items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-sm font-bold">
              D
            </div>

            <span className="text-sm font-semibold">
              Dexter
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Workspace */}
        <div className="px-4 py-5">
          <p className="mb-2 px-2 text-[10px] uppercase tracking-wider text-gray-500">
            Workspace
          </p>

          <button className="flex w-full items-center justify-between rounded-md px-2 py-2 text-xs hover:bg-white/5">
            <span>My Workspace</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4">
          <a
            href="/dashboard"
            className="mb-1 flex items-center gap-3 rounded-md bg-white/10 px-3 py-2.5 text-xs font-medium"
          >
            <LayoutGrid size={16} />
            Dashboard
          </a>

          <a
            href="/tasks"
            className="mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-xs text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <CheckSquare size={16} />
            Tasks
          </a>

          <a
            href="/projects"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <FolderKanban size={16} />
            Projects
          </a>
        </nav>

        {/* Bottom */}
        <div className="mt-auto border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-xs font-semibold">
              A
            </div>

            <div>
              <p className="text-xs font-medium">
                Abhishek
              </p>

              <p className="text-[10px] text-gray-500">
                Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main className="lg:ml-[230px]">
        {/* Header */}
        <header
          className={`sticky top-0 z-30 flex h-[64px] items-center justify-between border-b px-4 md:px-6 ${
            darkMode
              ? "border-gray-800 bg-[#191a1f]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-2 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <h1
              className={`text-sm font-semibold md:text-base ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Tasks
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden items-center rounded-md border border-gray-200 bg-gray-50 px-2 md:flex">
              <Search
                size={15}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Search"
                className="w-[150px] bg-transparent px-2 py-2 text-xs outline-none"
              />
            </div>

            {/* Theme */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
            >
              {darkMode ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>

            {/* Add task */}
            <button className="flex items-center gap-1.5 rounded-md bg-purple-600 px-3 py-2 text-xs font-medium text-white hover:bg-purple-700">
              <Plus size={15} />

              <span className="hidden sm:block">
                Add Task
              </span>
            </button>
          </div>
        </header>

        {/* ================= CONTENT ================= */}

        <section className="p-4 md:p-6">
          {/* Page heading */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                className={`text-xl font-semibold ${
                  darkMode
                    ? "text-white"
                    : "text-gray-800"
                }`}
              >
                Tasks
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Manage and track your team's work
              </p>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
                <Filter size={14} />
                Filter
              </button>

              <button className="hidden rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 sm:block">
                All Tasks
              </button>
            </div>
          </div>

          {/* ================= KANBAN ================= */}

          <div className="overflow-x-auto pb-5">
            <div className="flex min-w-max gap-4">
              {columns.map((column) => (
                <TaskColumn
                  key={column.id}
                  column={column}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}