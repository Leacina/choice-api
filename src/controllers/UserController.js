module.exports = app => {
    /**
    * Comando executado para inserir dado
    * @param {request} req 
    * @param {response} res 
    */
    const store = async (req, res) => {
        try{
            
            //Valida as regras de negocio e retorna o objeto caso esteja correto
            const User = await app.src.services.UserService.store(req.body)

            //Retorna o json com status de sucesso para o usuário
            return res.send(User)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(err.status || 400).send(
                {
                    status: err.status || 400,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
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
            const User = await app.src.services.UserService.update(req.body, req.params)

            //Retorna o json com status de sucesso para o usuário
            return res.send(User)

        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: err.status || 400,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
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
            const User = await app.src.services.UserService.destroy(req.params.id) 

            res.send(User)
        }catch(err){
            //Se houver algum erro, retorna o objeto com a mensagem de erro
            return res.status(400).send(
                {
                    status: 400,
                    erro: err 
                }
            )
        }

    }

     /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = async (req, res) => {
        try{
            const Users = await app.src.services.UserService.index()

            res.send(Users)
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
            const User = await app.src.services.UserService.show(req.params.id)

            res.send(User)
        }catch(err){
            res.status(400).send({
                erro:err
            })
        }
    }
    
    return {index, show, store, update, destroy}
}