import React from 'react';
import Column from './Column';
import { FaCheckCircle, FaClipboardList, FaHourglassStart, FaSearch, FaExclamationTriangle, FaCheck } from 'react-icons/fa';

let taskIdCounter = 1;

const columnsData = [
  { 
    title: 'Incomplete', 
    icon: <FaHourglassStart />, 
    colorClass: 'text-yellow-500', 
    tasks: Array(15).fill(0).map((_, i) => ({
      taskId: `inc-${taskIdCounter++}`, 
      clientName: `Olivia Roberts`,
      assignedTo: `Alex Johnson`, 
      images: ["/assets/photo-1.jpg", "/assets/photo-2.webp"],
      commentCount: 12,
      fileCount: 32,
      dueDate: '2023-11-06',
      progress: `1/${i + 2}`,
    }))
  },
  { 
    title: 'To Do', 
    icon: <FaClipboardList />,
    colorClass: 'text-blue-500', 
    tasks: Array(15).fill(0).map((_, i) => ({
      taskId: `todo-${taskIdCounter++}`, 
      clientName: `Ethan Williams`, 
      assignedTo: `Jessica Lee`, 
      images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
      commentCount: 8,
      fileCount: 15,
      dueDate: '2023-11-07',
      progress: `1/${i + 2}`,
    }))
  },
  { 
    title: 'Doing', 
    icon: <FaCheckCircle />, 
    colorClass: 'text-green-500',
    tasks: Array(15).fill(0).map((_, i) => ({
      taskId: `doing-${taskIdCounter++}`, 
      clientName: `Sophia Martinez`, 
      assignedTo: `Michael Smith`, 
      images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
      commentCount: 6,
      fileCount: 20,
      dueDate: '2023-11-08',
      progress: `1/${i + 2}`,
    }))
  },
  { 
    title: 'Under Review', 
    icon: <FaSearch />, 
    colorClass: 'text-gray-500',
    tasks: Array(12).fill(0).map((_, i) => ({
      taskId: `ur-${taskIdCounter++}`, 
      clientName: `James Anderson`, 
      assignedTo: `Emily Davis`, 
      images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
      commentCount: 3,
      fileCount: 8,
      dueDate: '2023-11-09',
      progress: `1/${i + 2}`,
    }))
  },
  { 
    title: 'Completed', 
    icon: <FaCheck />, 
    colorClass: 'text-teal-500',
    tasks: Array(8).fill(0).map((_, i) => ({
      taskId: `com-${taskIdCounter++}`, 
      clientName: `Ava Thompson`, 
      assignedTo: `David Brown`, 
      images: ["/assets/photo-11.jpg", "/assets/photo2.jfif"],
      commentCount: 1,
      fileCount: 5,
      dueDate: '2023-11-10',
      progress: `1/${i + 2}`,
    }))
  },
  { 
    title: 'OverDue', 
    icon: <FaExclamationTriangle />, 
    colorClass: 'text-red-500',
    tasks: Array(10).fill(0).map((_, i) => ({
      taskId: `od-${taskIdCounter++}`, 
      clientName: `Mason Wilson`, 
      assignedTo: `Sophia Wilson`, 
      images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
      commentCount: 10,
      fileCount: 15,
      dueDate: '2023-11-11',
      progress: `1/${i + 2}`,
    }))
  },
];

const Board: React.FC = () => (
  <div className="overflow-x-auto horizontal-scroll p-4 bg-white w-full rounded-md">
    <div className="flex space-x-4 min-w-max">
      {columnsData.map((col, index) => (
        <Column 
          key={index} 
          title={col.title} 
          tasks={col.tasks} 
          icon={col.icon} 
          colorClass={col.colorClass} 
        />
      ))}
    </div>
  </div>
);

export default Board;
