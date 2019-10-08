const app = require('express')()
const consign = require('consign')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

consign()
    .then('./src/config/middlewares.js')
    .then('./src/controllers')
    .then('./src/routes.js')
    .into(app)

app.listen(4000, () => {
    console.log('Backend executando...')
})