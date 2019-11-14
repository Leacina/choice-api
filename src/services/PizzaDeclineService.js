const { PizzaDecline } = require('../models');

module.exports = app => {
    const {existsOrError} = app.src.services.ValidationService;

    /**
     * Valida os dados que serão inseridos
     * @param {Valor que será validado} value 
     */
    const store = async (value) => {
        
        try{
            
            //Verifica se o objeto passado esta correto
            existsOrError(value,'Formato dos dados invalido')

            //Verifica se possui todos os dados foram passados
            existsOrError(value.id_command,'Comanda não foi informada')
            existsOrError(value.id_pizza,'Pizza não foi informada')

            //Insere o dado no banco de dados, caso de algum problema, lança uma exceção
            return PizzaDecline.create(value)
           
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
    const destroy = async (value) => {

        try{
            //Delete a empresa
            const rowsDeleted = PizzaDecline.destroy({
                where:{
                    id: value
                }
            })
          
            //Caso não encontrar a empresa, gera uma exceção
            existsOrError(rowsDeleted, 'Pizza não foi encontrada.')
            
            return rowsDeleted
        }catch(err){
            throw err
        }

    }

    /**
     * Valida os dados que serão alterados
     * @param {Valor que será validado} value 
     */
    const update = async (value) => {

        try{
            //Verifica se o objeto passado esta correto
            existsOrError(value,'Formato dos dados invalido')

            //Verifica se possui todos os dados foram passados
            existsOrError(value.id_command,'Comanda não foi informada')
            existsOrError(value.id_pizza,'Pizza não foi informada')

            //Update nos dados de acordo com o id
            PizzaDecline.update({ 
                                id_command: value.id_command,
                                id_pizza: value.id_pizza
                           }, 
            {
                where: {
                  id: value.id
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
    const index = async () => {

        try{
           //Retorna todos as empresas
           return PizzaDecline.findAll()
        }catch(err){
            throw err
        }

    }

    /**
    * Valida os dados que serão retornados
    * @param {Valor que será validado} value 
    */
   const show = async (value) => {
        try{
            //Retorna todos as empresas
            return PizzaDecline.findAll({
                where:{
                    id:value
                }
            })
        }catch(err){
            throw err
        }
    }

    return {store, destroy, show, index, update}
}