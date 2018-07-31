// define imports for express, body parser and handlebars
const express = require('express');
const SettingsBill = require('./factoryFunction');
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
    res.render('home');
});

//define POST route for settings bill
app.post('/settings', (req, res) => {
    //define variables to store incoming values from th form
    let smsCost = req.body.smsCost;
    let callCost = req.body.callCost;
    let warningLevel = req.body.warningLevel;
    let criticalLevel = req.body.criticalLevel;

    console.log(settingsBill.returnUpdateCall(callCost));
    res.render('home', {
        smsCost: settingsBill.returnUpdateSms(smsCost),
        callCost: settingsBill.returnUpdateCall(callCost),
        warningLevel: settingsBill.updateWarning(warningLevel),
        criticalLevel: settingsBill.updateCritical(criticalLevel)
    });
    // console.log(settings);
    // globalSeting = settings;
    // res.render('home', { settings });
});


// define a POST route for when call or sms are being selected
app.get('/action', (req, res) => {

});

//setting up a express server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
 console.log('app starting at port', PORT);
});
