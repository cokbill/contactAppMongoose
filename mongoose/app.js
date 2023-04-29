const express = require('express');
const app = express()
const expressLayout = require('express-ejs-layouts');
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));
app.use(express.urlencoded({extended : true }));


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

app.get('/contact', (req, res) => {
    const contacts = loadContact();
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