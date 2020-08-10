const mongoose = require('mongoose');

const table2 = new mongoose.Schema({ // define
    email : {
        type: String
    },
    password : {
        type: String
    }
});

const admin = mongoose.model('Admin', table2); // create

module.exports = admin;