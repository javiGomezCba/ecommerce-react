// backend/server.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Ruta para recibir el formulario
app.post('/api/contact', async (req, res) => {
  const { nombre, email, mensaje } = req.body

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"${nombre}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: 'Nuevo mensaje desde el formulario',
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    }

    await transporter.sendMail(mailOptions)

    // Guardar mensaje en archivo mensajes.txt
    const logMessage = `
--- Nuevo mensaje ---
Nombre: ${nombre}
Email: ${email}
Mensaje: ${mensaje}
Fecha: ${new Date().toLocaleString()}
---------------------
`

    const logFilePath = path.join(__dirname, 'mensajes.txt')
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) console.error('Error al guardar el mensaje en archivo:', err)
    })

    res.json({ success: true, message: 'Mensaje enviado correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al enviar el correo' })
  }
})

app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente')
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
