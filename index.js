// define imports for express, body parser and handlebars
const moment = require('moment');
const express = require('express');
const SettingsBill = require('./public/factoryFunction');
const settingsBill = SettingsBill();
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
    console.log(settingsBill.results());
    res.render('home', settingsBill.results());
});

//define a POST route Handler for settings bill values
app.post('/settings', (req, res) => {
    //define variables to store incoming values from th form
    let callTotal = req.body.callCost;
    let smsTotal = req.body.smsCost;
    let warningLevel = req.body.warningLevel;
    let criticalLevel = req.body.criticalLevel;
    
    // Pass those variables as arguments in related functions
    settingsBill.setCall(callTotal);
    settingsBill.setSms(smsTotal);
    settingsBill.setWarnings(warningLevel);
    settingsBill.setCritical(criticalLevel);
    //redirect to Home
    res.redirect('/');
});

// define a POST route handler for either sms or call if selected
app.post('/action', (req, res) => {
    let billType = req.body.billType;
     settingsBill.calculations(billType);
    res.redirect('/');
});

//define a GET rounte handler 
app.get('/actions', (req, res) => {  

    // let billList = settingsBill.

    // res.render('bill', billList)

    res.render('actions');
});
//define a GET rounte handler 
app.get('/action/:type', (req, res)=> {

    // let type = req.body.type

    // if(type == 'call' || type == 'sms'){


    // }

});

//setting up a express server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
 console.log('app starting at port', PORT);
});
