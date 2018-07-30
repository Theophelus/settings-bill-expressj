
//Create a factory function for called SettingBill
module.exports = function(){
    // create a variables that will keep track of all the settings
    var callCost = 0;
    var smsCost = 0;
    var warningLevel = 0;
    var criticalLevel = 0;
    ///////////////////////UPDATE SETTING//////////////////////////////////////////
    //Add methods to check if its a string then convert into  a decimal
    var updateCall = function(callSettings){
      if(callSettings !=""){
        callCost= parseFloat(callSettings);
      }
    };
    // add another function to return call cost total
    var returnUpdateCall = function(){
      return callCost;
    };
    var updateSms = function(smsSettings){
      if(smsSettings !="") {
        smsCost = parseFloat(smsSettings);
      }
    };
    // add anpother function to return sms cost total
    var returnUpdateSms = function(){
      return smsCost;
    };
    var updateWarning = function(warningSettings){
      if (warningSettings !=""){
        return warningLevel = parseFloat(warningSettings);
      }
    };
    var updateCritical = function(criticalSettings){
      if(criticalSettings !=""){
        return criticalLevel = parseFloat(criticalSettings);
      }
    };
    ///////////////////////END UPDATE SETTINGS///////////////////////////////////
  
    ///////////////////////////BILL TYPE////////////////////////////////////////
    // create a variables that will keep track of all three totals.
    var callTotal = 0;
    var smsTotal = 0;
    var totalForAll = 0;
    //Create methods for checking and return calls and sms's amount
    var billTypeCall = function(radioBtnChecked){
      if(radioBtnChecked === "call"){
        callTotal += returnUpdateCall();
      }
    };
    //Add a return function for calls
    var returnCall = function(){
      return callTotal;
    };
    var billTypeSms = function(radioBtnChecked){
      if(radioBtnChecked === "sms"){
        smsTotal += returnUpdateSms();
      }
    };
    //Add a return function for calls
    var returnSms = function(){
      return smsTotal;
    };
  
    var settingsTotal = function(){
      return totalForAll = callTotal + smsTotal;
    };
    //////////////////////////END BILL TYPE//////////////////////////////////////
    return {
      updateCall,
      returnUpdateCall,
      updateSms,
      returnUpdateSms,
      updateWarning,
      updateCritical,
      ///////////////////////////////////////////////////////////////////////////
      billTypeCall,
      returnCall,
      billTypeSms,
      returnSms,
      settingsTotal
    };
  };