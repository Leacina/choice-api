module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = async (req, res) => {
        try{
            const Command = await app.src.services.CommandService.index()

            res.send(Command)
        }catch(err){
            res.status(400).send({
                erro:err
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
            const Command = await app.src.services.CommandService.show(req.params.id)

            res.send(Command)
        }catch(err){
            res.status(400).send({
                erro:err
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
            const Command = await app.src.services.CommandService.store(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Command)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    is_ativo: req.body.is_ativo,
                    start_date: req.body.start_date,
                    id_caster_has_table: req.body.id_caster_has_table,
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
    const update = async (req, res) => {
        try{
            
            //Valida as regras de negocio e retorna o objeto caso esteja correto
            const Command = await app.src.services.CommandService.update(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Command)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    is_ativo: req.body.is_ativo,
                    start_date: req.body.start_date,
                    id_caster_has_table: req.body.id_caster_has_table,
                    Erro: err 
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
            const Command = await app.src.services.CommandService.destroy(req.params.id) 

            res.send(Command)
        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    Erro: err 
                }
            )
        }
    }

    return {index, show, store, update, destroy}
}