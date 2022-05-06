const mongoose = require("mongoose");

const connect = () => {
    
    try {
        mongoose.connect(process.env.MONGO_URI, {
            w: "majority",
            retryWrites: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.error("Mongodb Connection error", error)
        process.exit()
    }
}

module.exports = connect