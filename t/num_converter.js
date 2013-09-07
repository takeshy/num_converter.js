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

QUnit.test('tick', function() {
  QUnit.expect(1);
  var val = [ 13128, 13127, 13127, 13126, 13125, 13127, 13127, 13127 ]
  var ret = convert.numArrayToStr(val);
  QUnit.deepEqual(convert.strToNumArray(ret),val);
});

QUnit.test('repeat chara', function() {
  QUnit.expect(1);
  var val = [];
  for(var i=0;i<=33;i++){
    val.push( -32 * i);
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

QUnit.test('simplePop', function() {
  QUnit.expect(3);
  var val = [1]
  var val2 = [102422,-243322]
  var val3 = [-32,344]
  var ret = convert.simpleNumArrayToStr(val);
  var ret2 = convert.simpleNumArrayToStr(val2);
  var ret3 = convert.simpleNumArrayToStr(val3);
  ret = convert.simplePop(ret);
  ret2 = convert.simplePop(ret2);
  ret3 = convert.simplePop(ret3);
  QUnit.deepEqual(convert.strToSimpleNumArray(ret),val.slice(0,val.length - 1));
  QUnit.deepEqual(convert.strToSimpleNumArray(ret2),val2.slice(0,val2.length - 1));
  QUnit.deepEqual(convert.strToSimpleNumArray(ret3),val3.slice(0,val3.length - 1));
});

QUnit.test('simpleShift', function(){
  QUnit.expect(3);
  var val = [1]
  var val2 = [102422,-243322]
  var val3 = [-32,344]
  var ret = convert.simpleNumArrayToStr(val);
  var ret2 = convert.simpleNumArrayToStr(val2);
  var ret3 = convert.simpleNumArrayToStr(val3);
  ret = convert.simpleShift(ret);
  ret2 = convert.simpleShift(ret2);
  ret3 = convert.simpleShift(ret3);
  QUnit.deepEqual(convert.strToSimpleNumArray(ret),val.slice(1));
  QUnit.deepEqual(convert.strToSimpleNumArray(ret2),val2.slice(1));
  QUnit.deepEqual(convert.strToSimpleNumArray(ret3),val3.slice(1));
});

QUnit.test('first', function() {
  QUnit.expect(3);
  var val = [1]
  var val2 = [102422,-243322]
  var val3 = [-32,344]
  var ret = convert.simpleNumArrayToStr(val);
  var ret2 = convert.simpleNumArrayToStr(val2);
  var ret3 = convert.simpleNumArrayToStr(val3);
  QUnit.equal(convert.first(ret),1);
  QUnit.equal(convert.first(ret2),102422)
  QUnit.equal(convert.first(ret3),-32);
});

QUnit.test('last', function() {
  QUnit.expect(3);
  var val = [1]
  var val2 = [102422,-243322]
  var val3 = [-32,344]
  var ret = convert.simpleNumArrayToStr(val);
  var ret2 = convert.simpleNumArrayToStr(val2);
  var ret3 = convert.simpleNumArrayToStr(val3);
  QUnit.equal(convert.last(ret),1);
  QUnit.equal(convert.last(ret2),-243322);
  QUnit.equal(convert.last(ret3),344);
});

QUnit.test('at', function() {
  QUnit.expect(6);
  var val = convert.simpleNumArrayToStr([102422,-243322]);
  QUnit.equal(convert.at(val,0),102422);
  QUnit.equal(convert.at(val,1),-243322);
  QUnit.equal(convert.at(val,2),null);
  QUnit.equal(convert.at(val,-1),-243322);
  QUnit.equal(convert.at(val,-2),102422);
  QUnit.equal(convert.at(val,-3),null);
});

QUnit.start();
