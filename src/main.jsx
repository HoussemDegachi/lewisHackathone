import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FileBarDataProvider } from "./contexts/FileBarDataProvider.jsx";
import { EditorDataProvider } from "./contexts/EditorDataProvider.jsx";

createRoot(document.getElementById("root")).render(
    <FileBarDataProvider>
      <App />
    </FileBarDataProvider>
);
