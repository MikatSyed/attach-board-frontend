// src/components/Card.tsx
import React from 'react';
import { BsCalendarMinusFill, BsTerminalFill } from 'react-icons/bs';
import { FaComment, FaCalendarAlt } from 'react-icons/fa';
import {  MdOutlineAttachFile } from 'react-icons/md';

interface CardProps {
  taskName: string;
  images: string[];
  commentCount: number;
  fileCount: number;
  dueDate: string;
  progress: string; 
}

const Card: React.FC<CardProps> = ({ taskName, images, commentCount, fileCount, dueDate, progress }) => {
  const maxVisibleImages = 3; 
  const additionalImagesCount = images.length - maxVisibleImages; 

  return (
    <div className="bg-white rounded-md shadow p-4 space-y-4 w-full">
    
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2 items-center">
          <img src={images[0]} alt="User" className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-gray-800 text-sm">{taskName}</span>
        </div>
        <div className="flex space-x-2 items-center">
          <img src={images[1]} alt="User" className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-gray-800 text-sm">{taskName}</span>
        </div>
      </div>

      
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BsTerminalFill className="text-gray-400" />
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit ametconsectetur...</p>
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
          <BsCalendarMinusFill className="text-gray-600" />
          <span className="font-semibold text-gray-700">{progress}</span>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex items-center space-x-4 justify-between">
        {images.slice(0, maxVisibleImages).map((imagePath, index) => (
          <img key={index} src={imagePath} alt={`User ${index}`} className="w-8 h-8 rounded-full" />
        ))}

      
      
          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
            <span className="text-gray-600 text-sm p-3">+{additionalImagesCount}</span>
          </div>
    

        <div className="flex items-center space-x-1">
          <FaComment className="text-gray-400 text-sm" />
          <span className="text-sm text-gray-600">{commentCount}</span>
        </div>

        <div className="flex items-center space-x-1">
          <MdOutlineAttachFile className="text-gray-400 text-sm font-bold" />
          <span className="text-sm text-gray-600">{fileCount}</span>
        </div>

        <div className="flex items-center justify-end space-x-1">
          <FaCalendarAlt className="text-gray-400 text-sm" />
          <span className="text-sm text-gray-600">{dueDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
