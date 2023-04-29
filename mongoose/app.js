const express = require('express');
const app = express()
require('./utility/db'); // tidak perlu const karena hanya menjalankan koneksi
const Contact = require('./model/contact');
const expressLayout = require('express-ejs-layouts');
const port = 3000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));
app.use(express.urlencoded({extended : true }));

app.use(cookieParser('secret'));
app.use(session({
    cookie : {maxAge: 6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true,
})
);

app.use(flash());

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'monkey',
            email: 'monkey@gmail.com'
        },
        {
            nama: 'dio',
            email:'dio@gmail.com',
        },
        {
            nama: 'cokbill',
            email: 'puki@gmail.com'
        },
    ];
    res.render('index', {nama : 'sianjingg',
     title:'home page',
     mahasiswa,
     layout : 'layouts/main-layouts'
     });
});

app.get('/about', (req, res) => {
    res.render('about', 
    {title : 'about page',
    layout : 'layouts/main-layouts'});
});

app.get('/contact', async (req, res) => {
    const contacts = await Contact.find();
    res.render('contact', 
    {title : 'contact page',
    layout : 'layouts/main-layouts',
    contacts,
    msg : req.flash('msg')
    });
});



app.listen(port, () => {
    console.log(`Mongoose Contact App listening on port ${port}`)
  })