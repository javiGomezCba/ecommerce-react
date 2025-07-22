export default function CarritoSlide({ cursos = [], visible = false, onClose, eliminarDelCarrito }) {
  return (
    <>
      {/* Fondo semitransparente */}
      <div
        className={`carrito-fondo ${visible ? 'visible' : ''}`}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          opacity: visible ? 1 : 0,
          visibility: visible ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease',
          zIndex: 1040,
        }}
      ></div>

      {/* Panel lateral carrito */}
      <aside
        className={`carrito-slide ${visible ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: visible ? 0 : '-320px',
          height: '100vh',
          width: '320px',
          backgroundColor: '#222',
          color: '#eee',
          boxShadow: '-3px 0 10px rgba(0,0,0,0.7)',
          padding: '1.5rem',
          transition: 'right 0.3s ease',
          zIndex: 1050,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Tu Carrito</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#eee',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
        </header>

        {cursos.length === 0 ? (
          <p style={{ color: '#bbb', marginTop: '2rem' }}>No hay cursos agregados.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflowY: 'auto', flexGrow: 1 }}>
            {cursos.map((curso) => (
              <li
                key={curso.id}
                style={{
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #444',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong>{curso.titulo}</strong>
                  <p style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '0.25rem' }}>
                    {curso.descripcion}
                  </p>
                </div>
                <button
                  onClick={() => eliminarDelCarrito && eliminarDelCarrito(curso.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ff6b6b',
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    marginLeft: '1rem',
                    lineHeight: 1,
                  }}
                  aria-label={`Eliminar ${curso.titulo} del carrito`}
                  title="Eliminar"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  )
}
