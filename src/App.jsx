import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Editor from "@/pages/editor/index.jsx"
<<<<<<< HEAD
=======
import { Toaster } from "./components/ui/toaster";

>>>>>>> d5d3209aee244af7e827e380206b4ce34cfae86e
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
