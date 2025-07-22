import { useEffect, useState } from 'react'

export default function useCarrito() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito')
    return guardado ? JSON.parse(guardado) : []
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (curso) => {
    // Evitar duplicados
    if (!carrito.find(item => item.id === curso.id)) {
      setCarrito([...carrito, curso])
    } 
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  return { carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }
}
