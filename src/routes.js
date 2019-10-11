const URL = '/api/'

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

/**
 * Rotas acessando os métodos dos Controllers
 */
module.exports = app => {

    //Rota para as empresas
    app.route(URL + 'company')
        .post(app.src.controllers.CompanyController.store)
        .get(app.src.controllers.CompanyController.index)
        .put(app.src.controllers.CompanyController.update)
    app.route(URL + 'company/:id')
        .delete(app.src.controllers.CompanyController.destroy)
        .get(app.src.controllers.CompanyController.show)

    
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

}