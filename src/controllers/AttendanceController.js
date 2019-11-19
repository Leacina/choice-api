module.exports = app => {
    /**
     * Comando executado para buscar um dado
     * @param {request} req 
     * @param {response} res 
     */
    const get = async (req, res) => {
        try{
            const Attendance = await app.src.services.AttendanceService.get(req.query, req.params, req.headers)

            res.send(Attendance)
        }catch(err){
            res.status(400).send({
                erro:err
            })
        }
    }

    return { get }
}