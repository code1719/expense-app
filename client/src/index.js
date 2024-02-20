import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import App from "./App";

// If you are running the intercept file in components,
// You will need to uncomment the code below and comment the lines 18-26.
// ReactDOM.render(
// <React.StrictMode>
// <Router>
// <App />
// </Router>
// </React.StrictMode>,
// document.getElementById("root")
// );

// If you are not running the intercept file you can comment it out
// in the app.js file and use the code below.

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
<React.StrictMode>
<Router>
<App />
</Router>
</React.StrictMode>
);