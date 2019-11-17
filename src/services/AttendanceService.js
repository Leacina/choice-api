const { Table, Service, Product_Decline, Product } = require('../models');
const { authSecret } = require('../.env')
const jwt = require('jwt-simple')

module.exports = app => {
    const {existsOrError} = app.src.services.ValidationService;

    /**
     * Valida os dados que serão inseridos
     * @param {Valor que será validado} value 
     */
    const get = async (query, params, headers) => {
        
        try{
            const { idTable, idCompany } = params
            
            const _token = jwt.decode(headers.authorization.replace('Bearer', '').trim(), authSecret);
       
            if(_token.id_company != idCompany){
                throw{
                    erro:'Você não pertence a essa empresa',
                    status:403
                }
            }

            //Busca se existe algum serviço aberto para esta mesa
            var service = await Service.findOne({
                where:{
                    id_table: idTable,
                    finishAt:null
                }
            })

            if(!service){
                //Se não possuir um serviço aberto... Retorna somente o service
                return {
                    service: await Service.create({
                    startAt: new Date(),
                    id_table: idTable
                })
            }
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
            if(service){
                //Procuro todos os produtos que estão marcados como falso
                const productDecline = await Product_Decline.findAll({
                    where: {
                        id_service: service.id,
                        is_available: false
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
                    
                        objectProduct = await Product.findOne({
                            where:{
                                id : id_pizza
                            }
                        })
                        
                    }
                  
                    _items[i] = { 
                            id: idDecline, 
                            //service: objectService ? objectService : { id: id_service }, 
                            product: objectProduct ? objectProduct : { id: id_pizza }, 
                            is_available, 
                            createdAt, 
                            updatedAt
                        } 
                      
                };

                return {
                    service,
                    options: _items
                }

            }else{
                //Se não possuir um serviço aberto... Retorna somente o service
                return await Service.create({
                    startAt: new Date(),
                    id_table: idTable
                })
            }

        }catch(err){
            //Se houver algum dado incorreto, lança exceção para o controller
            //com a mensagem de erro ja tratada.
            throw err
        }

    }

    return { get }
}