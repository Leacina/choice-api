const { User } = require('../models');

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
            existsOrError(value.name,'Nome do usuário não informado.')
            existsOrError(value.cell_phone,'Número de celular não informado.')
            existsOrError(value.is_admin,'Usuário não foi informado.')
            existsOrError(value.id_establishment,'Estabelecimento não informado.')
            existsOrError(value.id_login,'Id do usuário não informado.')

            //Insere o dado no banco de dados, caso de algum problema, lança uma exceção
            return User.create(value)
            
        }catch(err){
            //Se houver algum dado incorreto, lança exceção para o controller
            //com a mensagem de erro ja tratada.
            throw {
                erro: err,
                status:400
            }
        }

    }

    /**
     * Valida os dados que serão deletados
     * @param {Valor que será validado} value 
     */
    const destroy = async (value) => {

        try{
            //Delete a empresa
            const rowsDeleted = User.destroy({
                where:{
                    id: value
                }
            })
          
            //Caso não encontrar a empresa, gera uma exceção
            existsOrError(rowsDeleted, 'Usuário não foi encontrada.')
            
            return rowsDeleted
        }catch(err){
            throw {
                erro: err,
                status:400
            }
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
            existsOrError(value.name,'ID do usuário não informado.')
     
            //Update nos dados de acordo com o id
            User.update({ 
                            name: value.name,
                            cell_phone: value.cell_phone,
                            is_admin: value.is_admin,
                            id_establishment: value.id_establishment,
                            id_login: value.id_login, 
                        }, 
            {
                where: {
                  id: value.id
                }
            })

        }catch(err){
            throw {
                erro: err,
                status:400
            }
        }
    }

    /**
    * Valida os dados que serão retornados
    * @param {Valor que será validado} value 
    */
    const index = async () => {
        try{
           //Retorna todos as empresas
           return User.findAll()
        }catch(err){
            throw {
                erro: err,
                status:400
            }
        }
    }

    /**
    * Valida os dados que serão retornados
    * @param {Valor que será validado} value 
    */
   const show = async (value) => {
        try{
            //Retorna todos as empresas
            return User.findAll({
                where:{
                    id:value
                }
            })
        }catch(err){
            throw {
                erro: err,
                status: 400
            }
        }
    }

    return {store, destroy, show, index, update}
}