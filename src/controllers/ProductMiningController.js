module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const index = async (req, res) => {
        try{
            const Declines = await app.src.services.ProductMiningService.index(req.query, req.headers)

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
            const Decline = await app.src.services.ProductMiningService.show(req.params.id, req.query, req.headers)

            res.send(Decline)
        }catch(err){
            res.status(err.status || 400).send({
                details:err
            })
        }
    }

    return {index, show}
}