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

    //Rota para as pizzas
    app.route(URL + 'pizza')
        .post(app.src.controllers.PizzaController.store)
        .get(app.src.controllers.PizzaController.index)
        .put(app.src.controllers.PizzaController.update)
    app.route(URL + 'pizza/:id')
        .delete(app.src.controllers.PizzaController.destroy)
        .get(app.src.controllers.PizzaController.show)

    //Rota para os logins
    app.route(URL + 'login')
        .post(app.src.controllers.LoginController.store)
        .get(app.src.controllers.LoginController.index)
        .put(app.src.controllers.LoginController.update)
    app.route(URL + 'login/:id')
        .delete(app.src.controllers.LoginController.destroy)
        .get(app.src.controllers.LoginController.show)

    //Rota para os logins
    app.route(URL + 'user')
        .post(app.src.controllers.UserController.store)
        .get(app.src.controllers.UserController.index)
        .put(app.src.controllers.UserController.update)
    app.route(URL + 'user/:id')
        .delete(app.src.controllers.UserController.destroy)
        .get(app.src.controllers.UserController.show)

    //Rota para os rodizios
    app.route(URL + 'pizzacaster')
        .post(app.src.controllers.PizzaCasterController.store)
        .get(app.src.controllers.PizzaCasterController.index)
        .put(app.src.controllers.PizzaCasterController.update)
    app.route(URL + 'pizzacaster/:id')
        .delete(app.src.controllers.PizzaCasterController.destroy)
        .get(app.src.controllers.PizzaCasterController.show)

    //Rota para os comandos
    app.route(URL + 'command')
        .post(app.src.controllers.CommandController.store)
        .get(app.src.controllers.CommandController.index)
        .put(app.src.controllers.CommandController.update)
    app.route(URL + 'command/:id')
        .delete(app.src.controllers.CommandController.destroy)
        .get(app.src.controllers.CommandController.show)

    //Rota para as pizzas 
    app.route(URL + 'pizzadecline')
        .post(app.src.controllers.PizzaDeclineController.store)
        .get(app.src.controllers.PizzaDeclineController.index)
        .put(app.src.controllers.PizzaDeclineController.update)
    app.route(URL + 'pizzadecline/:id')
        .delete(app.src.controllers.PizzaDeclineController.destroy)
        .get(app.src.controllers.PizzaDeclineController.show)   

    //Rota para as mesas
    app.route(URL + 'table')
        .post(app.src.controllers.TableController.store)
        .get(app.src.controllers.TableController.index)
        .put(app.src.controllers.TableController.update)
    app.route(URL + 'table/:id')
        .delete(app.src.controllers.TableController.destroy)
        .get(app.src.controllers.TableController.show)  

    //Rota para os tablets
    app.route(URL + 'tablet')
        .post(app.src.controllers.TabletController.store)
        .get(app.src.controllers.TabletController.index)
        .put(app.src.controllers.TabletController.update)
    app.route(URL + 'tablet/:id')
        .delete(app.src.controllers.TabletController.destroy)
        .get(app.src.controllers.TabletController.show)  

    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

}