module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = async (req, res) => {
        try{
            const Pizzas = await app.src.services.PizzaService.valideIndex()

            res.send(Pizzas)
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
            const Pizza = await app.src.services.PizzaService.valideShow(req.params.id)

            res.send(Pizza)
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
            const Pizza = await app.src.services.PizzaService.valideStore(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Pizza)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    flavor: req.body.flavor,
                    ingredients: req.body.ingredients,
                    url: req.body.url,
                    available: req.body.available,
                    id_establishment: req.body.id_establishment,
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
            const Pizza = await app.src.services.PizzaService.valideUpdate(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Pizza)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    flavor: req.body.flavor,
                    ingredients: req.body.ingredients,
                    url: req.body.url,
                    available: req.body.available,
                    id_establishment: req.body.id_establishment,
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
            const Pizza = await app.src.services.PizzaService.valideDestroy(req.params.id) 

            res.send(Pizza)
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