// src/components/Board.tsx
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Column from './Column';

let taskIdCounter = 1;
// Example data for multiple columns
const columnsData = [
    { 
      title: 'Incomplete', 
      tasks: Array(25).fill(0).map((_, i) => ({
        taskId:  `inc-${taskIdCounter++}`, 
        taskName: `Task ${i + 1}`,
        images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
        commentCount: 12,
        fileCount: 32,
        dueDate: '2023-11-06',
        progress: `1/${i + 2}`,
      }))
    },
    { 
      title: 'To Do', 
      tasks: Array(25).fill(0).map((_, i) => ({
        taskId: `todo-${taskIdCounter++}`, 
        taskName: `Task ${i + 1}`,
        images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
        commentCount: 8,
        fileCount: 15,
        dueDate: '2023-11-07',
        progress: `2/3`,
      }))
    },
    { 
      title: 'Doing', 
      tasks: Array(25).fill(0).map((_, i) => ({
        taskId: `doing-${taskIdCounter++}`, 
        taskName: `Task ${i + 1}`,
        images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
        commentCount: 6,
        fileCount: 20,
        dueDate: '2023-11-08',
        progress: `1/2`,
      }))
    },
    { 
      title: 'Under Review', 
      tasks: Array(25).fill(0).map((_, i) => ({
        taskId: `ur-${taskIdCounter++}`, 
        taskName: `Task ${i + 1}`,
        images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
        commentCount: 3,
        fileCount: 8,
        dueDate: '2023-11-09',
        progress: `2/5`,
      }))
    },
    { 
      title: 'Completed', 
      tasks: Array(25).fill(0).map((_, i) => ({
        taskId: `com-${taskIdCounter++}`, 
        taskName: `Task ${i + 1}`,
        images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
        commentCount: 1,
        fileCount: 5,
        dueDate: '2023-11-10',
        progress: `5/5`,
      }))
    },
    { 
      title: 'OverDue', 
      tasks: Array(25).fill(0).map((_, i) => ({
        taskId: `od-${taskIdCounter++}`, 
        taskName: `Task ${i + 1}`,
        images: ["/assets/photo1.jfif", "/assets/photo2.jfif"],
        commentCount: 10,
        fileCount: 15,
        dueDate: '2023-11-11',
        progress: `3/6`,
      }))
    },
];

const Board: React.FC = () => (
  <div className="overflow-x-auto p-4 bg-white w-full custom-scrollbar">
    <div className="flex space-x-4 min-w-max ">
      {columnsData.map((col, index) => (
        <Column key={index} title={col.title} tasks={col.tasks} />
      ))}
    </div>
  </div>
);

export default Board;
