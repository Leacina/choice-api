const { Table, Company, Service } = require('../models');
const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const Sequelize = require('sequelize')
var _token

module.exports = app => {
    const {existsOrError} = app.src.services.ValidationService;
  
    /**
     * Valida os dados que serão inseridos
     * @param {Valor que será validado} body
     */
    const store = async (body, headers) => {
        
        try{
            const {startAt, finishAt, id_table} = body
    
            //Verifica se o objeto passado esta correto
            existsOrError(body,'Formato dos dados invalido')

            //Verifica se possui todos os dados foram passados
            existsOrError(id_table,'Mesa não foi informada')

            _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);

            //Busca a mesa caso ja exista
            const service = await Service.findOne({
                where: {
                    id_table,
                    finishAt: null
                }
            });

            //Se existir... Lança exceção
            if (service) {
                throw {
                    erro: 'Essa mesa já possui um serviço!',
                    status: 400
                };
            }
  
            const table = await Table.findOne({
                where:{
                    id: id_table
                }
            })
          
            if(table.id_company != _token.id_company){
                throw {
                    erro:"Mesa não encontrada!",
                    status:400
                }
            }

            //Insere o dado no banco de dados, caso de algum problema, lança uma exceção
            return Service.create({
                    startAt: startAt || new Date(),
                    finishAt,
                    id_table
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
            _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);

            //Delete a empresa
            const rowsDeleted = await Service.destroy({
                where:{
                    id,
                }
            })
          
            //Caso não encontrar a empresa, gera uma exceção
            existsOrError(rowsDeleted, 'Serviço não foi encontrado.')
            
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
            
            _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);

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
            return await Service.update({ 
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
        
            _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);
            
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
            const todosItemsTotal = await Service.findAll({
                where: {
                        [Op.or]: [
                        {
                            id_table: {
                                [Op.like]: `%${search || ''}%`
                            }
                        },
                    ]
                },
            })

            var itemsTotal = []
            for(let i = 0; i < todosItemsTotal.length; i++){
                const table = await Table.findOne({
                    where:{
                        id:todosItemsTotal[i].id_table
                    }
                })
              
                if(table.id_company == _token.id_company) itemsTotal[itemsTotal.length] = todosItemsTotal[i]
            }

            //Retorna todos as empresas
            const todosItems = await Service.findAll({
                where: {
                        [Op.or]: [
                            {
                                id_table: {
                                    [Op.like]: `%${search || ''}%`
                                }
                            },
                           
                        ]
                },
                limit: parseInt(limit) || null,
                offset: ((parseInt(page) - 1) * limit) || null,
                order: _order,
            })

            //Faz o filtro de acordo com a company
            //TODO: Ajustar para fazer no filter ou no proprio sequelize
            //Nada perfomatico
            //const items = todosItems.filter(verifyService)
            var items = []
            for(let i = 0; i < todosItems.length; i++){
                const table = await Table.findOne({
                    where:{
                        id:todosItems[i].id_table
                    }
                })
              
                if(table.id_company == _token.id_company) items[items.length] = todosItems[i]
            }
         
            //TODO: Uma gambi provisória... Ajustar modo para poderem utilizar o expand
            //Tentar utilizar isso no proprio sequelize
            var _items = [];
            for(let i = 0; i < items.length ; i++){
                const { id, startAt, finishAt, id_table, createdAt, updatedAt} = items[i]
              
                //variaveis para controle da query expand
                var {expand} = query
                var objectService;
               
                //Monta o Objeto professor de acordo com o expand passado na query
                if(expand){
                    expand = expand.split(',')

                    //Se possuir expand para company, busca o cara
                    if(expand.indexOf('table') > -1){
                        objectService = await Table.findOne({
                            where:{
                                id : id_table
                            }
                        })
                    }
                }
            
                _items[i] = { id,
                    startAt,   
                    finishAt,    
                    createdAt,
                    updatedAt,
                    table:
                        objectService ? objectService : { id: id_table }} 
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
            _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);
            
            //Retorna todos as empresas
            const table = await Service.findOne({
                where:{
                    id:value,
                    id_company: _token.id_company
                }
            })
         
            if(!table) throw{
                erro:"Mesa não encontrada!",
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

    async function verifyService(value){
   
        const table = await Table.findOne({
            where:{
                id:value.id_table
            }
        })
      
        return table.id_company == _token.id_company
    }

    return {store, destroy, show, index, update}
}