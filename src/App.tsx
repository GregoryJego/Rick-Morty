import "./App.css"
import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { Characters } from "./pages/Characters/Characters"
import { Navbar } from "./components/Navbar/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </div>
  )
}

export default App
