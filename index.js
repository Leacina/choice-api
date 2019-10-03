const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.db = db

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

consign()
    .then('./config/middlewares.js')
  //.then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(4000, () => {
    console.log('Backend executando...')
})