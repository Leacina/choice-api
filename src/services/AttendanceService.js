const { Table, Service, Product_Decline, Product } = require('../models');
const { authSecret } = require('../.env')
const jwt = require('jwt-simple')

module.exports = app => {

    /**
     * Valida os dados que serão inseridos
     * @param {Valor que será validado} value 
     */
    const get = async (query, params, headers) => {
        
        try{
            const {descriptografar} = app.src.config.crypto
            const idTable = parseInt(descriptografar(params.idTable))
    
            //Busca se existe algum serviço aberto para esta mesa
            var service = await Service.findOne({
                where:{
                    id_table: idTable,
                    finishAt:null
                }
            })

            const table = await Table.findOne({
                where:{
                    id: idTable
                }
            })

            if(!table) throw{
                erro:"Mesa não encontrada!",
                status:400
            }

            const product = await Product.findAll({
                where:{
                    id_company: table.id_company,
                    active:true
                }
            })
        
            if(!service){
                //Se não possuir um serviço aberto... Retorna somente o service
                service = await Service.create({
                    startAt: new Date(),
                    id_table: idTable
                })
            
                //TODO : PROVISÓRIO ATÉ VER O ERRO NA BAGAÇA DO LEFT NO SEQUELIZE
                //Insere todos os produtos
                for(let i = 0;i < product.length;i++){
                   
                    const teste = await Product_Decline.create({
                        id_pizza: product[i].id,
                        id_service: service.id,
                        is_available: true
                    })

                    console.log(teste.id)
                }

               // return {service}
            }

            const { id, startAt, finishAt, id_table, createdAt, updatedAt}  = service
         
            //variaveis para controle da query expand
            var {expand} = query
            var objectTable;
           
            //Monta o Objeto professor de acordo com o expand passado na query
            if(expand){
                expand = expand.split(',')

                //Se possuir expand para teacher, busca o cara
                if(expand.indexOf('table') > -1){
                    objectTable = await Table.findOne({
                        where:{
                            id : id_table
                        }
                    })
                }
            }

            service =  {
                    id, 
                    startAt, 
                    finishAt,  
                    createdAt, 
                    updatedAt,
                    table:
                    objectTable ? objectTable : { id: id_table }
            }

            //Se possuir um serviço aberto...
            //Procuro todos os produtos que estão marcados como falso
            const productDecline = await Product_Decline.findAll({
                where: {
                    id_service: service.id
                }
            })

            //TODO: Uma gambi provisória... Ajustar modo para poderem utilizar o expand
            //Tentar utilizar isso no proprio sequelize
            var _items = [];
            for(let i = 0; i < productDecline.length ; i++){
                const { id_service, id_pizza, is_available, createdAt, updatedAt} = productDecline[i]
                const idDecline = productDecline[i].id
                
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
                }

                objectProduct = await Product.findOne({
                    where:{
                        id : id_pizza
                    }
                })
                
                _items[i] = { 
                        id: idDecline, 
                        //service: objectService ? objectService : { id: id_service }, 
                        product: objectProduct ? objectProduct : { id: id_pizza }, 
                        isAvailable: is_available, 
                        createdAt, 
                        updatedAt
                    } 
                    
            };

            return {
                service,
                options: _items
            }

        }catch(err){
            //Se houver algum dado incorreto, lança exceção para o controller
            //com a mensagem de erro ja tratada.
            throw err
        }

    }

    return { get }
}