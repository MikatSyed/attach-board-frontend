import React, { ChangeEvent, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

interface FileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  taskId: string;
  data: FileData[];
  refetchData: () => void; // Add refetchData prop
}

interface FileData {
  originalName: string;
  extension: string;
  filePath: string;
}

const FileModal: React.FC<FileModalProps> = ({
  isOpen,
  onRequestClose,
  taskId,
  data,
  refetchData
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUploadFiles = async () => {
    if (selectedFiles) {
      const formData = new FormData();
      Array.from(selectedFiles).forEach(file => formData.append('attachments', file));
      formData.append('taskId', taskId);

      try {
        await axios.post('http://localhost:8880/api/v1/attachment/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        refetchData(); // Refetch files after successful upload
        onRequestClose(); // Close modal after successful upload
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="File Details"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg relative">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-blue-700 transition-all"
        >
          <span className="text-2xl font-bold">×</span>
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Attached Files</h2>

        <div className="space-y-4">
          {data.length > 0 ? (
            <ul className="space-y-4">
              {data.map((file, index) => (
                <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{file.originalName}</span>
                    <span className="text-xs text-gray-500">{file.extension}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a href={file.filePath} className="text-blue-600 hover:text-blue-800 text-sm" target="_blank" rel="noopener noreferrer">
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No files attached.</p>
          )}

          <div>
            <h3 className="font-semibold text-gray-700">Upload New Attachments</h3>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="mt-3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            {selectedFiles && (
              <div className="mt-4 text-sm text-gray-600">
                <strong>Selected Files:</strong>
                <ul className="space-y-1">
                  {Array.from(selectedFiles).map((file, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-gray-800">{file.name}</span>
                      <span className="text-xs text-gray-500">{file.type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-start space-x-4 mt-6">
          <button
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUploadFiles}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FileModal;
