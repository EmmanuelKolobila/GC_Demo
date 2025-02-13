const mongoose = require('mongoose')
const Shema = mongoose.Schema;

const usersShema = new Shema({
    name:{
        type: String,
        required: true
    },
    pnumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mg: {
        type: String,
        required: true
    }
}, { timestamps: true});

const users = mongoose.model('userData', usersShema);
module.exports = users;

