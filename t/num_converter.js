require('../test_helper.js');
var convert = require('../lib/num_converter.js');

QUnit.test('convert', function() {
  QUnit.expect(1024*2 + 1);
  for(var i=-1024;i<=1024;i++){
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

QUnit.test('inflate deflate', function() {
  QUnit.expect(1);
  var val = [];
  var rep = []
  for(var i=0;i<=300;i++){
    rep.push(9900+Math.floor( Math.random() * 300));
  }
  for(var i=0;i<=1000;i++){
    val.push( rep[Math.floor( Math.random() * 300)]);
  }
  var ret = convert.deflateNumArrayToStr(val);
  var ret2 = convert.numArrayToStr(val);
  console.log(ret.length);
  console.log(ret2.length);
  QUnit.deepEqual(convert.inflateNumArrayFromStr(ret),val);
});

QUnit.start();
