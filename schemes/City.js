
const {mongoose, Types} = require('mongoose')

const citySchema = new mongoose.Schema({
    city:{
        type: String
    }
    ,
    owner:{
        type: Types.ObjectId,
        ref: 'User'
    }
},{versionKey:false})


module.exports = mongoose.model('City', citySchema)