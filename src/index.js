const express = require('express')
const app = express()
const consign = require('consign')
const { Company } = require('./models');

consign()
.include('./src/config/passport.js')
    .then('./src/config/middlewares.js')
    .then('./src/services/ValidationService.js')
    .then('./src/services')
    .then('./src/controllers')
    .then('./src/routes.js')
    .into(app)

app.listen(4200, () => {
    console.log('Backend executando...')
})