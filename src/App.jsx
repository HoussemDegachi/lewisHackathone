import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Editor from "@/pages/editor/index.jsx"

function App() {

  return (
    <Router>
      <Routes>
        <Route path={"/:fileName"} element={<Editor />} />
      </Routes>
    </Router>
  )
}

export default App
