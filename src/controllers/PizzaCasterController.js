module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = async (req, res) => {
        try{
            const PizzaCasters = await app.src.services.PizzaCasterService.valideIndex()

            res.send(PizzaCasters)
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
            const PizzaCaster = await app.src.services.PizzaCasterService.valideShow(req.params.id)

            res.send(PizzaCaster)
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
            const PizzaCaster = await app.src.services.PizzaCasterService.valideStore(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(PizzaCaster)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    name: req.body.name,
                    create_date: req.body.create_date,
                    is_active: req.body.is_active,
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
            const PizzaCaster = await app.src.services.PizzaCasterService.valideUpdate(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(PizzaCaster)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    name: req.body.name,
                    create_date: req.body.create_date,
                    is_active: req.body.is_active,
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
            const PizzaCaster = await app.src.services.PizzaCasterService.valideDestroy(req.params.id) 

            res.send(PizzaCaster)
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