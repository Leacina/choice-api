module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req
     * @param {response} res
     */
    const index = async (req, res) => {
        try{
            const Product = await app.src.services.ProductService.index(req.query, req.headers)

            res.send(Product)
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
            const Product = await app.src.services.ProductService.show(req.params.id, req.query, req.headers)

            res.send(Product)
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
            const Product = await app.src.services.ProductService.store(req.body, req.headers)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Product)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    name: req.body.name,
                    ingredients: req.body.ingredients,
                    description: req.body.description,
                    image: req.body.image,
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
            const Product = await app.src.services.ProductService.update(req.body, req.headers, req.params)

            //Retorna o json com status de sucesso para o usuário
            return res.send(Product)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    name: req.body.name,
                    ingredients: req.body.ingredients,
                    description: req.body.description,
                    image: req.body.image,
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
            const Product = await app.src.services.ProductService.destroy(req.params.id, req.headers)

            res.send(Product)
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