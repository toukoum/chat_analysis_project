// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import RootLayout from "./layout";


const App: React.FC = () => {
	return (
		<RootLayout>
			<Router>
				<Routes>
					<Route path="/" element={<UploadPage />} />
					<Route path="/results" element={<ResultPage />} />
				</Routes>
			</Router>
		</RootLayout>
	);
};

export default App;
