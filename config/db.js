const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo conected : ${conn.connection.host}`)

    } catch(err) {
        console.log(`Error : ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;