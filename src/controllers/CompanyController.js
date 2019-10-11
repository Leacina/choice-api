module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = (req, res) => {

    }

    /**
     * Comado executado para listar os dados
     * @param {request} req 
     * @param {response} res 
     */
    const show = (req, res) => {
        res.send('Hello World')
    }
    
    /**
    * Comando executado para inserir dado
    * @param {request} req 
    * @param {response} res 
    */
    const store = async (req, res) => {
        try{
            
            //Valida as regras de negocio e retorna o objeto caso esteja correto
            const Company = await app.src.services.CompanyService.valideStore(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Company)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    name: req.body.name,
                    cnpj: req.body.cnpj,
                    cell_phone: req.body.cell_phone,
                    Erro: err 
                }
            )
        }
    }
    
    /**
    * Função executada para atualizar os dados
    * @param {request} req 
    * @param {response} res 
    */
    const update = (req, res) => {

    }
    
    /**
    * Comando executado para deletar dado
    * @param {request} req 
    * @param {response} res 
    */
    const destroy = async (req, res) => {

        try{
            const Company = await app.src.services.CompanyService.valideDestroy(req.params.id) 

            res.send(Company)
        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    name: 'sasa',
                    cnpj: 'sasa',
                    cell_phone: 'sasa',
                    Erro: err 
                }
            )
        }

    }

    return {index, show, store, update, destroy}
}