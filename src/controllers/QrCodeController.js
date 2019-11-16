const qr = require('qr-image')

module.exports = app => {
    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const get = async (req, res) => {
        try{
            const url = 'https://choice.app/attendance/'
            const code = qr.image(url + req.params.idTable + '/' + req.params.idCompany, { type: 'png' })
  
            res.type('png')
        
            code.pipe(res)
        }catch(err){
            res.status(err.status || 400).send({
                details:err
            })
        }
    }

    return { get }
}