require("dotenv").config() // Requerimos dotenv en el archivo principal para poder emplear variables de entorno en todo el proyecto (process.env)
const express = require('express')
const morgan = require('morgan')

const { checkDB, syncModels } = require("./database")
const defineRelations = require('./database/relations')

const startDB = async () => {
  await checkDB()          // 1. Comprobar conexión
  await defineRelations()  // 2. Importar modelos y definir sus relaciones
  syncModels()             // 3. Sincronizar modelos con la base de datos
}

const router = require("./api/routes") // Instancia del router principal, alojado en /api/routes/index.js
 
const app = express()
app.use(morgan('dev'))

app.use('/api', router) // Cualquier petición que llegue empezando con '/api' empleará el router principal de la línea 14

app.listen(process.env.PORT, () => {
  console.log(`Server started! Listening on port ${process.env.PORT}`)
  startDB() // Iniciamos la conexión al servidor una vez nuestro servidor esté arrancado y esperando peticiones
})

