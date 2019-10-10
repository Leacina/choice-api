const { Company } = require('../models');

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
            existsOrError(value.name,'Nome da empresa não foi informado')
            existsOrError(value.cnpj,'CNPJ da empresa não foi informado')
            existsOrError(value.cell_phone,'Número de telefone da empresa não foi informado')

            //Insere o dado no banco de dados, caso de algum problema, lança uma exceção
            Company.create(value)
            .then(company => {
                //Retorna o JSON para o usuário caso retorne com sucesso.
                return company.toJSON();
            }).catch(err => {
                throw err;
            });

        }catch(err){
            //Se houver algum dado incorreto, lança exceção para o controller
            //com a mensagem de erro ja tratada.
            throw err
        }

    }

    return {valideStore}
}