import CursoCard from '../components/CursoCard'

const cursos = [
  {
    id: 1,
    titulo: 'React desde Cero',
    descripcion: 'Aprendé React paso a paso desde lo más básico.',
    imagen: 'https://source.unsplash.com/300x180/?react,programming'
  },
  { 
    id: 2,
    titulo: 'JavaScript Avanzado',
    descripcion: 'Domina JS moderno, asincronía y buenas prácticas.',
    imagen: 'https://source.unsplash.com/300x180/?javascript,coding'
  },
  {
    id: 3,
    titulo: 'HTML + CSS Pro',
    descripcion: 'Diseños profesionales con HTML5 y CSS3.',
    imagen: 'https://source.unsplash.com/300x180/?html,css,webdesign'
  }
]


export default function Cursos() {
  const handleAgregarAlCarrito = (curso) => {
    console.log('Agregado al carrito:', curso)
    // Próximo paso: guardar en carrito (context o localStorage)
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cursos Disponibles</h2>
      <div className="row">
        {cursos.map(curso => (
          <CursoCard
            key={curso.id}
            curso={curso}
            onAgregar={handleAgregarAlCarrito}
          />
        ))}
      </div>
    </div>
  )
}
