module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = async (req, res) => {
        try{
            const Tables = await app.src.services.TableService.index(req.query, req.headers)

            res.send(Tables)
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
            const Table = await app.src.services.TableService.show(req.params.id, req.query, req.headers)

            res.send(Table)
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
            const Table = await app.src.services.TableService.store(req.body, req.headers)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Table)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    name: req.body.name,
                    active: req.body.active,
                    id_company: req.body.id_company,
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
            const Table = await app.src.services.TableService.update(req.body, req.headers, req.params)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Table)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    name: req.body.name,
                    active: req.body.active,
                    id_company: req.body.id_company,
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
            const Table = await app.src.services.TableService.destroy(req.params.id, req.headers) 

            res.send(Table)
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