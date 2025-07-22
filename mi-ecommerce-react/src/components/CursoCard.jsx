function CursoCard({ curso, onAgregar }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">
        <img src={curso.imagen} className="card-img-top" alt={curso.titulo} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{curso.titulo}</h5>
          <p className="card-text">{curso.descripcion}</p>
          <button
            className="btn btn-primary mt-auto"
            onClick={() => onAgregar(curso)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default CursoCard
