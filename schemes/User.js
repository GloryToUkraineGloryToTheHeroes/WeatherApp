
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    password:{
        type: String
    }
},{versionKey:false})


module.exports = mongoose.model('User', userSchema)






