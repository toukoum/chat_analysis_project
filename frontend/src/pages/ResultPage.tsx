import IntentChart from "@/components/IntentChart";
import LangChart from "@/components/LangChart";
import ToxicityChart from "@/components/ToxicityChart";
import { Button } from "@/components/ui/button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const resultData = location.state?.resultData;
	


	if (!resultData) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<p className="text-2xl font-bold text-red-500">No data to display.</p>

			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<p className="text-3xl font-bold mb-4">Analysis Results</p>
			<div className="p-6 bg-white shadow rounded w-full max-w-lg mb-3">
				<pre className="text-sm text-gray-800">
					{JSON.stringify(resultData, null, 2)}
				</pre>
			</div>
			
				<LangChart langData={ resultData["language_distribution"] }/>
				<IntentChart intentData={ resultData["intent_distribution"] }/>
				<ToxicityChart toxicityData={ resultData["toxicity_distribution"] }/>


			<Button onClick={() => navigate("/")}>Return to upload</Button>
		</div>
	);
};

export default ResultPage;
