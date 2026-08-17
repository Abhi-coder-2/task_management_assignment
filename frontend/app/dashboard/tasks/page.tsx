"use client";

import styles from "./tasks.module.css";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Columns3,
  Funnel,
  MoreHorizontal,
  Search,
  Signal,
  Tag,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import DashboardLayout from "../page";
import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  _id: string;
  title: string;
  assignedTo?: {
    name?: string;
    username?: string;
  } | null;
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
type Modal = {
  icon: string;
  text: string;
};
const modal: Modal[] = [
  {
    icon: <Circle />,
    text: "Status",
  },
  {
    icon: <Signal />,
    text: "Priority",
  },
  {
    icon: <UsersRound />,
    text: "Members",
  },
  {
    icon: <CalendarDays />,
    text: "Due Date",
  },
  {
    icon: <Users />,
    text: "Teams",
  },
  {
    icon: <Tag />,
    text: "Labels",
  },
  {
    icon: <UserRound />,
    text: "Reporter",
  },
];

export default function TaskBoard() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [workSpaceOpen, setWorkSpaceOpen] = useState(true);
 const [openModal, setOpenModal] = useState<number | null>(null);
const [selectedStatus, setSelectedStatus] = useState("todo");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/tasks");
      setCardData(res.data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(cardData, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

  return (
    <DashboardLayout>
      <div className="overflow-x-auto pb-5">
        {/* TASKS HEADER */}
        <div
          className={`${styles.task_header} bg-white fixed pr-70 w-full top-15 mb-5 z-20 flex items-center justify-between px-5`}
        >
          <div className="text-1xs font-bold">Tasks</div>

          <div className={`${styles.task_head_right} flex`}>
            <div className="flex gap-2">
              <input className={styles.task_head_input} type="text" />

              <div className={styles.search_div}>
                <Search className={styles.task_head_icon} />
              </div>
            </div>

            <div
              className={`flex items-center justify-center gap-2 ${styles.task_icon_border}`}
            >
              <Columns3 className={styles.task_head_icon} />

              <div className="text-xs font-bold">Fields</div>
            </div>

            <div className={styles.task_icon_border}>
              <Funnel className={styles.task_head_icon} />
            </div>

            <div>
              <button
                onClick={() => setShowAddTask(!showAddTask)}
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
            const columnTasks = cardData.filter(
              (task) => task.status === column.id,
            );

            return (
              <div
                key={column.id}
                className="w-[275px] shrink-0 rounded-lg bg-gray-100 p-3"
              >
                {/* COLUMN HEADER */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className=" text-xs font-bold text-gray-800">
                      {column.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button type="button" className="text-xl text-gray-600">
                      +
                    </button>

                    <MoreHorizontal size={18} className="text-gray-600" />
                  </div>
                </div>

                {/* CARDS */}
                <div className="flex flex-col gap-3">
                  {columnTasks.map((task) => (
                    <div
                      key={task._id}
                      className={`${styles.task_card_outer} rounded-lg border border-gray-200 bg-white p-3 shadow-sm`}
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
                        <div className={styles.user_calendar}>
                          <div className="text-sm text-gray-700 flex item-center gap-2">
                            <span>
                              <img
                                className={styles.user_card_img}
                                src="/admin.jpg"
                                alt=""
                              />
                            </span>
                            <span className="text-xs mt-1">Admin</span>
                          </div>
                          <div
                            className={`${styles.card_dueDate} inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs text-red-500`}
                          >
                            <CalendarDays size={13} />
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                  },
                                )
                              : "No date"}
                          </div>
                        </div>
                      </div>
                      {/* CATEGORY */}
                      <div className=" flex mt-2 gap-2 ">
                        <div className=" rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 flex align-center gap-1">
                          <span>
                            <Tag size={14} />
                          </span>
                          <span>{task.category}</span>
                        </div>
                        <div className=" rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 flex align-center gap-1">
                          <span>
                            <Tag size={14} />
                          </span>
                          <span>{task.category}</span>
                        </div>
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
      {showAddTask && (
        <div className={styles.modal_outer}>
          <div className={styles.modal_box}>
            <input type="text" placeholder="task title" className="mb-3" />
            {modal.map((item, index) => {
              const isOpen = openModal === index;

              return (
                <div
                  key={index}
                  onClick={() => {
                    setOpenModal(isOpen ? null : index);
                  }}
                  className={`${styles.status} flex`}
                >
                  <div className="flex gap-2">
                    <div className={styles.icon_align}>
                      <span className={styles.modal_icon}>{item.icon}</span>
                    </div>

                    <div className={styles.add_task_text}>{item.text}</div>
                  </div>

                  <div>
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STATUS MODAL */}
      {openModal === 0 && (
        <div className={styles.status_modal}>
          <p className="text-xs text-gray-500">Status</p>

          <div
            onClick={() => setSelectedStatus("todo")}
            className="mt-2 flex justify-between"
          >
            <p>todo</p>

            <p>{selectedStatus === "todo" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("doing")}
            className="flex justify-between"
          >
            <p>doing</p>

            <p>{selectedStatus === "doing" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("completed")}
            className="flex justify-between"
          >
            <p>completed</p>

            <p>{selectedStatus === "completed" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("onhold")}
            className="flex justify-between"
          >
            <p>onhold</p>

            <p>{selectedStatus === "onhold" && <Check size={22} />}</p>
          </div>
        </div>
      )}

      {/* PRIORITY MODAL */}
      {openModal === 1 && (
        <div className={`${styles.status_modal} mt-9`}>
          <p className="text-xs text-gray-500">Status</p>

          <div
            onClick={() => setSelectedStatus("todo")}
            className="mt-2 flex justify-between"
          >
            <p>todo</p>

            <p>{selectedStatus === "todo" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("doing")}
            className="flex justify-between"
          >
            <p>doing</p>

            <p>{selectedStatus === "doing" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("completed")}
            className="flex justify-between"
          >
            <p>completed</p>

            <p>{selectedStatus === "completed" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("onhold")}
            className="flex justify-between"
          >
            <p>onhold</p>

            <p>{selectedStatus === "onhold" && <Check size={22} />}</p>
          </div>
        </div>
      )}

      {/* MEMBERS MODAL */}
     {openModal === 2 && (
        <div className={`${styles.status_modal} mt-20`}>
          <p className="text-xs text-gray-500">Status</p>

          <div
            onClick={() => setSelectedStatus("todo")}
            className="mt-2 flex justify-between"
          >
            <p>todo</p>

            <p>{selectedStatus === "todo" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("doing")}
            className="flex justify-between"
          >
            <p>doing</p>

            <p>{selectedStatus === "doing" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("completed")}
            className="flex justify-between"
          >
            <p>completed</p>

            <p>{selectedStatus === "completed" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("onhold")}
            className="flex justify-between"
          >
            <p>onhold</p>

            <p>{selectedStatus === "onhold" && <Check size={22} />}</p>
          </div>
        </div>
      )}
      {/* DUE DATE MODAL */}
       {openModal === 3 && (
        <div className={`${styles.status_modal} mt-30`}>
          <p className="text-xs text-gray-500">Status</p>

          <div
            onClick={() => setSelectedStatus("todo")}
            className="mt-2 flex justify-between"
          >
            <p>todo</p>

            <p>{selectedStatus === "todo" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("doing")}
            className="flex justify-between"
          >
            <p>doing</p>

            <p>{selectedStatus === "doing" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("completed")}
            className="flex justify-between"
          >
            <p>completed</p>

            <p>{selectedStatus === "completed" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("onhold")}
            className="flex justify-between"
          >
            <p>onhold</p>

            <p>{selectedStatus === "onhold" && <Check size={22} />}</p>
          </div>
        </div>
      )}
      {/* TEAMS MODAL */}
       {openModal === 4 && (
        <div className={`${styles.status_modal} mt-40`}>
          <p className="text-xs text-gray-500">Status</p>

          <div
            onClick={() => setSelectedStatus("todo")}
            className="mt-2 flex justify-between"
          >
            <p>todo</p>

            <p>{selectedStatus === "todo" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("doing")}
            className="flex justify-between"
          >
            <p>doing</p>

            <p>{selectedStatus === "doing" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("completed")}
            className="flex justify-between"
          >
            <p>completed</p>

            <p>{selectedStatus === "completed" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("onhold")}
            className="flex justify-between"
          >
            <p>onhold</p>

            <p>{selectedStatus === "onhold" && <Check size={22} />}</p>
          </div>
        </div>
      )}
      {/* LABEL MODAL */}
       {openModal === 5 && (
        <div className={`${styles.status_modal} mt-50`}>
          <p className="text-xs text-gray-500">Status</p>

          <div
            onClick={() => setSelectedStatus("todo")}
            className="mt-2 flex justify-between"
          >
            <p>todo</p>

            <p>{selectedStatus === "todo" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("doing")}
            className="flex justify-between"
          >
            <p>doing</p>

            <p>{selectedStatus === "doing" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("completed")}
            className="flex justify-between"
          >
            <p>completed</p>

            <p>{selectedStatus === "completed" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("onhold")}
            className="flex justify-between"
          >
            <p>onhold</p>

            <p>{selectedStatus === "onhold" && <Check size={22} />}</p>
          </div>
        </div>
      )}
      {/* REPORTER MODAL */}
       {openModal === 6 && (
        <div className={`${styles.status_modal} mt-60`}>
          <p className="text-xs text-gray-500">Status</p>

          <div
            onClick={() => setSelectedStatus("todo")}
            className="mt-2 flex justify-between"
          >
            <p>todo</p>

            <p>{selectedStatus === "todo" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("doing")}
            className="flex justify-between"
          >
            <p>doing</p>

            <p>{selectedStatus === "doing" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("completed")}
            className="flex justify-between"
          >
            <p>completed</p>

            <p>{selectedStatus === "completed" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("onhold")}
            className="flex justify-between"
          >
            <p>onhold</p>

            <p>{selectedStatus === "onhold" && <Check size={22} />}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
