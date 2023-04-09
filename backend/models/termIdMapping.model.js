let { Schema, model } = require("mongoose")

let termIdMappingSchema = new Schema({
    term_name: {
        type: String,
        required: true,
        unique: true
    },
    term_id: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = model('TermIdMapping', termIdMappingSchema);
