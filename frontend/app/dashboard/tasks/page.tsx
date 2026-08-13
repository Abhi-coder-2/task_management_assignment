"use client";

import styles from "./tasks.module.css";
import {
  CalendarDays,
  Columns3,
  Funnel,
  MoreHorizontal,
  Search,
} from "lucide-react";
import DashboardLayout from "../page";

type Task = {
  id: number;
  title: string;
  user: string;
  initials: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  status: "todo" | "doing" | "completed" | "onhold";
};

type Column = {
  id: Task["status"];
  title: string;
};

const columns: Column[] = [
  {
    id: "todo",
    title: "To Do",
  },
  {
    id: "doing",
    title: "Doing",
  },
  {
    id: "completed",
    title: "Completed",
  },
  {
    id: "onhold",
    title: "On Hold",
  },
];

const tasks: Task[] = [
  {
    id: 1,
    title: "Write API Documentation",
    user: "Alex",
    initials: "A",
    category: "Development",
    priority: "High",
    dueDate: "29 Aug",
    status: "onhold",
  },
  {
    id: 2,
    title: "Implement Search Function",
    user: "Alex",
    initials: "A",
    category: "Development",
    priority: "High",
    dueDate: "29 Aug",
    status: "doing",
  },
  {
    id: 3,
    title: "Deploy to Production",
    user: "Alex",
    initials: "A",
    category: "Deployment",
    priority: "High",
    dueDate: "29 Aug",
    status: "todo",
  },
    {
    id: 7,
    title: "Deploy to Production",
    user: "Alex",
    initials: "A",
    category: "Deployment",
    priority: "High",
    dueDate: "29 Aug",
    status: "todo",
  },
  {
    id: 4,
    title: "Feature Testing Passed",
    user: "QA Team",
    initials: "Q",
    category: "Testing",
    priority: "Low",
    dueDate: "29 Aug",
    status: "completed",
  },
];

export default function TaskBoard() {
  return (
    <DashboardLayout>
      <div className="overflow-x-auto pb-5">

        {/* TASKS HEADER */}
        <div
          className={`${styles.task_header} bg-white fixed pr-70 w-full top-15 mb-5 z-20 flex items-center justify-between px-5`}
        >
          <div>Tasks</div>

          <div className={`${styles.task_head_right} flex`}>
            <div className="flex gap-2">
              <input
                className={styles.task_head_input}
                type="text"
              />

              <div className={styles.search_div}>
                <Search className={styles.task_head_icon} />
              </div>
            </div>

            <div
              className={`flex items-center justify-center gap-2 ${styles.task_icon_border}`}
            >
              <Columns3 className={styles.task_head_icon} />

              <div className="text-xs font-bold">
                Fields
              </div>
            </div>

            <div className={styles.task_icon_border}>
              <Funnel className={styles.task_head_icon} />
            </div>

            <div>
              <button
                className={`${styles.task_head_btn} bg-black text-white`}
              >
                <span>+</span> Add Task
              </button>
            </div>
          </div>
        </div>

        {/*----------------------CARDS-------------------------- */}
        <div className="flex min-w-max gap-4 mt-20">

          {columns.map((column) => {

            // Get tasks belonging to this column
            const columnTasks = tasks.filter(
              (task) => task.status === column.id
            );

            return (
              <div
                key={column.id}
                className="w-[300px] shrink-0 rounded-lg bg-gray-100 p-3"
              >

                {/* COLUMN HEADER */}
                <div className="mb-3 flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-gray-800">
                      {column.title}
                    </h2>

                    <span className="text-sm text-gray-500">
                      {columnTasks.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-xl text-gray-600"
                    >
                      +
                    </button>

                    <MoreHorizontal
                      size={18}
                      className="text-gray-600"
                    />
                  </div>

                </div>

                {/* CARDS */}
                <div className="flex flex-col gap-3">

                  {columnTasks.map((task) => (

                    <div
                      key={task.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >

                      {/* TITLE */}
                      <div className="flex items-start justify-between gap-2">

                        <h3 className="text-sm font-medium text-gray-800">
                          {task.title}
                        </h3>

                        <MoreHorizontal
                          size={18}
                          className="shrink-0 text-gray-500"
                        />
                      </div>
                      {/* USER */}
                      <div className="mt-4 flex items-center gap-2">
                       <div className="flex justify-between gap-28">
                        <div className="text-sm text-gray-700">
                          {task.user}
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs text-red-500">
                          <CalendarDays size={13} />
                          {task.dueDate}
                        </div>
                       </div>
                      </div>
                      {/* CATEGORY */}
                      <div className="mt-3">
                        <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          {task.category}
                        </span>
                        <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 ml-3">
                          {task.category}
                        </span>
                      </div>
                    </div>

                  ))}

                </div>

                {/* ADD TASK */}
                <button
                  type="button"
                  className="mt-3 w-full rounded-lg px-2 py-2 text-left text-sm text-gray-600 hover:bg-gray-200"
                >
                  + Add Task
                </button>

              </div>
            );
          })}

        </div>
      </div>
    </DashboardLayout>
  );
}