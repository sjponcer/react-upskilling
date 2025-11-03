import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom/client";

function App() {
  return React.createElement("h1", null, "Hello React 🚀");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));