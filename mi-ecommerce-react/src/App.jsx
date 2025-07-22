import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cursos from './pages/Cursos'
import Carrito from './pages/Carrito'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </>
  )
}

export default App
