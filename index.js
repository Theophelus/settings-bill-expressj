// define imports for express, body parser and handlebars
const express = require('express');
const Factory = require('./factoryFunction');

const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
//configure express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//configure public folder
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//define a GET request to render UI for setting bills
app.get('/', (req, res) => {
    res.render('home');
});

//define POST route for settings bill
app.post('/settings', (req, res) => {
    //define variables to store incoming values from th form
    let smsCost = req.body.smsCost;
    let callCost = req.body.callCost;
    let warningLevel = req.body.warningLevel;
    let criticalLevel = req.body.criticalLevel;
    console.log(callCost);

    let settings = {
        smsCost: Factory.updateSms(),
        callCost: Factory.updateCall(),
        warningLevel: Factory.updateWarning(),
        criticalLevel: Factory.updateCritical()
    };
    globalSeting = settings;
    res.render('home', { settings });
});

app.get('/settings', (req, res) => {

});

//setting up a express server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
 console.log('app starting at port', PORT);
});