const express = require('express');
const app = express()
require('./utility/db'); // tidak perlu const karena hanya menjalankan koneksi
const Contact = require('./model/contact');
const expressLayout = require('express-ejs-layouts');
const port = 3000;
const { body, validationResult, check } = require('express-validator');
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

// tambah detail contact
app.get('/contact/add', (req, res) => {
    res.render('addContact', {
        title : 'form tambah data contact',
        layout : 'layouts/main-layouts',
    });
});

app.post('/contact',[
    body('nama').custom( async (value) => {
    const duplikat = await Contact.findOne({nama : value });
    if (duplikat) {
        throw new Error('nama sudah digunakan');
    }
    return true;
}), 
    check('email', 'email tidak valid').isEmail(), 
    check('nohp', 'nomor yang di input tidak valid').isMobilePhone('id-ID')], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({errors : errors.array()});
        res.render('addContact', {
            title : 'form tambah data contact',
            layout : 'layouts/main-layouts',
            errors : errors.array(),
        });
        } else {
            Contact.insertMany(req.body, (err, result)=> {
                // mengirimkan flash message
                req.flash('msg', 'data contact berhasil ditambahkan');
                res.redirect('/contact');
            });
        };
});

app.get('/contact/delete/:nama', async(req, res) => {
    const contact = await Contact.findOne({nama : req.params.nama});

    // jika contact tidak ada 
    if (!contact) {
        res.status(404).send("<h1> 404 </h1>");
    } else {
        Contact.deleteOne({_id : contact._id}).then((result) => {
            
            req.flash('msg', 'data contact berhasil dihapus');
            res.redirect('/contact')

        });
    };
});

app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});
    res.render('detail', {
        title : 'halaman detail contact',
        layout : 'layouts/main-layouts',
        contact,
    });
});




app.listen(port, () => {
    console.log(`Mongoose Contact App listening on port ${port}`)
  })