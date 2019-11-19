const { Table } = require('../models');
const qr = require('qr-image')

module.exports = app => {

    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const get = async (req, res) => {
        try{
            const {criptografar} = app.src.config.crypto
            //TODO: Eu sei que não pode isso no controller...
            // Vou ajustar...CORRERIAA
            const table = await Table.findOne({
                where:{
                    id: req.params.idTable
                }
            })
            
            if(!table) throw {
                erro:"Mesa não encontrada!",
                status:400
            }
            
            const url = 'https://choice.app/attendance/'
       
            const code = qr.image(url + criptografar(req.params.idTable), { type: 'png' })
  
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