/**
 * TaskListMockup Component - Framer-Style Task List UI
 *
 * A mockup showing a task list interface with MimiCheck-specific
 * Förderungen like Wohngeld, BAföG, and Kindergeld.
 *
 * Requirements: 5.2
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  Home,
  GraduationCap,
  Baby,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { UIMockup } from "./UIMockup";

export interface TaskItem {
  id: string;
  icon: "home" | "graduation" | "baby" | "file";
  title: string;
  subtitle: string;
  status: "pending" | "done" | "progress" | "waiting";
}

export interface TaskListMockupProps {
  /** Custom tasks to display (optional) */
  tasks?: TaskItem[];
  /** Additional CSS classes */
  className?: string;
}

// Icon mapping
const iconMap = {
  home: Home,
  graduation: GraduationCap,
  baby: Baby,
  file: FileText,
};

// Status configurations
const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    label: "Ausstehend",
  },
  done: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    label: "Erledigt",
  },
  progress: {
    icon: AlertCircle,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    label: "In Bearbeitung",
  },
  waiting: {
    icon: Clock,
    color: "text-slate-400",
    bg: "bg-slate-400/10",
    label: "Wartet",
  },
};

// Default MimiCheck-specific tasks
const defaultTasks: TaskItem[] = [
  {
    id: "1",
    icon: "home",
    title: "Wohngeld",
    subtitle: "Antrag auf Wohngeld für 2024",
    status: "done",
  },
  {
    id: "2",
    icon: "graduation",
    title: "BAföG",
    subtitle: "Folgeantrag Wintersemester",
    status: "progress",
  },
  {
    id: "3",
    icon: "baby",
    title: "Kindergeld",
    subtitle: "Erstantrag für Neugeborenes",
    status: "pending",
  },
  {
    id: "4",
    icon: "file",
    title: "Elterngeld",
    subtitle: "Antrag auf Elterngeld Plus",
    status: "waiting",
  },
];

/**
 * TaskListMockup - Task list interface mockup
 */
export default function TaskListMockup({
  tasks = defaultTasks,
  className = "",
}: TaskListMockupProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"all" | "waiting">("all");

  // Filter tasks based on active tab
  const filteredTasks =
    activeTab === "all"
      ? tasks
      : tasks.filter(t => t.status === "waiting" || t.status === "pending");

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <UIMockup title="MimiCheck Tasks" className={className}>
      <div className="p-4">
        {/* Tab Bar */}
        <div className="flex gap-1 p-1 mb-4 bg-slate-800/50 rounded-lg">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === "all"
                ? "bg-slate-700 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Alle Aufgaben
          </button>
          <button
            onClick={() => setActiveTab("waiting")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === "waiting"
                ? "bg-slate-700 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Wartet auf Freigabe
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {filteredTasks.map((task, index) => {
            const IconComponent = iconMap[task.icon];
            const status = statusConfig[task.status];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={task.id}
                custom={index}
                variants={prefersReducedMotion ? undefined : itemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/60 transition-all duration-200 cursor-pointer group"
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg ${status.bg} flex items-center justify-center`}
                >
                  <IconComponent className={`w-5 h-5 ${status.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors">
                    {task.title}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">
                    {task.subtitle}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="flex-shrink-0 flex items-center gap-1.5">
                  <StatusIcon className={`w-4 h-4 ${status.color}`} />
                  <span
                    className={`text-xs font-medium ${status.color} hidden sm:inline`}
                  >
                    {status.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div className="mt-4 pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs text-slate-400">
          <span>
            {tasks.filter(t => t.status === "done").length} von {tasks.length}{" "}
            erledigt
          </span>
          <span className="text-emerald-400 font-medium">
            {Math.round(
              (tasks.filter(t => t.status === "done").length / tasks.length) *
                100
            )}
            % abgeschlossen
          </span>
        </div>
      </div>
    </UIMockup>
  );
}

// Named export
export { TaskListMockup };
