
const mongoose = require('mongoose')
const User = require('./schemes/User')
const City = require('./schemes/City')

const url = 'mongodb://127.0.0.1:27017/cats'



async function run(){
    try{
        await mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log('connect')
        //var result = await City.find({})
        //var result = await City.deleteMany({})
        //var result = await User.find({})
        //var result = await User.deleteMany({})
        console.log(result)
    }catch(err){
        console.log(err)
    }finally{
        mongoose.disconnect()
    }
}

run()
