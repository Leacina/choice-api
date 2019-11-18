const URL = '/api/'

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

/**
 * Rotas acessando os métodos dos Controllers
 */
module.exports = app => {
    app.post(URL + 'signin',app.src.controllers.LoginController.signin)
    app.post(URL + 'validateToken',app.src.controllers.LoginController.validateToken)

    //Rota para as empresas
    app.route(URL + 'company')
        .all(app.src.config.passport.authenticate())
        .post(app.src.controllers.CompanyController.store)
        .get(app.src.controllers.CompanyController.index)
    app.route(URL + 'company/:id')
        .all(app.src.config.passport.authenticate())
        .delete(app.src.controllers.CompanyController.destroy)
        .get(app.src.controllers.CompanyController.show)
        .put(app.src.controllers.CompanyController.update)

    //Rota para as pizzas
    app.route(URL + 'product')
        .all(app.src.config.passport.authenticate())
        .post(app.src.controllers.ProductController.store)
        .get(app.src.controllers.ProductController.index)
    app.route(URL + 'product/:id')
        .all(app.src.config.passport.authenticate())
        .delete(app.src.controllers.ProductController.destroy)
        .get(app.src.controllers.ProductController.show)
        .put(app.src.controllers.ProductController.update)

    //Rota para os logins
    app.route(URL + 'user')
        .all(app.src.config.passport.authenticate())
        .post(app.src.controllers.UserController.store)
        .get(app.src.controllers.UserController.index)
    app.route(URL + 'user/:id')
        .all(app.src.config.passport.authenticate())
        .delete(app.src.controllers.UserController.destroy)
        .get(app.src.controllers.UserController.show)
        .put(app.src.controllers.UserController.update)

    //Rota para os comandos
    app.route(URL + 'service')
        .all(app.src.config.passport.authenticate())
        .post(app.src.controllers.ServiceController.store)
        .get(app.src.controllers.ServiceController.index)
    app.route(URL + 'service/:id')
        .all(app.src.config.passport.authenticate())
        .delete(app.src.controllers.ServiceController.destroy)
        .get(app.src.controllers.ServiceController.show)
        .put(app.src.controllers.ServiceController.update)

    //Rota para as pizzas 
    app.route(URL + 'attendance/:idTable/product-decline')
        .post(app.src.controllers.ProductDeclineController.store)

    //Rota para as mesas
    app.route(URL + 'table')
        .all(app.src.config.passport.authenticate())
        .post(app.src.controllers.TableController.store)
        .get(app.src.controllers.TableController.index)
    app.route(URL + 'table/:id')
        .all(app.src.config.passport.authenticate())
        .delete(app.src.controllers.TableController.destroy)
        .get(app.src.controllers.TableController.show)  
        .put(app.src.controllers.TableController.update)

    app.route(URL + 'attendance/:idTable')
        .get(app.src.controllers.AttendanceController.get)

    app.route(URL + 'qrcode/:idTable')
        .all(app.src.config.passport.authenticate())
        .get(app.src.controllers.QrCodeController.get)

    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

}