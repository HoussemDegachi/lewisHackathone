import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Editor from "@/pages/editor/index.jsx";
import Layout from "@/components/layout/index";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Editor isRoot={true} />} />
          <Route path={"/:fileId"} element={<Editor isRoot={false} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
