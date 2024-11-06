import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCalendarMinusFill, BsTerminalFill } from 'react-icons/bs';
import { FaComment, FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineAttachFile } from 'react-icons/md';
import FileModal from './FileModal';

interface CardProps {
  taskName: string;
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
  taskName,
  images,
  commentCount,
  dueDate,
  progress,
  taskId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<FileData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const maxVisibleImages = 3;
  const additionalImagesCount = images.length - maxVisibleImages;

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8880/api/v1/attachment/${taskId}`);
      const attachments = response.data.data.attachments.map((file: any) => ({
        originalName: file.originalName,
        extension: file.extension,
        filePath: file.filePath || "",
      }));
      setData(attachments);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <div>Loading files...</div>;
  }

  return (
    <div className="bg-white rounded-md shadow p-4 space-y-4 w-full">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2 items-center">
          <img src={images[0]} alt="User" className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-gray-800 text-sm">{taskName}{taskId}</span>
        </div>
      </div>

      {/* Comment and Progress Section */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BsTerminalFill className="text-gray-400" />
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur...</p>
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

        {additionalImagesCount > 0 && (
          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
            <span className="text-gray-600 text-sm p-3">+{additionalImagesCount}</span>
          </div>
        )}

        <div className="flex items-center space-x-1">
          <FaComment className="text-gray-400 text-sm" />
          <span className="text-sm text-gray-600">{commentCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MdOutlineAttachFile
            className="text-gray-400 text-sm font-bold cursor-pointer"
            onClick={openModal}
          />
          <span className="text-sm text-gray-600">{data.length}</span>
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
        refetchData={fetchFiles}  // Pass refetch function to FileModal
      />
    </div>
  );
};

export default Card;
