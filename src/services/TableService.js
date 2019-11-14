const { Table, Company } = require('../models');
const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const Sequelize = require('sequelize')

module.exports = app => {
    const {existsOrError} = app.src.services.ValidationService;
  
    /**
     * Valida os dados que serão inseridos
     * @param {Valor que será validado} body
     */
    const store = async (body, headers) => {
        
        try{
            const {name, id_company} = body
            const active = body.active == null ? false : body.active

            //Verifica se o objeto passado esta correto
            existsOrError(body,'Formato dos dados invalido')

            //Verifica se possui todos os dados foram passados
            existsOrError(name,'Nome não foi informado')

            const _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);

            //Busca a mesa caso ja exista
            const table = await Table.findOne({
                where: {
                    name
                }
            });

            //Se existir... Lança exceção
            if (table) {
                throw {
                    erro: 'Já existe uma mesa com o mesmo nome!',
                    status: 400
                };
            }
       
            //Insere o dado no banco de dados, caso de algum problema, lança uma exceção
            return Table.create({
                    name,
                    active,
                    id_company: _token.id_company
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
            const _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);

            //Delete a empresa
            const rowsDeleted = await Table.destroy({
                where:{
                    id,
                    id_company: _token.id_company
                }
            })
          
            //Caso não encontrar a empresa, gera uma exceção
            existsOrError(rowsDeleted, 'Mesa não foi encontrada.')
            
            return rowsDeleted
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
            const {name} = body
            const active = body.active == null ? false : body.active
            const { id } = params
            //Verifica se o objeto passado esta correto
            existsOrError(body,'Formato dos dados invalido')

            //Verifica se possui todos os dados foram passados
            existsOrError(name,'Nome não foi informado')
        
            //Busca a mesa
            const table = await Table.findOne({
                where:{
                    id
                }
            })

            //Caso não possuir uma mesa referente ao ID
            if(!table){
                throw{
                    erro:'Mesa não encontrada',
                    status:400
                }
            } 

            const _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);

            //Update nos dados de acordo com o id
            return await Table.update({ 
                                name,
                                active
                           }, 
            {
                where: {
                  id,
                  id_company: _token.id_company
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
            for (let i = 0; i < order.length - 1; i++) { 
                //Acumulador do order by
                _order[i] = [(sortArray[i] || 'id'), (orderArray[i] || 'ASC')]
            }
           
            //Retorna todos as empresas
            const items = await Table.findAll({
                where: {
                            id_company: _token.id_company,
                            name: {
                                [Op.like]: `%${search || ''}%`
                            }
                },
                limit: parseInt(limit) || null,
                offset: ((parseInt(page) - 1) * limit) || null,
                order: _order
            })
          
            //TODO: Uma gambi provisória... Ajustar modo para poderem utilizar o expand
            //Tentar utilizar isso no proprio sequelize
            var _items = [];
            for(let i = 0; i < items.length ; i++){
                const { id, name, id_company, active, createdAt, updatedAt} = items[i]
              
                //variaveis para controle da query expand
                var {expand} = query
                var objectService;
               
                //Monta o Objeto professor de acordo com o expand passado na query
                if(expand){
                    expand = expand.split(',')

                    //Se possuir expand para company, busca o cara
                    if(expand.indexOf('company') > -1){
                        objectService = await Company.findOne({
                            where:{
                                id : id_company
                            }
                        })
                    }
                }
            
                _items[i] = { id,
                    name,   
                    active,    
                    createdAt,
                    updatedAt,
                    company:
                        objectService ? objectService : { id: id_company }} 
            };

            return {
                items: _items,
                page,
                limit,
                total: _items.length
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
            const table = await Table.findOne({
                where:{
                    id:value,
                    id_company: _token.id_company
                }
            })
         
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

    return {store, destroy, show, index, update}
}