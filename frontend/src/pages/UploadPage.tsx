// src/pages/UploadPage.tsx
import React from "react";
import FileDropzone from "../components/FileDropzone";
import ExampleJson from "../components/ExampleJson";
import { useFileUploader } from "../hooks/useFileUploader";
import { Loader2 } from "lucide-react";

const UploadPage: React.FC = () => {
  const { sendFile, isLoading, isError } = useFileUploader();

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target ? JSON.parse(e.target.result as string) : null;
      if (content){
				sendFile(content);
			}
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gray-100">
      <p className="relative bg-gradient-to-b from-blue-200 to-blue-700 bg-clip-text pb-4 text-4xl font-bold text-transparent sm:text-5xl">
        JSON Messages Analyser
      </p>
      <FileDropzone handleFileUpload={handleFileUpload} isError={isError} />
      {isLoading && (
        <p className="flex items-center gap-2 z-1000 text-lg text-gray-700 mt-4">
          Uploading <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </p>
      )}
      <ExampleJson />
    </div>	
  );
};

export default UploadPage;
