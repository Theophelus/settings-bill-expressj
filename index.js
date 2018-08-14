// define imports for express, body parser and handlebars
const express = require('express');
const SettingsBill = require('./public/factoryFunction');
let Moment = require('moment');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

//initialize instances
const app = express();
const settingsBill = SettingsBill();
var hbs = exphbs.create({defaultLayout: 'main',

//define a register helper to record events on when they were executed
 helpers : {'time': function(){
    return Moment(this.timeStamp).fromNow();

}}});
//configure express handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//configure public folder
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//define a GET request to render UI for setting bills
app.get('/', (req, res) => {
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
    let billType = settingsBill.getBill();
    console.log(billType);
    res.render('actions', { billType });
});
//define a GET route handler 
app.get('/actions/:type', (req, res) => {
     let theType = req.params.type;
     console.log(theType);
     if(theType == 'call' || theType == 'sms'){
        res.render('actions', {billType: settingsBill.filterRecords(theType)});
        console.log(settingsBill.filterRecords(theType));
     }
});
//define a POST route handler for clearing textboxes
app.post('/rest', (req, res) => {
    settingsBill.clear();
    res.redirect('/');
});
//setting up a express server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
 console.log('app starting at port', PORT);
});
