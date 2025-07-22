import React, { useState, useRef } from 'react'

const ContactForm = ({ innerRef }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })

  const [errors, setErrors] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState('')

  const validar = () => {
    const errs = {}
    if (!formData.nombre.trim()) errs.nombre = 'El nombre es obligatorio'
    if (!formData.email.trim()) {
      errs.email = 'El email es obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'El email no es válido'
    }
    if (!formData.mensaje.trim()) errs.mensaje = 'El mensaje es obligatorio'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorEnvio('')
    setEnviado(false)

    if (!validar()) return

    try {
      const res = await fetch('https://back-ecommerce-m1kv.onrender.com/api/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setEnviado(true)
        setFormData({ nombre: '', email: '', mensaje: '' })
        setErrors({})
        setTimeout(() => setEnviado(false), 5000)
      } else {
        setErrorEnvio(data.error || 'Error al enviar el formulario')
      }
    } catch (error) {
      setErrorEnvio('No se pudo conectar con el servidor')
    }
  }

  return (
    <section ref={innerRef} className="seccion-contacto py-5 bg-dark bg-opacity-75 text-white">
      <div className="container">
        <h2 className="text-center mb-4">¿Querés que te contactemos?</h2>

        {enviado && (
          <div className="alert alert-success" role="alert">
            ¡Gracias por contactarnos! Te responderemos pronto.
          </div>
        )}

        {errorEnvio && (
          <div className="alert alert-danger" role="alert">
            {errorEnvio}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
              id="nombre"
              placeholder="Tu nombre completo"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea
              className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
              id="mensaje"
              rows="4"
              placeholder="Escribinos tu consulta o interés..."
              value={formData.mensaje}
              onChange={handleChange}
            ></textarea>
            {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
