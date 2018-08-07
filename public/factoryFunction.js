//Create a factory function for called SettingBill
module.exports = function(){
    // create a variables that will keep track of all the settings
    var callCost = 0;
    var smsCost = 0;
    var warningLevel = 0;
    var criticalLevel = 0;
    //Add methods to check if its a string then convert into  a decimal
    var setCall = function(callSettings){
      if(callSettings !=""){
        callCost= parseFloat(callSettings);
      }
    };
    var setSms = function(smsSettings){
      if(smsSettings !="") {
        smsCost = parseFloat(smsSettings);
      }
    };
    var setWarnings = function(warningSettings){
      if (warningSettings !=""){
        warningLevel = parseFloat(warningSettings);
      }
    };
    
    var setCritical = function(criticalSettings){
      if(criticalSettings !=""){
        criticalLevel = parseFloat(criticalSettings);
      }
    };
    //Define a function to restrict grand total
    let colorRestrictions = function(){
      if(grandTotal >= warningLevel && grandTotal < warningLevel){
        return 'warnings';
      }else if(grandTotal >= criticalLevel){
        return 'critical';
      }
    };

    ///////////////////////END UPDATE SETTINGS///////////////////////////////////
  
    ///////////////////////////BILL TYPE////////////////////////////////////////
    // create a variables that will keep track of all three totals.
    var callTotal = 0;
    var smsTotal = 0;
    var grandTotal = 0;
    //Create methods for checking and return calls and sms's amount
    var calculations = function(radioBtnChecked){
      if(radioBtnChecked === "call"){
        callTotal += callCost;
        grandTotal += callCost;
      }else if( radioBtnChecked == 'sms'){
        smsTotal += smsCost;
        grandTotal += smsCost;
      }
    };
    
    // var settingsTotal = function(){
    //    grandTotal = callTotal + smsTotal;
    // };
    //////////////////////////END BILL TYPE//////////////////////////////////////
    return {
      setCall,
      setSms,
      setWarnings,
      setCritical,
      colorRestrictions,
      ///////////////////////////////////////////////////////////////////////////
      calculations,
      // settingsTotal, 
      results : function(){
        return{
          callTotal: callTotal.toFixed(),
          smsTotal: smsTotal.toFixed(),    
          grandTotal: grandTotal.toFixed(),
          callCost,
          smsCost,
          warningLevel,
          criticalLevel
        };
      }
    };
  };