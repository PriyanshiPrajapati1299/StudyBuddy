import React, { useState } from 'react';

const Materials = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const newFile = {
        name: file.name,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toLocaleString(),
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedFile(null); 
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">Upload Study Materials</h2>

      {/* Upload section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <label className="block text-orange-600 font-medium mb-2">
          Upload PDF Notes:
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="w-full border border-orange-300 p-2 rounded-md mb-4"
        />
        <p className="text-sm text-gray-500">Only PDF files are allowed.</p>
      </div>

      {/* Uploaded Notes Section */}
      <div>
        <h3 className="text-xl font-semibold text-orange-600 mb-4">Uploaded Notes</h3>
        {uploadedFiles.length === 0 ? (
          <p className="text-gray-500">No study materials uploaded yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow border border-orange-100"
              >
                <h4 className="text-lg font-semibold text-orange-500 mb-1">{file.name}</h4>
                <p className="text-sm text-gray-500 mb-2">
                  Uploaded at: {file.uploadedAt}
                </p>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-600"
                >
                  View PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Materials;
