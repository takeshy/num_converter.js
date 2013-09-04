require('../test_helper.js');
var convert = require('../lib/num_converter.js');

//QUnit.test('convert', function() {
//  QUnit.expect(1024*2 + 1);
//  for(var i=-1024;i<=1024;i++){
//    var ret = convert.numToStr(i);
//    QUnit.equal(convert.strToNum(ret),i);
//  }
//});
//
//QUnit.test('convert Array', function() {
//  QUnit.expect(2);
//  var plus = [];
//  var minus = [];
//  for(var i=1;i<1000000000000;i=i*10){
//    plus.push(i);
//    minus.push(i*-1);
//  }
//  var plusStr = convert.numArrayToStr(plus);
//  var minusStr = convert.numArrayToStr(minus);
//  QUnit.deepEqual(convert.strToNumArray(plusStr),plus);
//  QUnit.deepEqual(convert.strToNumArray(minusStr),minus);
//});

QUnit.test('continuous', function() {
  QUnit.expect(1);
  var val = [];
  for(var i=-100;i<=100;i++){
    val.push(i);
  }
  var ret = convert.numArrayToStr(val);
  QUnit.deepEqual(convert.strToNumArray(ret),val);
});

QUnit.test('repeat chara', function() {
  QUnit.expect(1);
  var val = [];
  var rep = [32,0,-32];
  for(var i=0;i<=1000;i++){
    val.push( rep[Math.floor( Math.random() * 3)]);
  }
  var ret = convert.numArrayToStr(val);
  QUnit.deepEqual(convert.strToNumArray(ret),val);
});

QUnit.test('repeat', function() {
  QUnit.expect(3);
  var val = [1,2,3,4,0];
  var val2 = [0,1,2,3,4,0,0,1,0,0];
  var val3 = [0,0,0,1,2,3,4,1,1,0,0,1,0,0,0];
  var ret = convert.numArrayToStr(val);
  var ret2 = convert.numArrayToStr(val2);
  var ret3 = convert.numArrayToStr(val3);
  QUnit.deepEqual(convert.strToNumArray(ret),val);
  QUnit.deepEqual(convert.strToNumArray(ret2),val2);
  QUnit.deepEqual(convert.strToNumArray(ret3),val3);
});

QUnit.start();
