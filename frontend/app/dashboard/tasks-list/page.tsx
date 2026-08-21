"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Circle,
  Columns3,
  Dot,
  Funnel,
  Grid2x2,
  Menu,
  MoreHorizontal,
  Search,
  Signal,
  Tag,
  UserRound,
  Users,
  UsersRound,
  X,
} from "lucide-react";

import styles from "../tasks/tasks.module.css";
import CalendarStyles from "../tasks/dueDate.module.css";
import FieldsStyles from "../tasks/fieldsModal.module.css";
import DashboardLayout from "../page";
import taskListStyles from "./taskList.module.css";
import { getLocalStorage } from "@/app/lib/LocalStorage";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

type CardTask = {
  _id: string;
  TaskTitle?: string;
  priority?: string;
  members?: string[];
  dueDate?: string;
  status: "todo" | "doing" | "completed" | "onhold";
};

type Column = {
  id: Task["status"];
  title: string;
};

type ModalItem = {
  icon: ReactNode;
  text: string;
};

const columns: Column[] = [
  { id: "todo", title: "To Do" },
  { id: "doing", title: "Doing" },
  { id: "completed", title: "Completed" },
  { id: "onhold", title: "On Hold" },
];

const modalItems: ModalItem[] = [
  { icon: <Circle />, text: "Status" },
  { icon: <Signal />, text: "Priority" },
  { icon: <UsersRound />, text: "Members" },
  { icon: <CalendarDays />, text: "Due Date" },
  { icon: <Users />, text: "Teams" },
  { icon: <Tag />, text: "Labels" },
  { icon: <UserRound />, text: "Reporter" },
];


// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TaskList() {
  const [cardData, setCardData] = useState<CardTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [workSpaceOpen, setWorkSpaceOpen] = useState(true);
  // modal state
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("todo");
  const [selectedPriority, setSelectedPriority] = useState("noPriority");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>(
    undefined,
  );
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
  const [selectedReporter, setSelectedReporter] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  // fields state
  const [openFields, setOpenFields] = useState(false);
  const [checkPriority, setCheckPriority] = useState(false);
  const [checkMembers, setCheckMembers] = useState(false);
  const [checkDueDate, setCheckDueDate] = useState(false);
  const [checkLabels, setCheckLabels] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [checkReporter, setCheckReporter] = useState(false);
  const [checkTeams, setCheckTeams] = useState(false);

  // USER DATA
  const userData = getLocalStorage("guestLogin") as { _id?: string };
  const payload = {
    TaskTitle: taskTitle.trim(),
    priority: selectedPriority,
    status: selectedStatus,
    dueDate: selectedDueDate,
    members: selectedMember ? [selectedMember] : [],
    labels: selectedLabel ? [selectedLabel] : [],
    reporter: userData?._id,
    teams: selectedTeam ? [selectedTeam] : [],
  };

  useEffect(() => {
    fetchData();
  }, []);
  //------------------------------------------------------------------
  //GET CARD DATA FUNCTION
  //------------------------------------------------------------------

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      setCardData(res.data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };
  //------------------------------------------------------------------
  //POST CARD DATA FUNCTION
  //------------------------------------------------------------------



  const postData = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, payload);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="overflow-x-auto pb-5 box-border">
        {/* TASKS HEADER */}
        <div
          className={`${styles.task_header} bg-white fixed pr-70 w-full top-15 mb-5 z-20 flex items-center justify-between px-5`}
        >
          <div className="text-1xs font-bold">Projects</div>

          <div className={`${styles.task_head_right} flex`}>
            <div className="flex gap-2">
              <div className={styles.search_div}>
                <Search className={styles.task_head_icon} />
              </div>
            </div>

            <div
              onClick={() => {
                setOpenFields(!openFields);
                setShowAddTask(false);
              }}
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
                onClick={() => {
                  setShowAddTask(!showAddTask);
                  setOpenFields(false);
                }}
                className={`${styles.task_head_btn} bg-black text-white`}
              >
                <span>+</span> Add Task
              </button>
            </div>
          </div>
        </div>

        {/* BOARD */}
        <div
          className={`${taskListStyles["column-outer"]} flex min-w-max gap-4 mt-20`}
        >
          {loading ? (
            <div className="p-4 text-sm text-gray-500">Loading tasks...</div>
          ) : (
            columns.map((column) => {
              const columnTasks = cardData.filter(
                (task) => task.status === column.id,
              );

              return (
                <div
                  key={column.id}
                  className={`${taskListStyles["column-tasks"]} shrink-0 rounded-lg`}
                >
                  {/* COLUMN HEADER */}
                  <div className=" flex items-center justify-between ">
                    <div>
                      <h2 className=" font-semibold text-xs text-gray-800 mb-3">
                        {column.title}
                      </h2>
                      {/* COLUMN TASK HEADER */}
                      <div
                        className={`${taskListStyles["column-task-header-outer"]}`}
                      >
                        <div
                          className={`${taskListStyles["column-task-header"]}  `}
                        >
                          <div
                            className={`${taskListStyles["column-task-cell-1"]} ${taskListStyles["column-task-cell-text"]}`}
                          >
                            Task
                          </div>
                          <div
                            className={`${taskListStyles["column-task-cell"]} ${taskListStyles["column-task-cell-text"]}`}
                          >
                            Priority
                          </div>
                          <div
                            className={`${taskListStyles["column-task-cell"]} ${taskListStyles["column-task-cell-text"]}`}
                          >
                            Members
                          </div>
                          <div
                            className={`${taskListStyles["column-task-cell"]} ${taskListStyles["column-task-cell-text"]}`}
                          >
                            Due Date
                          </div>
                          <div
                            className={`${taskListStyles["column-task-cell"]} ${taskListStyles["column-task-cell-text"]}`}
                          >
                            Actions
                          </div>
                        </div>
                        {/* CARDS */}
                        <div className="flex flex-col">
                          {columnTasks.map((task) => (
                            <div
                              key={task._id}
                              className={`${taskListStyles["card-outer"]}`}
                            >
                              <div
                                className={`${taskListStyles["column-task-cell-1"]}`}
                              >
                                {task?.TaskTitle}
                              </div>
                              <div
                                className={`${taskListStyles["column-task-cell"]}`}
                              >
                                {task?.priority}
                              </div>
                              <div
                                className={`${taskListStyles["column-task-cell"]}`}
                              >
                                {task?.members}
                              </div>
                              <div
                                className={`${taskListStyles["column-task-cell"]}`}
                              >
                                {" "}
                                {task.dueDate
                                  ? new Date(task.dueDate).toLocaleDateString(
                                      "en-GB",
                                      {
                                        year: "numeric",
                                        day: "2-digit",
                                        month: "short",
                                      },
                                    )
                                  : "No date"}
                              </div>
                              <div
                                className={`${taskListStyles["column-task-cell"]}`}
                              >
                                <MoreHorizontal />
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* ADD TASK */}
                        <button
                          onClick={() => {
                            
                            setShowAddTask(!showAddTask);
                          
                          }}
                          type="button"
                          className="mt-3 w-full rounded-lg px-2 py-2 text-left text-sm text-gray-600 hover:bg-gray-200"
                        >
                          + Add Task
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ADD TASK MODAL */}
      {showAddTask && (
        <div className={styles.modal_outer}>
          <div
            onClick={() => setShowAddTask(false)}
            className="flex justify-end p-2 cursor-pointer"
          >
            {" "}
            <X size={14} />
          </div>
          <div className={styles.modal_box}>
            <input
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="Task Title"
              className="mb-3"
            />
            {modalItems.map((item, index) => {
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
          <div
            onClick={() => {
              postData();
              setShowAddTask(!showAddTask);
              setOpenModal(null);
            }}
            className="flex justify-center w-[100%] cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
          >
            {" "}
            <button className="btn">Add</button>
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
            <p className={styles.subModal_text}>todo</p>

            <p>{selectedStatus === "todo" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("doing")}
            className="flex justify-between"
          >
            <p className={styles.subModal_text}>doing</p>

            <p>{selectedStatus === "doing" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("completed")}
            className="flex justify-between"
          >
            <p className={styles.subModal_text}>completed</p>

            <p>{selectedStatus === "completed" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedStatus("onhold")}
            className="flex justify-between"
          >
            <p className={styles.subModal_text}>onhold</p>

            <p>{selectedStatus === "onhold" && <Check size={22} />}</p>
          </div>
        </div>
      )}

      {/* PRIORITY MODAL */}
      {openModal === 1 && (
        <div className={`${styles.status_modal} mt-9`}>
          <p className="text-xs text-gray-500">Priority</p>
          <div
            onClick={() => setSelectedPriority("noPriority")}
            className="mt-2 flex justify-between"
          >
            <p className={styles.subModal_text}>
              <span className="w-[20px]">
                <Dot size={15} />
              </span>
              <span className="ms-2">No Priority</span>
            </p>

            <p>{selectedPriority === "noPriority" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedPriority("urgent")}
            className="mt-2 flex justify-between"
          >
            <p className={styles.subModal_text}>
              <span className="w-[20px]">
                <Signal color="red" size={19} />
              </span>
              <span className="ms-2">Urgent</span>
            </p>

            <p>{selectedPriority === "urgent" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedPriority("high")}
            className="flex justify-between"
          >
            <p className={styles.subModal_text}>
              <span className="w-[20px]">
                <Signal color="red" size={19} />
              </span>
              <span className="ms-2">High</span>
            </p>

            <p>{selectedPriority === "high" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedPriority("medium")}
            className="flex justify-between"
          >
            <p className={styles.subModal_text}>
              <span className="w-[20px]">
                <Signal color="red" size={19} />
              </span>
              <span className="ms-2">Medium</span>
            </p>

            <p>{selectedPriority === "medium" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedPriority("low")}
            className="flex justify-between"
          >
            <p className={styles.subModal_text}>
              <span className="w-[20px]">
                <Signal color="gray" size={10} />
              </span>
              <span className="ms-2">Low</span>
            </p>

            <p>{selectedPriority === "low" && <Check size={22} />}</p>
          </div>
        </div>
      )}

      {/* MEMBERS MODAL */}
      {openModal === 2 && (
        <div className={`${styles.status_modal} mt-20`}>
          <p className="text-xs text-gray-500">Members</p>

          <div
            onClick={() => setSelectedMember("")}
            className="mt-2 flex justify-between"
          >
            <p className={styles.subModal_text}>Guest User</p>

            <p>{selectedMember === userData?._id && <Check size={22} />}</p>
          </div>
        </div>
      )}
      {/* DUE DATE MODAL */}
      {openModal === 3 && (
        <div className={`${CalendarStyles.date_modal} mt-30`}>
          <DayPicker
            mode="single"
            selected={selectedDueDate}
            onSelect={(date) => {
              setSelectedDueDate(date);
              setOpenModal(null);
            }}
            className={CalendarStyles.calendar}
            classNames={{
              months: CalendarStyles.months,
              month: CalendarStyles.month,
              month_caption: CalendarStyles.month_caption,
              caption_label: CalendarStyles.caption_label,
              nav: CalendarStyles.nav,
              button_previous: CalendarStyles.nav_button,
              button_next: CalendarStyles.nav_button,
              month_grid: CalendarStyles.month_grid,
              weekdays: CalendarStyles.weekdays,
              weekday: CalendarStyles.weekday,
              week: CalendarStyles.week,
              day: CalendarStyles.day,
              day_button: CalendarStyles.day_button,
              selected: CalendarStyles.selected,
              today: CalendarStyles.today,
              outside: CalendarStyles.outside,
            }}
          />

          {selectedDueDate && (
            <p className="mt-1 text-center text-[11px] text-gray-500">
              {format(selectedDueDate, "dd MMM yyyy")}
            </p>
          )}
        </div>
      )}
      {/* TEAMS MODAL */}
      {openModal === 4 && (
        <div className={`${styles.status_modal} mt-40`}>
          <p className="text-xs text-gray-500">Team</p>
          <div
            onClick={() => setSelectedTeam("abc")}
            className="mt-2 flex justify-between"
          >
            <p className={styles.subModal_text}>Guest Team</p>
            <p>{selectedTeam === "abc" && <Check size={22} />}</p>
          </div>
        </div>
      )}
      {/* LABEL MODAL */}
      {openModal === 5 && (
        <div className={`${styles.status_modal} mt-50`}>
          <p className="text-xs text-gray-500">Label</p>
          <div
            onClick={() => setSelectedLabel("deployment")}
            className="mt-2 flex justify-between"
          >
            <p className={styles.subModal_text}>deployment</p>
            <p>{selectedLabel === "deployment" && <Check size={22} />}</p>
          </div>
          <div
            onClick={() => setSelectedLabel("design")}
            className="flex justify-between"
          >
            <p className={styles.subModal_text}>Design</p>

            <p>{selectedLabel === "design" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedLabel("audit")}
            className="flex justify-between"
          >
            <p className={styles.subModal_text}>Audit</p>

            <p>{selectedLabel === "audit" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedLabel("scheduled")}
            className="flex justify-between"
          >
            <p className={styles.subModal_text}>Scheduled</p>

            <p>{selectedLabel === "scheduled" && <Check size={22} />}</p>
          </div>
        </div>
      )}
      {/* REPORTER MODAL */}
      {openModal === 6 && (
        <div className={`${styles.status_modal} mt-60`}>
          <p className="text-xs text-gray-500">Reporter</p>

          <div
            onClick={() => setSelectedReporter("admin")}
            className="mt-2 flex justify-between"
          >
            <p>admin</p>

            <p>{selectedReporter === "admin" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedReporter("abc")}
            className="flex justify-between"
          >
            <p>abc</p>

            <p>{selectedReporter === "abc" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedReporter("aaa")}
            className="flex justify-between"
          >
            <p>aaa</p>

            <p>{selectedReporter === "aaa" && <Check size={22} />}</p>
          </div>

          <div
            onClick={() => setSelectedReporter("xyz")}
            className="flex justify-between"
          >
            <p>xyz</p>

            <p>{selectedReporter === "xyz" && <Check size={22} />}</p>
          </div>
        </div>
      )}

      {/* fields Modal */}
      {openFields && (
        <div className={`${FieldsStyles.fields_modal}  bg-white`}>
          <div className={FieldsStyles.fields_modal_header}>
            <div className={FieldsStyles.fields_modal_header_div1}>
              {" "}
              <Menu size={18} />
              <span>
                <Link href="/dashboard/tasks-list">List</Link>{" "}
              </span>
            </div>
            <div className={FieldsStyles.fields_modal_header_div2}>
              <Grid2x2 size={18} /> <span>Board</span>
            </div>
          </div>
          {/* priority */}
          <div
            onClick={() => setCheckPriority(!checkPriority)}
            className={`${FieldsStyles.fields_modal_body_outer} mt-3`}
          >
            <div className={FieldsStyles.fields_modal_body}>
              <div className={styles.subModal_text}>Priority</div>
              <div className={FieldsStyles.boards_check}>
                {checkPriority && (
                  <span className={FieldsStyles.check_icon}>
                    {" "}
                    <Check size={18} color="white" />
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* members */}
          <div
            onClick={() => setCheckMembers(!checkMembers)}
            className={FieldsStyles.fields_modal_body_outer}
          >
            <div className={FieldsStyles.fields_modal_body}>
              <div className={styles.subModal_text}>Members</div>
              <div className={FieldsStyles.boards_check}>
                {checkMembers && (
                  <span className={FieldsStyles.check_icon}>
                    {" "}
                    <Check size={18} color="white" />
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Duedate*/}
          <div
            onClick={() => setCheckDueDate(!checkDueDate)}
            className={FieldsStyles.fields_modal_body_outer}
          >
            <div className={FieldsStyles.fields_modal_body}>
              <div className={styles.subModal_text}>Due Date</div>
              <div className={FieldsStyles.boards_check}>
                {checkDueDate && (
                  <span className={FieldsStyles.check_icon}>
                    {" "}
                    <Check size={18} color="white" />
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Labels */}
          <div
            onClick={() => setCheckLabels(!checkLabels)}
            className={FieldsStyles.fields_modal_body_outer}
          >
            <div className={FieldsStyles.fields_modal_body}>
              <div className={styles.subModal_text}>Labels</div>
              <div className={FieldsStyles.boards_check}>
                {checkLabels && (
                  <span className={FieldsStyles.check_icon}>
                    {" "}
                    <Check size={18} color="white" />
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* status */}
          <div
            onClick={() => setCheckStatus(!checkStatus)}
            className={FieldsStyles.fields_modal_body_outer}
          >
            <div className={FieldsStyles.fields_modal_body}>
              <div className={styles.subModal_text}>Status</div>
              <div className={FieldsStyles.boards_check}>
                {checkStatus && (
                  <span className={FieldsStyles.check_icon}>
                    {" "}
                    <Check size={18} color="white" />
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* teams */}
          <div
            onClick={() => setCheckTeams(!checkTeams)}
            className={FieldsStyles.fields_modal_body_outer}
          >
            <div className={FieldsStyles.fields_modal_body}>
              <div className={styles.subModal_text}>Teams</div>
              <div className={FieldsStyles.boards_check}>
                {checkTeams && (
                  <span className={FieldsStyles.check_icon}>
                    {" "}
                    <Check size={18} color="white" />
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Reporter */}
          <div
            onClick={() => setCheckReporter(!checkReporter)}
            className={FieldsStyles.fields_modal_body_outer}
          >
            <div className={FieldsStyles.fields_modal_body}>
              <div className={styles.subModal_text}>Reporter</div>
              <div className={FieldsStyles.boards_check}>
                {checkReporter && (
                  <span className={FieldsStyles.check_icon}>
                    {" "}
                    <Check size={18} color="white" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}