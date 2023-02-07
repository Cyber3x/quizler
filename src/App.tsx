import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Editor from "./pages/Editor"
import Landing from "./pages/Landing"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Landing />} />
        <Route path='editor' element={<Editor />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
