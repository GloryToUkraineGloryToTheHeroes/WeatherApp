
const express = require('express')
const User = require('../schemes/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('config')

//  /api/auth/register
router.post('/register',
    async(req, res) => {
        try{

            const {name, password} = await req.body

            console.log(name + password + '???????????????')

            if(name.length < 3 || name.length > 10){
                return res.status(400).json({
                    message: 'Incorrect name, minimum 3 symbols and maximum 10 symbols'
                })
            }

            if(password.length < 3 || password.length > 10){
                return res.status(400).json({
                    message: 'Incorrect password, minimum 3 symbols and maximum 10 symbols'
                })
            }

            const userOne = await User.findOne({name})

            if(userOne){
                return res.status(400).json({message: 'User already exists'})
            }

            const hPassword = await bcrypt.hash(password, 12)
            const user = new User({name, password: hPassword})

            await user.save()

            res.status(201).json({message: 'User has been created'})

        }catch(err){
            console.log(err)
            res.status(500).json({message: 'Something went wrong ????????????????????????'})
        }
})



//  /register/login
router.post('/login',
    async (req, res) => {
        try{

            const {name, password} = req.body

            if(name.length < 3 || name.length > 10){
                return res.status(400).json({
                    message: 'Incorrect name'
                })
            }

            if(password.length < 1){
                return res.status(400).json({
                    message: 'Incorrect password'
                })
            }

            const user = await User.findOne({name})

            if(!user){
                return res.status(400).json({message: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message: 'Incorrect password'})
            }


            const token = jwt.sign(
                {userId: user.id},
                config.get('token'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})



        }catch(err){
            console.log(err)
            res.status(500).json({message: 'Something went wrong'})
        }
})



module.exports = router











