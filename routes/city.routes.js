
const express = require('express')
const City = require('../schemes/City')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/weather', authMiddleware, async(req, res) => {
    try{

        const {city} = await req.body

        const dalban = await City.findOne({city})

        if(dalban){
            return res.json({city: dalban})
        }

        const citySave = new City({
            city,
            owner: req.user.userId
        })

        await citySave.save()

        return res.status(201).json(citySave)

    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Something went wrong (city.routs)'})
    }
})


router.post('/city/delete', authMiddleware, async (req, res) => {
    try{

        const {id} = await req.body 

        const data = await City.deleteOne({_id: id})
        res.json({message: `delete: ${data}`})

    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Something went wrong (city.routs)'})
    }
})


router.post('/city/reset', authMiddleware, async (req, res) => {
    try{



        const data = await City.deleteMany({ owner: req.user.userId })
        res.json({message: `delete: ${data}`})

    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Something went wrong (city.routs)'})
    }
})


router.get('/main', authMiddleware, async(req, res) => {
    try{
        const citys = await City.find({ owner: req.user.userId })
        res.json(citys)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Something went wrong '})
    }
})



router.get('/city/:id', authMiddleware, async(req, res) => {
    try{
        const city = await City.findById(req.params.id)
        res.json(city)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Something went wrong '})
    }
})

module.exports = router



