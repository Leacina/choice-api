const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const {User} = require('../models')

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
   
    const strategy = new Strategy(params, (payload, done) => {
        try{
            const user = User.findOne({
                where: {
                    id:payload.id
                }
            })
            done(null, user ? { ...payload } : false)
        }catch(err){
            done(err, false)
        }
    })

    passport.use(strategy)

    return {authenticate: () => passport.authenticate('jwt', { session: false })}
}