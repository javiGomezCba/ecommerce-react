import { useRef, useState, lazy, Suspense } from 'react'
import './Home.css'

const Navbar = lazy(() => import('../components/Navbar'))
const CarritoSlide = lazy(() => import('../components/CarritoSlide'))
const ContactForm = lazy(() => import('../components/ContactForm'))

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'


export default function Home() {
  const cursosRef = useRef(null)
  const contactoRef = useRef(null)

  const cursos = [
    {
      id: 1,
      titulo: 'React desde Cero',
      descripcion: 'Aprendé React paso a paso desde lo más básico.',
      imagen: '/react.webp',
    },
    {
      id: 2,
      titulo: 'JavaScript Avanzado',
      descripcion: 'Domina JS moderno, asincronía y buenas prácticas.',
      imagen: '/javascript.webp',
    },
    {
      id: 3,
      titulo: 'HTML desde Cero',
      descripcion: 'Aprendé a estructurar sitios web con HTML5 desde cero.',
      imagen: '/html.webp',
    },
    {
      id: 4,
      titulo: 'CSS Profesional',
      descripcion: 'Dominá estilos, Flexbox, Grid y responsive design.',
      imagen: '/css.webp',
    },
    {
      id: 5,
      titulo: 'Python para Principiantes',
      descripcion: 'Empezá desde cero con Python, lógica y automatización.',
      imagen: '/python.webp',
    },
    {
      id: 6,
      titulo: 'Fundamentos de la Programación',
      descripcion: 'Lógica, variables, condicionales y estructuras básicas.',
      imagen: '/funda.webp',
    },
  ]

  const [agregados, setAgregados] = useState({})
  const cursosEnCarrito = cursos.filter((curso) => agregados[curso.id])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  const agregarAlCarrito = (curso) => {
    setAgregados((prev) => ({ ...prev, [curso.id]: true }))
  }

  const eliminarDelCarrito = (id) => {
    const nuevo = { ...agregados }
    delete nuevo[id]
    setAgregados(nuevo)
  }

  const scrollToCursos = () => {
    const targetPosition = cursosRef.current?.offsetTop || 0
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition - 80
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

const scrollToContacto = () => {
  const targetElement = contactoRef.current
  if (!targetElement) return

  const startPosition = window.scrollY
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
  const distance = targetPosition - startPosition - 80
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
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}


  return (
    <>
      <Suspense fallback={null}>
        <Navbar
          onScrollToCursos={scrollToCursos}
          onScrollToContacto={scrollToContacto}
          carrito={cursosEnCarrito}
          eliminarDelCarrito={eliminarDelCarrito}
          abrirCarrito={() => setMostrarCarrito(true)}
        />
      </Suspense>


      <div className="hero-home d-flex align-items-center justify-content-center text-center text-white">
        <div className="overlay"></div>
        <div className="content position-relative px-3">
          <h1 className="display-3 fw-bold">CodeaYa</h1>
          <p className="lead">Tu futuro empieza hoy. Aprendé online, a tu ritmo.</p>
          <button onClick={scrollToCursos} className="btn btn-primary btn-lg mt-3">
            Ver Cursos
          </button>
        </div>
      </div>

      <section ref={cursosRef} className="seccion-cursos">
        <h2 className="mb-4 text-center">Cursos Destacados</h2>

        <div className="swiper-container-custom">
          <Swiper
            loop={true}
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={3}
            grabCursor={true}
            breakpoints={{
              0: { slidesPerView: 1.1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {cursos.map((curso) => (
              <SwiperSlide key={curso.id}>
                <div className="card curso-card h-100 shadow-sm">
                  <img src={curso.imagen} className="card-img-top" alt={curso.titulo} loading="lazy"/>
                  <div className="card-body">
                    <h5 className="card-title">{curso.titulo}</h5>
                    <p className="card-text">{curso.descripcion}</p>
                    <button
                      className={`btn ${
                        agregados[curso.id] ? 'btn-success' : 'btn-outline-primary'
                      }`}
                      disabled={agregados[curso.id]}
                      onClick={() => agregarAlCarrito(curso)}
                    >
                      {agregados[curso.id] ? 'Agregado ✅' : 'Agregar al carrito'}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-4 text-muted">Cargando contacto...</div>}>
        <ContactForm innerRef={contactoRef} />
      </Suspense>

      <Suspense fallback={null}>
        <CarritoSlide
          cursos={cursos.filter((c) => agregados[c.id])}
          visible={mostrarCarrito}
          onClose={() => setMostrarCarrito(false)}
          eliminarDelCarrito={eliminarDelCarrito}
        />
      </Suspense>

    </>
  )
}
