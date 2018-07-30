const assert = require('assert');
const settingBill = require('../factoryFunction');
describe('Bill With Settings Widget Tests', function(){
  it('should return call cost', function(){
  let SettingBill = settingBill();
    SettingBill.updateCall(1);
    assert.equal(1, SettingBill.returnUpdateCall());
  });
  it('should return sms cost', function(){
    var SettingBill = settingBill();
    SettingBill.updateSms(1);
    assert.equal(1, SettingBill.returnUpdateSms());
  });

  it('should return call total if call radio button is checked and update total', function(){
    var SettingBill = settingBill();
    SettingBill.billTypeSms('call');
    assert.equal(SettingBill.returnUpdateCall(), SettingBill.returnCall());
  });
  it('should return sms total if sms radio button is checked and update total', function(){
    var SettingBill = settingBill();
    SettingBill.billTypeSms('sms');
    assert.equal(SettingBill.returnUpdateSms(), SettingBill.returnSms());
  });
  it('should return calls and sms total amount', function(){
    var SettingBill = settingBill();
    SettingBill.billTypeCall('call');
    SettingBill.billTypeSms('sms');
    assert.equal('', SettingBill.settingsTotal());
  });
  it('should return updated warning level restrictions', function(){
    var SettingBill = settingBill();
    SettingBill.updateWarning(20);
    assert.equal(20, SettingBill.updateWarning('20'));
  });
  it('should return updated critical level Restrictions', function(){
    var SettingBill = settingBill();
    SettingBill.updateCritical(30);
    assert.equal(30, SettingBill.updateCritical('30'));
  });
});
