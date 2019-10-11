const URL = '/api/'

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

    app.route(URL + 'company/:id')
        .delete(app.src.controllers.CompanyController.destroy)

    
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

}