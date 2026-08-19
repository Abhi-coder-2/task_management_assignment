"use client";
import styles from "./dashboard.module.css";
import TaskBoard from "./tasks/page";
import { ReactNode, useState } from "react";
import {
  Menu,
  PanelRight,
  PanelLeft,
  X,
  Columns3,
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
  Code,
  ChevronRight,
  Settings,
  Palette,
} from "lucide-react";
import Link from "next/link";
import tasks from "./tasks/page";

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

type DashboardLayoutProps = {
  children:ReactNode;
}

export default function DashboardLayout({children}:DashboardLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workSpaceOpen, setWorkSpaceOpen] = useState(true);
  const [userOpen, setUserOpen] = useState(false);
  return (
    <>
      <div 
        className={`min-h-screen ${darkMode ? "bg-[#111318]" : "bg-[#ffffff]"}`}
      >
        {/*-----------------------mobile overLay-------------------- */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          ></div>
        )}
        {/*---------------------- SIDEBAR----------------------- */}
        <div
          className={`${styles.sidebar} fixed left-0 top-0 z-50 flex h-screen flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* --logo--*/}
          <div className="flex h-[64px] items-center justify-between border-b border-white/10">
          {/* USER PROFILE AND MODE */}
            <div onClick={() => setUserOpen(!userOpen)} className="flex items-center gap-2 px-5 cursor-pointer">
              <div className={`${styles.workspace_img} flex h-8 w-8 items-center justify-center`}>
                <img src="/admin.jpg" alt="" />
              </div>

              <span className="text-sm font-semibold">Dexter</span>
              <span className={styles.workspace_icon}><Code size={15}/></span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className={`${styles.pointer} lg:hidden`}>
              <X size={19} />
            </button>
          </div>
          {/*--Workspace--*/}
          <div className="px-4 py-5">
            <button
              onClick={() => setWorkSpaceOpen(!workSpaceOpen)}
              className={`${styles.pointer} flex w-full items-center justify-between rounded-md px-2 py-2 text-xs hover:bg-white/5`}
            >
              <span className={`${styles.workspace_text}`}> Workspace</span>
              <ChevronDown
                size={14}
                className={` transition-transform duration-200 ${
                  workSpaceOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* --dropdown-- */}
            {workSpaceOpen && (
              <div className="mt-1 space-y-1">
                <Link
                  href="/dashboard/tasks"
                  className={`${styles.task_project_link} flex items-center gap-2 rounded-md px-3 py-2 text-xs`}
                >
                  <CheckSquare size={14} />
                  Tasks
                </Link>

                <Link
                  href="/dashboard/projects"
                  className={` ${styles.task_project_link} flex items-center gap-2 rounded-md px-3 py-2 text-xs`}
                >
                  <FolderKanban size={14} />
                  Projects
                </Link>
              </div>
            )}
          </div>
        </div>
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
                className={`${styles.pointer} rounded-md p-2 hover:bg-gray-100  `}
              >
                <PanelLeft size={20} />
              </button>
            </div>
          </header>

          {/* ================= CONTENT ================= */}

          <section className="p-4 md:p-6">

            {/* ================= KANBAN ================= */}

            <div className="overflow-x-auto pb-5">
              <div className="flex min-w-max gap-4">
              {/* tasks i have to show here */}
              {/* <TaskBoard/> */}
              {children}
              </div>
            </div>
          </section>
        </main>
      </div>

      USER PROFILE DROPDOWN
      {userOpen && (
        <div className={styles.user_dropdown}>
          <X  onClick={() => setUserOpen(!userOpen)} className="ml-auto mt-2 mr-2 cursor-pointer" size={13}/>
          <div className={`${styles.user_dropdown_header} ${styles.dropdown_header}`}>
            <div className={`${styles.workspace_img}`}><img src="/admin.jpg" alt="" /></div>
            <div className="mt-1">Dexter</div>
            <div>john.doe@example.com</div>
          </div>
          <div className={`${styles.dropdown_header} ${styles.user_dropdown_footer}`}>
           <div className="flex justify-between cursor-pointer"><div><span><Sun /> </span><span className="ml-2">Change Theme</span></div><div><ChevronRight /></div></div>
           <div className="flex justify-between cursor-pointer"><div><span><Palette /></span><span className="ml-2">Color Mode</span></div><div><ChevronRight /></div></div>
           <div className="flex justify-between cursor-pointer"><div><span><Settings /> </span><span className="ml-2">Settings</span></div></div>
           
          </div>
        </div>
      )}
    </>
  );
}
