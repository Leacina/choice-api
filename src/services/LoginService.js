const { Login } = require('../models');

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
            existsOrError(value.email,'E-mail não informado.')
            existsOrError(value.password,'Senha não informada.')
    
            //Insere o dado no banco de dados, caso de algum problema, lança uma exceção
            return Login.create(value)
           
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
            const rowsDeleted = Login.destroy({
                where:{
                    id: value
                }
            })
          
            //Caso não encontrar o login, gera uma exceção
            existsOrError(rowsDeleted, 'Login não foi encontrado.')
            
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
            existsOrError(value.email,'E-mail não informado.')
            existsOrError(value.password,'Senha não informada.')

            //Update nos dados de acordo com o id
            Login.update({ 
                                email: value.email,
                                password: value.password,
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
           return Login.findAll()
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
            return Login.findAll({
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