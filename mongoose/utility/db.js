const mongoose = require('mongoose');
const Contact = require('../model/contact');
mongoose.connect('mongodb://127.0.0.1:27017/cokbillDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// const contact1 = new Contact ({
//     nama : "maul",
//     nohp : "081237254722",
//     email : "maulkuli@gmail.com"
// });

// contact1.save().then((contact) => console.log(contact));
