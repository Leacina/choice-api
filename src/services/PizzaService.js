const { Pizza } = require('../models');

module.exports = app => {
    const {existsOrError} = app.src.services.ValidationService;

    /**
     * Valida os dados que serão inseridos
     * @param {Valor que será validado} value 
     */
    const valideStore = async (value) => {
        
        try{
            
            //Verifica se o objeto passado esta correto
            existsOrError(value,'Formato dos dados invalido')

            //Verifica se possui todos os dados foram passados
            existsOrError(value.flavor,'Sabor da pizza não foi informado')
            existsOrError(value.ingredients,'Ingrediente da pizza não foi informado')
            existsOrError(value.available,'Campo informando se a pizza esta disponivel não foi informado')
            existsOrError(value.id_establishment,'Id correspondente a empresa não foi informado')
            //Insere o dado no banco de dados, caso de algum problema, lança uma exceção
            return Pizza.create(value)
           
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
    const valideDestroy = async (value) => {

        try{
            //Delete a empresa
            const rowsDeleted = Pizza.destroy({
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
    const valideUpdate = async (value) => {

        try{
            //Verifica se o objeto passado esta correto
            existsOrError(value,'Formato dos dados invalido')

            //Verifica se possui todos os dados foram passados
            existsOrError(value.flavor,'ID da pizza não foi informado')

            //Update nos dados de acordo com o id
            Pizza.update({ 
                                flavor: value.flavor,
                                ingredients: value.ingredients,
                                url: value.url,
                                available:  value.available,
                                id_establishment: value.id_establishment,
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
    const valideIndex = async () => {

        try{
           //Retorna todos as empresas
           return Pizza.findAll()
        }catch(err){
            throw err
        }

    }

    /**
    * Valida os dados que serão retornados
    * @param {Valor que será validado} value 
    */
   const valideShow = async (value) => {
        try{
            //Retorna todos as empresas
            return Pizza.findAll({
                where:{
                    id:value
                }
            })
        }catch(err){
            throw err
        }
    }

    return {valideStore, valideDestroy, valideShow, valideIndex, valideUpdate}
}