const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const {User} = require('../models')

module.exports = app => {
    const signin = async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                erro:'Informe seu e-mail e senha!',
                status:400
            });
        }
        
        // TODO: Usar um método em um serviço em vez de usar o model diretamente no controller 
        const user = await User.findOne({
            where : {
                email
            }
        });
    
        if (!user) {
            return res.status(400).send({
                erro:'Usúario não encontrado!',
                status:400
            });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).send({
                erro:'Código e/ou Senha inválidos!',
                status:401
            }) ;
        }
        
        const now = Math.floor(Date.now() / 1000);
        
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            id_company: user.id_company,
            issued_at: now,
            expire_at: now + (60 * 60 * 2)
        };

        return res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        });
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null;
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret);
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true);
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false);
    }

    return { signin, validateToken };

}