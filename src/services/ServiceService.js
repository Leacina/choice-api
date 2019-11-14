const { Command } = require('../models');

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
            existsOrError(value.id_caster_has_table,'Número referente a mesa não informado.')

            //Insere o dado no banco de dados, caso de algum problema, lança uma exceção
            return Command.create(value)
           
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
            const rowsDeleted = Command.destroy({
                where:{
                    id: value
                }
            })
          
            //Caso não encontrar a empresa, gera uma exceção
            existsOrError(rowsDeleted, 'Comanda não foi encontrada.')
            
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
            existsOrError(value.id_caster_has_table,'Número referente a mesa nçao informado.')

            //Update nos dados de acordo com o id
            Command.update({ 
                            is_ativo: value.is_ativo, 
                            start_date:value.start_date, 
                            id_caster_has_table: value.id_caster_has_table 
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
           return Command.findAll()
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
            return Command.findAll({
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