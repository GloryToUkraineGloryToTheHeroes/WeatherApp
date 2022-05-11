
const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }

    try{

        const token = req.headers.auth

        const typeT = typeof token

        if(typeT == 'undefined'){
            return res.status(401).json({message: 'No authorization'})
        }
        else{
            const decoded = jwt.verify(token, config.get('token'))
            req.user = decoded
            next()
        }

    }catch(err){
        console.log(err)
        res.status(401).json({message: 'No authorization, error'})
    }

}


