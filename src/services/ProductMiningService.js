const { Product_Mining, Product } = require('../models');
const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const Sequelize = require('sequelize')
var _token

module.exports = app => {

    /**
    * Valida os dados que serão retornados
    * @param {Valor que será validado} value 
    */
    const index = async (query, headers) => {

        try{
            //Pega os dados para filtros 
            const { sort, order, page, limit, search } = query
        
            //Utilizado nos filtros
            const Op = Sequelize.Op

            _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);

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
      
            const product = await Product.findAll({
                where:{
                    id_company: _token.id_company
                },
                attributes: ['name']
            })
          
            //Retorna todos as empresas
            const ItemsTotal = await Product_Mining.findAll({
                where: {
                          name: {
                            [Op.like]: `%${search || ''}%` 
                          }
                },
            })
               
            //Retorna todos as empresas
            const items = await Product_Mining.findAll({
                where: {
                        name: {
                            [Op.like]: `%${search || ''}%`
                        }
            },
                limit: parseInt(limit) || null,
                offset: ((parseInt(page) - 1) * limit) || null,
                order: _order,
            })
         
            //GAMBI PRA LIBERAR 
            var _items = []
            for(let i = 0; i < items.length; i++){
                //Extrai os dados para monta json
                const {id, name, ingredients, createdAt, updatedAt} = items[i]
                //Variavel para controle de Disponivel ou nao
                var isUsage = true
                //Percorre todos os produtos cadastrados
                for(let y = 0; y < product.length; y++){
                    //Verifica se possui algum com mesmo nome
                    if(items[i].name == product[y].name){
                        isUsage = false; 
                    }
                }
                //Monta o objeto para retorno
                _items[_items.length] = {
                    id,
                    name, 
                    ingredients,
                    isUsage,
                    createdAt, 
                    updatedAt
                }
            }

            return {
                items:_items,
                page,
                limit,
                total: ItemsTotal.length
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

    return {show, index}
}