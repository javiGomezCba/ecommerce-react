import { useState } from 'react'

export default function Navbar({
  onScrollToCursos,
  onScrollToContacto, // ← NUEVO
  carrito = [],
  eliminarDelCarrito = () => {},
  abrirCarrito = () => {},
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = (e) => {
    e.preventDefault()
    setDropdownOpen(!dropdownOpen)
    if (!dropdownOpen) abrirCarrito()
  }

  const scrollToTop = () => {
    const startPosition = window.scrollY
    const distance = -startPosition
    const duration = 1000
    let start = null

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percent = Math.min(progress / duration, 1)
      const eased = easeInOutCubic(percent)
      window.scrollTo(0, startPosition + distance * eased)
      if (progress < duration) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark bg-opacity-50 navbar-dark fixed-top shadow-sm">
      <div className="container">
        {/* Logo con scroll al top */}
        <a
          className="navbar-brand d-flex align-items-center"
          onClick={scrollToTop}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="/logo-codeaya.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold">CodeaYa</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">

            {/* Cursos */}
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  onScrollToCursos && onScrollToCursos()
                }}
              >
                Cursos
              </a>
            </li>

            {/* Contacto - NUEVO */}
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  onScrollToContacto && onScrollToContacto()
                }}
              >
                Contacto
              </a>
            </li>

            {/* Carrito */}
            <li className={`nav-item dropdown ${dropdownOpen ? 'show' : ''}`}>
              <a
                href="#"
                className="nav-link position-relative"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-cart4" style={{ fontSize: '1.4rem' }}></i>
                {carrito.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {carrito.length}
                  </span>
                )}
              </a>

              <div
                className={`dropdown-menu dropdown-menu-end p-3 ${dropdownOpen ? 'show' : ''}`}
                style={{ minWidth: '250px', maxHeight: '300px', overflowY: 'auto' }}
              >
                {carrito.length === 0 ? (
                  <p className="text-muted mb-0">El carrito está vacío.</p>
                ) : (
                  <ul className="list-unstyled mb-0">
                    {carrito.map((curso) => (
                      <li
                        key={curso.id}
                        className="d-flex justify-content-between align-items-start mb-2"
                      >
                        <div>
                          <strong>{curso.titulo}</strong>
                          <br />
                          <small className="text-muted">{curso.descripcion.slice(0, 30)}...</small>
                        </div>
                        <button
                          onClick={() => eliminarDelCarrito(curso.id)}
                          className="btn btn-sm btn-outline-danger ms-2"
                          aria-label={`Eliminar ${curso.titulo}`}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}
