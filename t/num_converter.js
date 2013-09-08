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

QUnit.test('pop', function() {
  QUnit.expect(6);
  var val = [1];
  var val2 = [1000,968];
  var val3 = [1000,1000,1000];
  var val4 = [1000,1000,1000,1000];
  var val5 = [999,1000,1001,1002];
  var val6 = [999,1000,1001,1002,1003];

  var ret = convert.numArrayToStr(val);
  var ret2 = convert.numArrayToStr(val2);
  var ret3 = convert.numArrayToStr(val3);
  var ret4 = convert.numArrayToStr(val4);
  var ret5 = convert.numArrayToStr(val5);
  var ret6 = convert.numArrayToStr(val6);

  ret = convert.pop(ret);
  ret2 = convert.pop(ret2);
  ret3 = convert.pop(ret3);
  ret4 = convert.pop(ret4);
  ret5 = convert.pop(ret5);
  ret6 = convert.pop(ret6);

  QUnit.deepEqual(convert.strToNumArray(ret),val.slice(0,val.length - 1));
  QUnit.deepEqual(convert.strToNumArray(ret2),val2.slice(0,val2.length - 1));
  QUnit.deepEqual(convert.strToNumArray(ret3),val3.slice(0,val3.length - 1));
  QUnit.deepEqual(convert.strToNumArray(ret4),val4.slice(0,val4.length - 1));
  QUnit.deepEqual(convert.strToNumArray(ret5),val5.slice(0,val5.length - 1));
  QUnit.deepEqual(convert.strToNumArray(ret6),val6.slice(0,val6.length - 1));
});

QUnit.test('shift', function() {
  QUnit.expect(11);
  var val = [-32];
  var val2 = [-32,0];
  var val3 = [0,0,1000];
  var val4 = [0,0,0,1002];
  var val5 = [30,-32];
  var val6 = [0,-32,2];
  var val7 = [1,1,1,2];
  var val8 = [1,1,1,1];
  var val9 = [1,2,3];
  var val10 = [1,2,3,4];
  var val11 = [1,2,3,4,5];

  var ret = convert.numArrayToStr(val);
  var ret2 = convert.numArrayToStr(val2);
  var ret3 = convert.numArrayToStr(val3);
  var ret4 = convert.numArrayToStr(val4);
  var ret5 = convert.numArrayToStr(val5);
  var ret6 = convert.numArrayToStr(val6);
  var ret7 = convert.numArrayToStr(val7);
  var ret8 = convert.numArrayToStr(val8);
  var ret9 = convert.numArrayToStr(val9);
  var ret10 = convert.numArrayToStr(val10);
  var ret11 = convert.numArrayToStr(val11);

  ret = convert.shift(ret);
  ret2 = convert.shift(ret2);
  ret3 = convert.shift(ret3);
  ret4 = convert.shift(ret4);
  ret5 = convert.shift(ret5);
  ret6 = convert.shift(ret6);
  ret7 = convert.shift(ret7);
  ret8 = convert.shift(ret8);
  ret9 = convert.shift(ret9);
  ret10 = convert.shift(ret10);
  ret11 = convert.shift(ret11);

  QUnit.deepEqual(convert.strToNumArray(ret),[]);
  QUnit.deepEqual(convert.strToNumArray(ret2),[0]);
  QUnit.deepEqual(convert.strToNumArray(ret3),[0,1000]);
  QUnit.deepEqual(convert.strToNumArray(ret4),[0,0,1002]);
  QUnit.deepEqual(convert.strToNumArray(ret5),[-32]);
  QUnit.deepEqual(convert.strToNumArray(ret6),[-32,2]);
  QUnit.deepEqual(convert.strToNumArray(ret7),[1,1,2]);
  QUnit.deepEqual(convert.strToNumArray(ret8),[1,1,1]);
  QUnit.deepEqual(convert.strToNumArray(ret9),[2,3]);
  QUnit.deepEqual(convert.strToNumArray(ret10),[2,3,4]);
  QUnit.deepEqual(convert.strToNumArray(ret11),[2,3,4,5]);
});
QUnit.test('modifyLast', function() {
  QUnit.expect(12);
  var val = [0,1];
  var val2 = [-32,0];
  var val3 = [1000,1000,1000];
  var val4 = [999,1000,1001,1002];
  var val5 = [999,1000,1002];
  var val6 = [999,1000];
  var val7 = [998,999,1000,1001,1001];
  var val8 = [-32,-64,-64];
  var val9 = [-1,-2,-3,-2,-2];
  var val10 = [0,0,-1];
  var val11 = [0,0,0];
  var val12 = [998,999,1000,1001,1002];
  var ret = convert.numArrayToStr(val);
  var ret2 = convert.numArrayToStr(val2);
  var ret3 = convert.numArrayToStr(val3);
  var ret4 = convert.numArrayToStr(val4);
  var ret5 = convert.numArrayToStr(val5);
  var ret6 = convert.numArrayToStr(val6);
  var ret7 = convert.numArrayToStr(val7);
  var ret8 = convert.numArrayToStr(val8);
  var ret9 = convert.numArrayToStr(val9);
  var ret10 = convert.numArrayToStr(val10);
  var ret11 = convert.numArrayToStr(val11);
  var ret12 = convert.numArrayToStr(val12);

  ret = convert.modifyLast(ret,-1);
  ret2 = convert.modifyLast(ret2,-64);
  ret3 = convert.modifyLast(ret3,100);
  ret4 = convert.modifyLast(ret4,2);
  ret5 = convert.modifyLast(ret5,-1);
  ret6 = convert.modifyLast(ret6,-1);
  ret7 = convert.modifyLast(ret7,1);
  ret8 = convert.modifyLast(ret8,-32);
  ret9 = convert.modifyLast(ret9,1);
  ret10 = convert.modifyLast(ret10,1);
  ret11 = convert.modifyLast(ret11,3);
  ret12 = convert.modifyLast(ret12,-1);

  QUnit.deepEqual(convert.strToNumArray(ret),[0,0]);
  QUnit.deepEqual(convert.strToNumArray(ret2),[-32,-64]);
  QUnit.deepEqual(convert.strToNumArray(ret3),[1000,1000,1100]);
  QUnit.deepEqual(convert.strToNumArray(ret4),[999,1000,1001,1004]);
  QUnit.deepEqual(convert.strToNumArray(ret5),[999,1000,1001]);
  QUnit.deepEqual(convert.strToNumArray(ret6),[999,999]);
  QUnit.deepEqual(convert.strToNumArray(ret7),[998,999,1000,1001,1002]);
  QUnit.deepEqual(convert.strToNumArray(ret8),[-32,-64,-96]);
  QUnit.deepEqual(convert.strToNumArray(ret9),[-1,-2,-3,-2,-1]);
  QUnit.deepEqual(convert.strToNumArray(ret10),[0,0,0]);
  QUnit.deepEqual(convert.strToNumArray(ret11),[0,0,3]);
  QUnit.deepEqual(convert.strToNumArray(ret12),[998,999,1000,1001,1001]);
});


QUnit.start();
