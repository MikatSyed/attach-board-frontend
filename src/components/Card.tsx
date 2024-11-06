import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCalendarMinusFill } from 'react-icons/bs';
import { FaComment, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

import FileModal from './FileModal';
import { PiNotebookFill } from 'react-icons/pi';


interface CardProps {
  clientName: string;
  assignedTo: string;
  images: string[];
  commentCount: number;
  dueDate: string;
  progress: string;
  taskId: string;
}

interface FileData {
  originalName: string;
  extension: string;
  filePath: string;
}

const Card: React.FC<CardProps> = ({
  clientName,
  assignedTo,
  images,
  commentCount,
  dueDate,
  progress,
  taskId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<FileData[]>([]);



  const maxVisibleImages = 3;


  const fetchFiles = async () => {
   
    try {
      const response = await axios.get(`https://attach-board-backend.vercel.app/api/v1/attachment/${taskId}`);
      const attachments = response.data.data.attachments.map((file: any) => ({
        originalName: file.originalName,
        extension: file.extension,
        filePath: file.filePath || "",
      }));
      setData(attachments);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
     
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  return (
   <>
    
    <div className="bg-white rounded-md shadow p-4 space-y-4 w-full">
     
     <div className="flex justify-between mb-4">
       <div className="flex space-x-2 items-center">
         <img src={images[0]} alt="User" className="w-8 h-8 rounded-full" />
         <span className="font-semibold text-gray-800 text-sm">{clientName}</span>
       </div>
       <div className="flex space-x-2 items-center">
         <img src={images[1]} alt="User" className="w-8 h-8 rounded-full" />
         <span className="font-semibold text-gray-800 text-sm">{assignedTo}</span>
       </div>
     
     </div>

   
     <div className="flex justify-between mb-4">
       <div className="flex items-center space-x-2">
         <PiNotebookFill className="text-gray-400" />
         <p className="text-sm text-gray-600">Lorem ipsum dolor sit  consectetur...</p>
       </div>
       <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md text-sm">
         <BsCalendarMinusFill className="text-gray-600" />
         <span className="font-semibold text-gray-700">{progress}</span>
       </div>
     </div>


     <div className="flex items-center space-x-2 justify-between">
       {images.slice(0, maxVisibleImages).map((imagePath, index) => (
         <img key={index} src={imagePath} alt={`User ${index}`} className="w-8 h-8 rounded-full" />
       ))}

      
         <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
           <span className="text-gray-600 text-sm p-4">12+</span>
         </div>
     

       <div className="flex items-center space-x-1">
         <FaComment className="text-gray-400 text-sm" />
         <span className="text-sm text-gray-600">{commentCount}</span>
       </div>
       <div className="flex items-center space-x-1">
         <FaFileAlt
           className="text-gray-400  text-sm font-bold cursor-pointer"
           onClick={openModal}
         />
         <span className=" text-sm text-gray-600">{data.length}</span>
       </div>
       <div className="flex items-center justify-end space-x-1">
         <FaCalendarAlt className="text-gray-400 text-sm" />
         <span className="text-sm text-gray-600">{dueDate}</span>
       </div>
     </div>

     <FileModal
       isOpen={isModalOpen}
       onRequestClose={closeModal}
       taskId={taskId}
       data={data} 
       refetchData={fetchFiles}  
     />
   </div>
   </>
  );
};

export default Card;
