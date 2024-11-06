// src/components/FileModal.tsx
import React, { ChangeEvent } from 'react';
import Modal from 'react-modal';

interface FileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  staticFiles: { name: string; extension: string }[];
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedFiles: FileList | null;
}

const FileModal: React.FC<FileModalProps> = ({
  isOpen,
  onRequestClose,
  staticFiles,
  onFileUpload,
  selectedFiles,
}) => {
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
  className="absolute top-2 right-2  text-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-blue-700 transition-all" 
>
  <span className="text-2xl font-bold">×</span>
</button>


        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Files</h2>

        
        <div className="space-y-4">
          <div className="text-sm">
            <h3 className="font-semibold text-gray-700">Attached Files:</h3>
            <ul className="space-y-4">
              {staticFiles.map((file, index) => (
                <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{file.name}</span>
                    <span className="text-xs text-gray-500">{file.extension}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

       
          <div>
            <h3 className="font-semibold text-gray-700">Upload New Attachments</h3>
            <input
              type="file"
              multiple
              onChange={onFileUpload}
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

        {/* Action Buttons */}
        <div className="flex justify-start space-x-4 mt-6">
          <button
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onRequestClose} // Placeholder for uploading functionality
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
