const {model, Schema} = require('mongoose')

let anunSchema = new Schema({
    Guild:String,
    Channel:String
})

module.exports = model('Anun', anunSchema)