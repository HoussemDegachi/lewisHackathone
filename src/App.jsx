import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Editor from "@/pages/editor/index.jsx"
import { Toaster } from "./components/ui/toaster";

function App() {

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path={"/:fileId"} element={<Editor />} />
      </Routes>
    </Router>
  )
}

export default App
