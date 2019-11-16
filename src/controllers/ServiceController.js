module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = async (req, res) => {
        try{
            const Services = await app.src.services.ServiceService.index(req.query, req.headers)

            res.send(Services)
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
            const Service = await app.src.services.ServiceService.show(req.params.id, req.query, req.headers)

            res.send(Service)
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
            const Service = await app.src.services.ServiceService.store(req.body, req.headers)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Service)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    startAt: req.body.startAt,
                    finishAt: req.body.finishAt,
                    id_table: req.body.id_table,
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
            const Service = await app.src.services.ServiceService.update(req.body, req.headers, req.params)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Service)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    startAt: req.body.startAt,
                    finishAt: req.body.finishAt,
                    id_table: req.body.id_table,
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
            const Service = await app.src.services.ServiceService.destroy(req.params.id, req.headers) 

            res.send(Service)
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