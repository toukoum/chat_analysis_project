import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileDropzoneProps {
	onFileUpload: (file: File) => void;
	isError?: boolean;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileUpload, isError }) => {
	const [isDragging, setIsDragging] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { toast } = useToast();

	const handleFile = (file: File | null) => {
		if (file && file.type === "application/json") {
			onFileUpload(file);
		} else {
			toast({
				variant: "destructive",
				title: "Invalid file type",
				description: "Please upload a valid JSON file.",
			});
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		handleFile(e.dataTransfer.files[0]);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleFile(e.target.files?.[0] || null);
	};

	return (
		<div className="flex items-center justify-center">
			<div
				onClick={() => inputRef.current?.click()}
				onDrop={handleDrop}
				onDragOver={(e) => {
					e.preventDefault();
					setIsDragging(true);
				}}
				onDragLeave={() => setIsDragging(false)}
				className={`w-full max-w-lg p-6 border-2 border-dashed transition-border-color duration-75 ease-in-out ${isDragging ? "border-blue-500" : "border-gray-300"} rounded-lg shadow-md flex flex-col items-center justify-center text-center text-gray-500 hover:cursor-pointer`}>
				
				{isError ? (
					<p className="text-lg text-red-400">
						An error occurred while uploading the file. Try again<br />
					</p>
				) : null}

				<p className="text-lg mb-5">
					{isDragging ? "Drop your JSON file here" : "Drag and drop your JSON file here or click to select a file"}
				</p>
				<Button>Upload JSON File</Button>
				<input
					ref={inputRef}
					type="file"
					accept=".json"
					onChange={handleFileChange}
					style={{ display: "none" }}
				/>
			</div>
		</div>
	);
};

export default FileDropzone;
