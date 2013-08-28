exports = module.exports = global;
var util = require("util"),
 QUnit = require('qunitjs'),
 qunitTap = require('qunit-tap').qunitTap;
qunitTap(QUnit, util.puts);
QUnit.init();
QUnit.config.updateRate = 0;
exports.QUnit = QUnit;
global.log = function(type,obj){
  console.log(obj)
}
