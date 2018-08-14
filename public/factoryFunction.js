module.exports = function(){
    // create a variables that will keep track of all the settings
    var callCost = 0;
    var smsCost = 0;
    var warningLevel = 0;
    var criticalLevel = 0;
    //
    let getAction = [];
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
    
    ///////////////////////////BILL TYPE////////////////////////////////////////
    // create a variables that will keep track of all three totals.
    var callTotal = 0;
    var smsTotal = 0;
    var grandTotal = 0;
    //Create methods for checking and return calls and sms's amount
    var calculations = function(radioBtnChecked){

      let currentData = {
        type: radioBtnChecked,
        timeStamp: new Date()
      };
      if (grandTotal < criticalLevel) {
        if(radioBtnChecked === "call"){
          currentData['cost'] = callCost;
          callTotal += callCost;
          grandTotal += callCost;
        }else if( radioBtnChecked == 'sms'){
          currentData['cost'] = smsCost;
          smsTotal += smsCost;
          grandTotal += smsCost;
        }
  
      }

      colorRestrictions();
      getAction.push(currentData);
    };
    //define a filtering function to filter call or sms
    function filterRecords (type){
      return getAction.filter(record => record.type === type);
    }
    //define a function to return the bill empty array
    let getBill = function(){
      return getAction;
    };
    // console.log(getBill());
    var settingsTotal = function(){
       return grandTotal.toFixed(2);
    };
    //Define a function to restrict grand total
    let colorRestrictions = function(){
      if(grandTotal >= warningLevel && grandTotal < criticalLevel){
        return 'warning';
      } 
       if(grandTotal >= criticalLevel){
        return 'danger';
      }else{
        return '';
      }
    };
    //define a function to clear textboxes
    var clear = function(){
      callCost = 0;
      callTotal = 0;
      smsCost = 0;
      smsTotal = 0;
      grandTotal = 0;
      warningLevel = 0;
      criticalLevel = 0;
    };

    //////////////////////////END BILL TYPE//////////////////////////////////////
    return {
      setCall,
      setSms,
      setWarnings,
      setCritical,
      settingsTotal,
      calculations,
      getBill,
      filterRecords,
      colorRestrictions,
      clear,
      // settingsTotal, 
      results : function(){
        return{
          callTotal: callTotal.toFixed(2),
          smsTotal: smsTotal.toFixed(2),    
          grandTotal: grandTotal.toFixed(2),
          callCost,
          smsCost,
          warningLevel,
          criticalLevel,
          levels: colorRestrictions()
        };
      }
    };
  };