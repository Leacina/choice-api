const { Table, Company, Service, Product_Decline, Product} = require('../models');
const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const Sequelize = require('sequelize')

module.exports = app => {
    const {existsOrError} = app.src.services.ValidationService;
   
    /**
     * Valida os dados que serão inseridos
     * @param {Valor que será validado} body
     */
    const store = async (body, params, headers) => {
        
        try{
            const {descriptografar} = app.src.config.crypto
            const id_product = body.product.id
            const id_service = body.service.id
            const isAvailable =  body.isAvailable == null ? false : body.isAvailable
          
            const idTable = parseInt(descriptografar(params.idTable))
    
            //Verifica se o objeto passado esta correto
            existsOrError(body,'Formato dos dados invalido')

            //Verifica se possui todos os dados foram passados
            existsOrError(id_product,'Pizza não foi informada')
            existsOrError(id_service,'Serviço não foi informado')

            const table = await Table.findOne({
                id: idTable
            })

            if(!table) throw{
                erro:'Mesa não encontrada',
                status:400
            }

            //Busca a mesa caso ja exista
            const decline = await Product_Decline.findOne({
                where: {
                    id_pizza: id_product,
                    id_service
                }
            });

            const product = await Product.findOne({
                where:{
                    id:id_product,
                    id_company: table.id_company,
                    //active:true
                }
            })

            if(!product) throw {erro:'Produto não encontrado!', status: 400}

            const service = await Service.findOne({
                where:{
                    id: id_service
                }
            })

            if(!service) throw{ erro:"Serviço não encontrado!", status:400}
/*
            const table = await Table.findOne({
                where:{
                    id: service.id_table
                }
            })
           
            if(!table || (table.id_company != _token.id_company)){
                throw {
                    erro:"Mesa não encontrada!",
                    status:400
                 }
            }
*/       
            //Se existir... Faz update
            if (decline) {
                return await Product_Decline.update({
                    id_pizza: id_product,
                    id_service,
                    is_available: isAvailable
                },{
                    where:{
                            id_pizza: id_product,
                            id_service 
                        }
                    }
                )
            }
            
            //Insere o dado no banco de dados, caso de algum problema, lança uma exceção
            return Product_Decline.create({
                id_pizza: id_product,
                id_service,
                is_available: isAvailable
            })
           
        }catch(err){
            //Se houver algum dado incorreto, lança exceção para o controller
            //com a mensagem de erro ja tratada.
            throw err 
        }

    }

    /**
     * Valida os dados que serão deletados
     * @param {Valor que será validado} value 
     */
    const destroy = async (id, headers) => {

        try{
            //const _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);

            //Delete a empresa
            const rowsDeleted = await Product_Decline.destroy({
                where:{
                    id,
                }
            })
          
            //Caso não encontrar a empresa, gera uma exceção
            existsOrError(rowsDeleted, 'Dado não encontrado.')
            
        }catch(err){
            throw err 
        }
    }

    /**
     * Valida os dados que serão alterados
     * @param {Valor que será validado} value 
     */
    const update = async (body, headers, params) => {

        try{
            const {startAt, finishAt, id_table} = body
            const {id} = params

            //Verifica se o objeto passado esta correto
            existsOrError(body,'Formato dos dados invalido')
            
            const _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);

            //Busca a mesa
            const service = await Service.findOne({
                where:{
                    id
                }
            })

            //Caso não possuir uma mesa referente ao ID
            if(!service){
                throw{
                    erro:"Serviço não encontrado!",
                    status:400
                }
            } 
     
            const table = await Table.findOne({
                where:{
                    id: service.id_table
                }
            })
           
            if(table.id_company != _token.id_company){
                throw {
                    erro:"Serviço não encontrado!",
                    status:400
                }
            }

            //Update nos dados de acordo com o id
            return await Product_Decline.update({ 
                                startAt,
                                finishAt,
                                id_table
                           }, 
            {
                where: {
                  id
                }
            })

        }catch(err){
            throw err   
        }
    }

    /**
    * Valida os dados que serão retornados
    * @param {Valor que será validado} value 
    */
    const index = async (query, headers) => {

        try{
            //Pega os dados para filtros 
            const { sort, order, page, limit, search } = query
        
            const _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);
            
            //Utilizado nos filtros
            const Op = Sequelize.Op

            //Faz o split para pegar todos os order e sort
            var sortArray = sort ? sort.split(',') : []
            var orderArray = order ? order.split(',') : []
        
            //Variavel para armezar o array de order e sort
            let _order = [];
          
            //Percorre todos os 'order'
            for (let i = 0; i < (orderArray.length || 0) ; i++) { 
                //Acumulador do order by
                _order[i] = [(sortArray[i] || 'id'), (orderArray[i] || 'ASC')]
            }
         
            //Retorna todos as empresas
            const todosItemsTotal = await Product_Decline.findAll({
                where: {
                        is_available:  false,
                        [Op.or]: [
                        {
                            id_pizza: {
                                [Op.like]: `%${search || ''}%`
                            },
                            id_service: {
                                [Op.like]: `%${search || ''}%` 
                            }
                        },
                    ]
                },
            })
               
            var itemsTotal = []
            for(let i = 0; i < todosItemsTotal.length; i++){
                const product = await Product.findOne({
                    where:{
                        id:todosItemsTotal[i].id_pizza
                    }
                })
              
                if(product.id_company == _token.id_company) itemsTotal[itemsTotal.length] = todosItemsTotal[i]
            }
          
            //Retorna todos as empresas
            const todosItems = await Product_Decline.findAll({
                where: {
                        is_available:  false,
                        [Op.or]: [
                            {
                                id_pizza: {
                                    [Op.like]: `%${search || ''}%`
                                },
                                id_service: {
                                    [Op.like]: `%${search || ''}%` 
                                }
                            },
                        ]
                },
                limit: parseInt(limit) || null,
                offset: ((parseInt(page) - 1) * limit) || null,
                order: _order,
            })
         
            var items = []
            for(let i = 0; i < todosItems.length; i++){
                const product = await Product.findOne({
                    where:{
                        id:todosItems[i].id_pizza
                    }
                })
              
                if(product.id_company == _token.id_company) items[items.length] = todosItems[i]
            }

            //TODO: Uma gambi provisória... Ajustar modo para poderem utilizar o expand
            //Tentar utilizar isso no proprio sequelize
            var _items = [];
            for(let i = 0; i < items.length ; i++){
                const { id, id_pizza, id_service, createdAt, updatedAt} = items[i]
              
                //variaveis para controle da query expand
                var {expand} = query
                var objectService, objectProduct;
               
                //Monta o Objeto professor de acordo com o expand passado na query
                if(expand){
                    expand = expand.split(',')

                    //Se possuir expand para company, busca o cara
                    if(expand.indexOf('service') > -1){
                        objectService = await Service.findOne({
                            where:{
                                id : id_service
                            }
                        })
                    }
                    
                    if(expand.indexOf('pizza') > -1){
                        objectProduct = await Product.findOne({
                            where:{
                                id : id_pizza
                            }
                        })
                    }
                }
            
                _items[i] = { id,
                    pizza:
                        objectProduct ? objectProduct : { id: id_pizza },   
                    service:
                        objectService ? objectService : { id: id_service },
                    createdAt,
                    updatedAt}
            };

            return {
                items: _items,
                page,
                limit,
                total: itemsTotal.length
            }
        }catch(err){
            throw err 
        }

    }

    /**
    * Valida os dados que serão retornados
    * @param {Valor que será validado} value 
    */
   const show = async (value, query, headers) => {
        try{   
            const _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);
            
            //Retorna todos as empresas
            const table = await Product_Decline.findOne({
                where:{
                    id: value,
                    is_available:  false,
                }
            })
         
            if(!table) throw{
                erro:"Dado não encontrada!",
                status:400
            }

            const { id, name, id_company, active, createdAt, updatedAt} = table
          
            //variaveis para controle da query expand
            var {expand} = query
            var objectTable;
            
            //Monta o Objeto professor de acordo com o expand passado na query
            if(expand){
                expand = expand.split(',')

                //Se possuir expand para teacher, busca o cara
                if(expand.indexOf('company') > -1){
                    objectTable = await Company.findOne({
                        where:{ 
                            id : id_company
                        }
                    })
                }
            }

            //Retorna o JSON separado para controlar os dados do professor
            return {
                id,
                name,
                active,
                createdAt,
                updatedAt,
                company:
                objectTable ? objectTable : { id: id_company }
                
            }
        }catch(err){
            throw err 
        }
    }

    function verifyService(){

    }

    return {store, destroy, show, index, update}
}