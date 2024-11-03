// src/components/FileDropzone.tsx
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { CirclePlus } from "lucide-react";

interface FileDropzoneProps {
  handleFileUpload: (file: File) => void;
  isError?: boolean;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ handleFileUpload, isError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const handleFile = (file: File | null) => {
    if (file?.type === "application/json") {
      handleFileUpload(file);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a valid JSON file.",
      });
    }
  };

  useEffect(() => {
    if (isError && inputRef.current) inputRef.current.value = "";
  }, [isError]);

  return (
    <div className="flex items-center justify-center">
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`w-full max-w-lg p-6 border-2 border-dashed ${isDragging ? "border-blue-500" : "border-gray-300"} rounded-lg shadow-md flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer`}
      >
        {isError && <p className="text-lg text-red-400">An error occurred while uploading the file. Try again</p>}
        <p className="text-lg mb-5">{isDragging ? "Drop your JSON file here" : "Drag and drop your JSON file here or click to select a file"}</p>
        <Button>Upload JSON File <CirclePlus /></Button>
        <input ref={inputRef} type="file" accept=".json" onChange={(e) => handleFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default FileDropzone;
