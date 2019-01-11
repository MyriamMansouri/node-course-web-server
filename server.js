const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

app.use((req, res) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// app.get('/', (req, res) => {
//     // res.send('Hello Express');
//     res.send({
//         likes: [
//             'Biking', 'Hiking'
//         ]
//     });
// });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

var titi = () => {
    app.get('/form', (req, res) => {
    var myText = req.query.mytext; //mytext is the name of your input box
    return myText;
    });
}

console.log(titi());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hi you, welcome to my page !'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Error message'
    });
})

app.listen(port, () => {
    console.log('Server is up and running on port 3000')
});