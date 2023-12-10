import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import "./i18n";
import { AccountContextProvider } from "./contexts/Account.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path="/*"
					element={
						<AccountContextProvider>
							<App />
						</AccountContextProvider>
					}
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
