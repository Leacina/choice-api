module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = async (req, res) => {
        try{
            const Declines = await app.src.services.ProductDeclineService.index(req.query, req.headers)

            res.send(Declines)
        }catch(err){
            res.status(err.status || 400).send({
                details:err
            })
        }
    }

    /**
     * Comado executado para listar os dados
     * @param {request} req 
     * @param {response} res 
     */
    const show = async (req, res) => {
        try{
            const Decline = await app.src.services.ProductDeclineService.show(req.params.id, req.query, req.headers)

            res.send(Decline)
        }catch(err){
            res.status(err.status || 400).send({
                details:err
            })
        }
    }
    
    /**
    * Comando executado para inserir dado
    * @param {request} req 
    * @param {response} res 
    */
    const store = async (req, res) => {
        try{
            
            //Valida as regras de negocio e retorna o objeto caso esteja correto
            const Decline = await app.src.services.ProductDeclineService.store(req.body, req.params, req.headers)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Decline)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    id_pizza: req.body.id_pizza,
                    id_service: req.body.id_service,
                    details: err 
                }
            )
        }
    }
    
    /**
    * Função executada para atualizar os dados
    * @param {request} req 
    * @param {response} res 
    */
    const update = async (req, res) => {
        try{
            
            //Valida as regras de negocio e retorna o objeto caso esteja correto
            const Decline = await app.src.services.ProductDeclineService.update(req.body, req.headers, req.params)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Decline)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    id_pizza: req.body.id_pizza,
                    id_service: req.body.id_service,
                    details: err 
                }
            )
        }
    }
    
    /**
    * Comando executado para deletar dado
    * @param {request} req 
    * @param {response} res 
    */
    const destroy = async (req, res) => {

        try{
            const Decline = await app.src.services.ProductDeclineService.destroy(req.params.id, req.headers) 

            res.send(Decline)
        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    details: err 
                }
            )
        }

    }

    return {index, show, store, update, destroy}
}