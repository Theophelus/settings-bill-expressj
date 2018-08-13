const assert = require('assert');
let SettingBill = require('../public/factoryFunction');
describe('Bill With Settings Widget Tests', function(){
  it('should return call cost', function(){
    let settingBill = SettingBill();
    settingBill.setCall(1);
    assert.deepEqual({ 
      callCost: 1, 
      callTotal: 0.00, 
      smsTotal: 0.00, 
      grandTotal: 0.00, 
      smsCost: 0,
      warningLevel: 0,
      criticalLevel: 0,
      levels: 'danger'}, settingBill.results());
  });
  it('should return sms cost', function(){
    let settingBill = SettingBill();
    settingBill.setSms(2);
    assert.deepEqual({ 
      callCost: 0, 
      callTotal: 0.00, 
      smsTotal: 0.00, 
      grandTotal: 0.00, 
      smsCost: 2,
      warningLevel: 0,
      criticalLevel: 0,
      levels: 'danger'}, settingBill.results());
  });

  it('should be able to set all call , sms, warning, and critical vlues', function(){
    let settingBill = SettingBill();
    settingBill.setCall(2);
    settingBill.setSms(1);
    settingBill.setWarnings(5);
    settingBill.setCritical(8);
    assert.deepEqual({ 
      callCost: 2.00, 
      callTotal: 0.00, 
      smsTotal: 0.00, 
      grandTotal: 0.00, 
      smsCost: 1.00,
      warningLevel: 5.00,
      criticalLevel: 8.00,
      levels: ''}, settingBill.results());
  });
  it('should return callCost if call radio button is checked and update grandTotal', function(){
    var settingBill = SettingBill();
    settingBill.setCall(2);
    settingBill.setCritical(10);
    settingBill.calculations('call');
    settingBill.calculations('call');
    settingBill.calculations('sms');
    assert.equal(2, settingBill.results().callCost);
    assert.equal(4, settingBill.results().grandTotal);
  });
  it('should return smsCostS if sms radio button is checked and update total', function(){
    let settingBill = SettingBill();
    settingBill.setSms(1.50);
    settingBill.setCritical(10);
    //set calculation entry
    settingBill.calculations('sms');
    assert.equal( 1.50, settingBill.results().smsCost);
    assert.equal(1.50,  settingBill.results().grandTotal);
  });
  it('should return both smsCost and callCost with grandTotal', function(){
    var settingBill = SettingBill();
    settingBill.setCall(2);
    settingBill.setSms(1);
    settingBill.setCritical(10);
    //set calculations entry
    settingBill.calculations('call');
    settingBill.calculations('sms');
    assert.equal(2, settingBill.results().callCost);
    assert.equal(1, settingBill.results().smsCost);
    assert.equal(3, settingBill.results().grandTotal);
  });
  it('should return updated warning level restrictions', function(){
    var settingBill = SettingBill();
    settingBill.setCall(2);
    settingBill.setSms(1);
    settingBill.setWarnings(6);
    settingBill.setCritical(10);
    settingBill.calculations('call');
    settingBill.calculations('call');
    settingBill.calculations('sms');
    settingBill.calculations('sms');
    assert.equal('warning', settingBill.colorRestrictions());
  });
  it('should return updated critical level restrictions', function(){
    var settingBill = SettingBill();
    settingBill.setCall(2);
    settingBill.setSms(1);
    settingBill.setWarnings(6);
    settingBill.setCritical(10);
    settingBill.calculations('call');
    settingBill.calculations('call');
    settingBill.calculations('call');
    settingBill.calculations('call');
    settingBill.calculations('sms');
    settingBill.calculations('sms');
    assert.equal('danger', settingBill.colorRestrictions());
  });
});
