const URL = '/api/v1.0/'

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

/**
 * Rotas acessando os métodos dos Controllers
 */
module.exports = app => {

    //Rota para os casos
    app.route(URL + 'company')
        .post(app.src.controllers.CompanyController.store)
        .get(app.src.controllers.CompanyController.show)

    
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

}