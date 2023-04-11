const { Schema, model } = require("mongoose")

let docDetailsSchema = new Schema({
    path_to_doc: {
        type: String,
        required: true,
        unique: true
    },
    mod: {
        type: Number
    },
    tfs: {
        type: [Number]
    },
    title: {
        type: String
    },
    body: {
        type: String
    }
})

module.exports = model('DocDetails', docDetailsSchema);