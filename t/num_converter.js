require('../test_helper.js');
var convert = require('../lib/num_converter.js');

QUnit.test('convert', function() {
  QUnit.expect(65536*2 + 1);
  for(var i=-65536;i<=65536;i++){
    var ret = convert.numToStr(i);
    QUnit.equal(convert.strToNum(ret),i);
  }
});

QUnit.test('convert Array', function() {
  QUnit.expect(2);
  var plus = [];
  var minus = [];
  for(var i=1;i<1000000000000;i=i*10){
    plus.push(i);
    minus.push(i*-1);
  }
  var plusStr = convert.numArrayToStr(plus);
  var minusStr = convert.numArrayToStr(minus);
  QUnit.deepEqual(convert.strToNumArray(plusStr),plus);
  QUnit.deepEqual(convert.strToNumArray(minusStr),minus);
});

QUnit.start();
