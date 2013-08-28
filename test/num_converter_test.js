it('convert num array', function() {
  var plus = [];
  var minus = [];
  for(var i=1;i<1000000000000;i=i*10){
    plus.push(i);
    minus.push(i*-1);
  }
  var plusStr = NumConverter.numArrayToStr(plus);
  var minusStr = NumConverter.numArrayToStr(minus);
  expect(NumConverter.strToNumArray(plusStr)).to.eql(plus);
  expect(NumConverter.strToNumArray(minusStr)).to.eql(minus);
});
