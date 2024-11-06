// src/components/Column.tsx
import React from 'react';
import Card from './Card';

interface ColumnProps {
  title: string;
  tasks: { taskName: string; images: string[]; commentCount: number; fileCount: number; dueDate: string; progress: string }[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => (
  <div className="w-72 bg-gray-100 rounded-md  shadow-lg min-w-[420px] "> 
    <h2 className="text-xl font-semibold mb-4 text-gray-700 p-4">{title}</h2>
    <div className="space-y-4 max-h-[500px] px-4 overflow-y-auto custom-scrollbar"> 
      {tasks.map((task, index) => (
        <Card 
          key={index} 
          taskName={task.taskName} 
          images={task.images} 
          commentCount={task.commentCount} 
          fileCount={task.fileCount} 
          dueDate={task.dueDate} 
          progress={task.progress} 
        />
      ))}
    </div>
  </div>
);

export default Column;
