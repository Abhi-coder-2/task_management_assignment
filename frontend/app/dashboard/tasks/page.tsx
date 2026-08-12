"use client";
import styles from "./tasks.module.css"
import { CalendarDays, Clock3, MoreHorizontal } from "lucide-react";
import DashboardLayout from "../page";

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

export default function TaskBoard() {
  return (
    <DashboardLayout    >
       
      <div className="overflow-x-auto pb-5">
        {/* -------------------TASKS HEADER------------------ */}
         <div className={`${styles.task_header} bg-white fixed pr-70 w-full top-15 mb-5 z-20 flex h-[64px] items-center justify-between px-5` }>
            <div>Tasks</div>
            <div>tasks</div>
           
         </div>
         {/* ------------------CARDS---------------------------- */}
        <div className="flex min-w-max gap-4 mt-5">
          {columns.map((column) => (
            <div
              key={column.id}
              className="w-[280px] rounded-lg bg-gray-100 p-3 mt-7"
            >
              {/* Column Header */}
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">{column.title}</h2>

                <span className="rounded-full bg-gray-200 px-2 py-1 text-xs">
                  {column.tasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-sm font-medium">{task.title}</h3>

                      <MoreHorizontal size={16} />
                    </div>

                    <p className="mb-3 text-xs text-gray-500">
                      {task.category}
                    </p>

                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-600"
                            : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        {task.priority}
                      </span>

                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-600">
                        {task.initials}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        {task.dueDate}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock3 size={12} />
                        {task.user}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
