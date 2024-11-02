import IntentChart from "@/components/IntentChart";
import LangChart from "@/components/LangChart";
import ToxicityChart from "@/components/ToxicityChart";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, ListPlus } from "lucide-react";
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
			<h2 className="mt-20 text-3xl font-bold mb-4">Analysis Results</h2>
			<div className="flex flex-wrap justify-center gap-6 p-6 bg-white shadow rounded w-full max-w-screen-lg mb-3 text-gray-800 text-2xl ">
				<div className="flex items-center gap-2">
					<ListPlus />
					<h3><span className="font-semibold">{resultData["total_messages"]}</span> Messages analyzed</h3>
				</div>
				<div className="flex items-center gap-2">
					<CircleCheck color="#35C759" />
					<h3><span className="font-semibold">{resultData["valid_messages"] || resultData["total_messages"] || 0}</span>  Valid Data messages</h3>
				</div>
				<div className="flex items-center gap-2">
					<CircleX color="#FF3B2F" />
					<h3><span className="font-semibold">{resultData["invalid_messages"] || 0}</span> Invalid Data messages</h3>
				</div>
			</div>
			<div className="flex gap-5 flex-wrap flex-col m-6 justify-center">
				<div className="flex gap-5">
					<LangChart langData={resultData["language_distribution"]} />
					<IntentChart intentData={resultData["intent_distribution"]} />
				</div>
				<ToxicityChart toxicityData={resultData["toxicity_distribution"]} />
			</div>


			<Button className="mb-6" onClick={() => navigate("/")}>Return to upload</Button>
			{/*<div className="p-6 bg-white shadow rounded w-full max-w-lg mb-3">
				<pre className="text-sm text-gray-800">
					{JSON.stringify(resultData, null, 2)}
				</pre>
			</div>*/}
		</div>
	);
};

export default ResultPage;
