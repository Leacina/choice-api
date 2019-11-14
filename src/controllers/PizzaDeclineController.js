module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = async (req, res) => {
        try{
            const PizzaDeclines = await app.src.services.PizzaDeclineService.index()

            res.send(PizzaDeclines)
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
            const PizzaDecline = await app.src.services.PizzaDeclineService.show(req.params.id)

            res.send(PizzaDecline)
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
            const PizzaDecline = await app.src.services.PizzaDeclineService.store(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(PizzaDecline)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    id_command: req.body.id_command,
                    id_pizza: req.body.id_pizza,
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
            const PizzaDecline = await app.src.services.PizzaDeclineService.update(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(PizzaDecline)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    id_command: req.body.id_command,
                    id_pizza: req.body.id_pizza,
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
            const PizzaDecline = await app.src.services.PizzaDeclineService.destroy(req.params.id) 

            res.send(PizzaDecline)
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