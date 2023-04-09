const mongoose = require("mongoose")
const MONGO_URI = ``;
const connectToDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
    } catch(connectionError) {
        console.error(connectionError)
    }
}

module.exports = connectToDb;