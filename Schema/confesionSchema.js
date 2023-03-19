const {model,Schema} = require('mongoose')

const confesionSchema = new Schema({
    Guild:String,
    Channel:String
})

module.exports = model("confesion", confesionSchema)