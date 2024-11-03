// src/hooks/useFileUploader.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useFileUploader = () => {
  const [status, setStatus] = useState({ isLoading: false, isError: false });
  const { toast } = useToast();
  const navigate = useNavigate();

  const sendFile = async (content: unknown) => {
    setStatus({ isLoading: true, isError: false });
    try {
      const response = await fetch("http://localhost:8000/v1/chat/analyse/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      navigate("/results", { state: { resultData: data } });
			
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An error occurred while uploading the file.",
      });
      setStatus({ isLoading: false, isError: true });
    } finally {
      setStatus((prev) => ({ ...prev, isLoading: false }));
    }
  };
	
  return { sendFile, ...status };
};
