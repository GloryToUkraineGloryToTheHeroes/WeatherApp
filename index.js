
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'))
app.use('', require('./routes/city.routes'))



async function run(){
    try{
        await mongoose.connect(config.get('url'), { useUnifiedTopology: true, useNewUrlParser: true })
        console.log('connect')
    }catch(err){
        console.log(err)
    }
}

run()

const PORT = config.get('port') || 5000

app.listen(PORT, '127.0.0.1', () => console.log(`Arbeiten fur port ${PORT}`))

