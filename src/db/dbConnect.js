const mongoose = require('mongoose');

mongoose.connect(process.env.database,{ // connection to database
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})