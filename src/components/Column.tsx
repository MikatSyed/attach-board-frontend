import React from 'react';
import Card from './Card';
import { FaSpinner } from 'react-icons/fa';

interface ColumnProps {
  title: string;
  icon: React.ReactNode;
  colorClass?: string;
  tasks: { 
    taskId: string; 
    clientName: string; 
    assignedTo: string; 
    images: string[]; 
    commentCount: number; 
    fileCount: number; 
    dueDate: string; 
    progress: string; 
  }[];
}

const Column: React.FC<ColumnProps> = ({ title, icon, colorClass, tasks }) => (
  <div className={`w-72 bg-gray-100 rounded-md shadow-lg min-w-[420px]`}>
    <div className="flex items-center mb-4 p-4">
      <span className={`mr-3 text-xl ${colorClass}`}>{icon}</span> 
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    </div>
    
   
    {tasks.length === 0 ? (
      <div className="flex items-center justify-center h-full">
        <FaSpinner className="animate-spin text-gray-500 text-4xl" />
      </div>
    ) : (
      <div className="space-y-4 max-h-[500px] px-4 overflow-y-auto custom-scrollbar">
        {tasks.map((task) => (
          <Card
            key={task.taskId} 
            taskId={task.taskId} 
            clientName={task.clientName}
            assignedTo={task.assignedTo}
            images={task.images}
            commentCount={task.commentCount}
            dueDate={task.dueDate}
            progress={task.progress}
          />
        ))}
      </div>
    )}
  </div>
);

export default Column;
