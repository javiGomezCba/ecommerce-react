import useCarrito from '../hooks/useCarrito'

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito()

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>No hay cursos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map(curso => (
              <li key={curso.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{curso.titulo}</strong><br />
                  <small>{curso.descripcion}</small>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => eliminarDelCarrito(curso.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  )
}
