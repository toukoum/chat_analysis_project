// src/pages/UploadPage.tsx
import React, { useState } from "react";
import FileDropzone from "../components/FileDropzone";
import ExampleJson from "../components/ExampleJson";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react";


const UploadPage: React.FC = () => {
	const { toast } = useToast()
  const navigate = useNavigate();
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);


	// Function for handling file upload
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target) {
        const content = JSON.parse(e.target.result as string);
        sendFile(content);
      }
    };
    reader.readAsText(file);
  };

  const sendFile = async (content: Record<string, any>) => {
		setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/v1/chat/analyse/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du fichier");
      }

      const data = await response.json();
      navigate("/results", { state: { resultData: data } });

    } catch (error) {
      console.error("Error : ", error);
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description: "An error occurred while uploading the file.",
			})
			setIsError(true)
    } finally {
			setIsLoading(false);
		}
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gray-100">
      <p className="relative bg-gradient-to-b from-blue-200 to-blue-700 bg-clip-text pb-4 text-4xl font-bold text-transparent sm:text-5xl">
        JSON Chat Analyser
      </p>
      <FileDropzone onFileUpload={handleFileUpload} isError={isError} />
			{isLoading && <p className="flex items-center gap-2 z-1000 text-lg text-gray-700 mt-4">Uploading <Loader2 className="mr-2 h-4 w-4 animate-spin" /></p>}
			<ExampleJson />
    </div>
  );
};

export default UploadPage;
