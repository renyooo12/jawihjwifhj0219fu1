const {model, Schema} = require('mongoose')

let suggestSchema = new Schema({
    Guild:String,
    Channel:String,
    Logs: String
})

module.exports = model('Suggest', suggestSchema)