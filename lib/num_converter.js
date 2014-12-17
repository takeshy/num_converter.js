/*
The MIT License (MIT)

Copyright (c) 2013 takeshi morita

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var NumConverter = {};
NumConverter.NumCodeSet = {
0:  '!', //0
1:  '#', //1
2:  '$', //10
3:  '%', //11
4:  '&', //100
5:  "'", //101
6:  '(', //110
7:  ')', //111
8:  '*', //1000
9:  '+', //1001
10: ',', //1010
11: '-', //1011
12: '.', //1100
13: '/', //1101
14: '0', //1110
15: '1', //1111
16: '2', //10000
17: '3', //10001
18: '4', //10010
19: '5', //10011
20: '6', //10100
21: '7', //10101
22: '8', //10110
23: '9', //10111
24: ':', //11000
25: ';', //11001
26: '<', //11010
27: '=', //11011
28: '>', //11100
29: '?', //11101
30: '@', //11110
31: 'A', //11111
32: 'B', //100000
33: 'C', //100001
34: 'D', //100010
35: 'E', //100011
36: 'F', //100100
37: 'G', //100101
38: 'H', //100110
39: 'I', //100111
40: 'J', //101000
41: 'K', //101001
42: 'L', //101010
43: 'M', //101011
44: 'N', //101100
45: 'O', //101101
46: 'P', //101110
47: 'Q', //101111
48: 'R', //110000
49: 'S', //110001
50: 'T', //110010
51: 'U', //110011
52: 'V', //110100
53: 'W', //110101
54: 'X', //110110
55: 'Y', //110111
56: 'Z', //111000
57: '[', //111001
58: ']', //111010
59: '^', //111011
60: '_', //111100
61: '`', //111101
62: 'a', //111110
63: 'b', //111111
64: 'c', //1000000
65: 'd', //1000001
66: 'e', //1000010
67: 'f', //1000011
68: 'g', //1000100
69: 'h', //1000101
70: 'i', //1000110
71: 'j', //1000111
72: 'k', //1001000
73: 'l', //1001001
74: 'm', //1001010
75: 'n', //1001011
76: 'o', //1001100
77: 'p', //1001101
78: 'q', //1001110
79: 'r', //1001111
80: 's', //1010000
81: 't', //1010001
82: 'u', //1010010
83: 'v', //1010011
84: 'w', //1010100
85: 'x', //1010101
86: 'y', //1010110
87: 'z', //1010111
88: '{', //1011000
89: '|', //1011001
90: '}', //1011010
91: '~', //1011011
92: "\t",//1011100
93: "\n",//1011101
94: "\r",//1011110
95: " ", //1011111
}

NumConverter.CodeNumSet = {};
for(var k in NumConverter.NumCodeSet){
  NumConverter.CodeNumSet[NumConverter.NumCodeSet[k]] = k;
}

NumConverter.numToStr = function(num){
  if(num >= -32 && num < 32){
    num += 32;
    return NumConverter.NumCodeSet[num.toString()];
  }
  var bias = 64;
  if(num < 0){
    bias = 80;
  }
  var nBit = Math.abs(num).toString(2);
  if(nBit.length == 5){
    nBit = "00000" + nBit
  }else{
    var mod = nBit.length % 5;
    for(var i=0; i < (5 - mod);i++){
      nBit = "0" + nBit;
    }
  }
  var b4 = nBit.substr(0,4);
  var ch = NumConverter.NumCodeSet[parseInt(b4,2) + bias];
  var remain = nBit.substr(4);
  return ch + NumConverter.nBitToStr(remain);
}

NumConverter.nBitToStr = function(nBit){
  if(nBit.length <= 6){
    return NumConverter.NumCodeSet[parseInt(nBit,2).toString()];
  }
  var b5 = nBit.substr(0,5);
  var ch = NumConverter.NumCodeSet[parseInt("10" + b5,2)];
  var remain = nBit.substr(5);
  return ch + NumConverter.nBitToStr(remain);
}

NumConverter.strToNum = function(str){
  var chars = [];
  for(var i=0;i<str.length;i++){
    chars.push(str[i]);
    if(NumConverter.CodeNumSet[str[i]] < 64){
      break;
    }
  }
  return NumConverter.charsToNum(chars);
}

NumConverter.charsToNum = function(chars){
  var ch = chars.shift();
  var n = NumConverter.CodeNumSet[ch];
  if(n < 64){
    return n - 32;
  }
  var sign = 1;
  if(n >= 80){
    sign = -1;
    n -= 80;
  }else{
    n -= 64;
  }
  var bits = n.toString(2);
  ch = chars.shift();
  while(ch){
    n = parseInt(NumConverter.CodeNumSet[ch],10);
    if(n < 64){
      var b = n.toString(2);
      var prefix = 6 - b.length;
      while(prefix){
        b = "0" + b;
        prefix -=1;
      }
      bits = bits + b;
      break;
    }
    bits += n.toString(2).substr(2);
    ch = chars.shift();
  }
  return parseInt(bits,2) * sign;
}

NumConverter.strToSimpleNumArray = function(str){
  var chars = str.split("");
  var ret = []
  while(chars.length > 0){
    ret.push(NumConverter.charsToNum(chars));
  }
  return ret;
}

NumConverter.simpleNumArrayToStr = function(nums){
  var ret = "";
  for(var i=0;i<nums.length;i++){
    ret += NumConverter.numToStr(nums[i]);
  }
  return ret;
}

NumConverter.strToNumArray = function(str){
  return NumConverter.inflateNumArray(NumConverter.strToSimpleNumArray(str));
}

NumConverter.numArrayToStr = function(arr){
  return NumConverter.simpleNumArrayToStr(NumConverter.deflateNumArray(arr));
}

NumConverter.inflateNumArray = function(arr){
  var ret = []
  var before = 0;
  var sameVal = null;
  while(arr.length > 0){
    var num = arr.shift();
    if(num == -32){
      var times = arr.shift();
      if(times == 0){
        var val = before + num;
        ret.push(val);
        before = val;
        sameVal = num;
      }else{
        if(times > 0){
          for(var i=0;i<times;i++){
            ret.push(before);
          }
        }else{
          for(var i=times;i<0;i++){
            ret.push(before + sameVal);
            before = before + sameVal;
          }
        }
      }
    }else{
      var val = before + num;
      ret.push(val);
      before = val;
      sameVal = num;
    }
  }
  return ret;
}

NumConverter.deflateNumArray = function(nums){
  var before = 0;
  var arr = [];
  var sameVal = null;
  var sameCount = 0;
  var zeroCount = 0;
  for(var i=0;i<nums.length;i++){
    var diff = nums[i] - before;
    if(diff == 0){
      zeroCount +=1;
      sameFlush()
      sameVal = 0;
    }else if(diff == sameVal){
      sameCount+=1;
      zeroFlush()
    }else{
      zeroFlush();
      sameFlush();
      sameVal = diff;
      arr.push(diff);
      if(diff == -32){
        arr.push(0);
      }
    }
    before = nums[i];
  }
  zeroFlush();
  sameFlush();
  return arr

  function sameFlush(){
    if(sameCount != 0){
      if(sameCount < 2){
        for(var j=0;j<sameCount;j++){
          arr.push(sameVal);
          if(sameVal == -32){
            arr.push(0);
          }
        }
      }else{
        arr.push(-32);
        arr.push(sameCount * -1);
      }
    }
    sameCount = 0;
  }
  function zeroFlush(){
    if(zeroCount != 0){
      if(zeroCount == 1){
        arr.push(0);
      }else{
        arr.push(-32);
        arr.push(zeroCount);
      }
    }
    zeroCount = 0;
  }
}

NumConverter.first = function(str){
  if(!str) return null;
  var numStr = "";
  for(var i=0;i<str.length;i++){
    numStr = numStr + str[i];
    if(NumConverter.CodeNumSet[str[i]] < 64){
      break;
    }
  }
  return NumConverter.strToNum(numStr);
}

NumConverter.last = function(str){
  if(!str) return null;
  var numStr = str[str.length - 1];
  var i = str.length - 1;
  while(i > 0){
    i = i - 1;
    if(NumConverter.CodeNumSet[str[i]] < 64){
      break;
    }
    numStr = str[i] + numStr;
  }
  return NumConverter.strToNum(numStr);
}

NumConverter.simpleShift = function(str){
  if(str.length == 0) return "";
  var i = 0;
  while(i < str.length){
    if(NumConverter.CodeNumSet[str[i]] < 64){
      break;
    }
    i=i+1;
  }
  return str.substring(i+1);
}

NumConverter.simplePop = function(str){
  var ret = "";
  if(str.length == 0) return ret;
  var i = str.length - 1;
  while(i >= 0){
    i = i - 1;
    if(NumConverter.CodeNumSet[str[i]] < 64){
      break;
    }
  }
  return str.substring(0,i+1);
}

NumConverter.at = function(str,idx){
  var str;
  if(idx >= 0){
    for(var i=0;i<idx;i++){
      str = NumConverter.simpleShift(str);
      if(!str){return null}
    }
    return NumConverter.first(str);
  }else{
    for(var i=idx+1;i<0;i++){
      str = NumConverter.simplePop(str);
      if(!str){return null}
    }
    return NumConverter.last(str);
  }
}

NumConverter.pop = function(str){
  if(NumConverter.at(str,-2) != -32){
    return NumConverter.simplePop(str);
  }
  var last = NumConverter.last(str);
  if(last == 0){
      str = NumConverter.simplePop(str);
      return NumConverter.simplePop(str);
  }else if(last == 2){
    str = NumConverter.simplePop(str);
    str = NumConverter.simplePop(str);
    return str + NumConverter.numToStr(0);
  }else if(last > 2){
    str = NumConverter.simplePop(str);
    return str + NumConverter.numToStr(last - 1);
  }else if(last == -2){
    var lastTwoBefore = NumConverter.at(str,-3);
    var lastThreeBefore = 0
    if(str.length > 3){
       lastThreeBefore = NumConverter.at(str,-4);
    }
    str = NumConverter.simplePop(str);
    str = NumConverter.simplePop(str);
    if(lastTwoBefore == 0 && lastThreeBefore == -32){
      return str + NumConverter.numToStr(-32) + NumConverter.numToStr(0);
    }else{
      return str + NumConverter.numToStr(lastTwoBefore);
    }
  }else if(last < -2){
    str = NumConverter.simplePop(str);
    return str + NumConverter.numToStr(last + 1);
  }
}

NumConverter.shift = function(str){
  if(str.length < 2){
    return "";
  }
  var first = NumConverter.first(str);
  var str1 = NumConverter.simpleShift(str);
  var second = NumConverter.first(str1);
  var str2 = NumConverter.simpleShift(str1);
  var third = NumConverter.first(str2);
  var str3 = NumConverter.simpleShift(str2);

  if(first == -32){
    if(second == 0){
      if(third == null){
        return "";
      }
      if(third == -32){
        var fourth = NumConverter.first(str3);
        var str4 = NumConverter.simpleShift(str3);
        if(fourth == 0){
          return appendStr(- 32) + str4;
        }
        if(fourth == 2){
          return appendStr(- 32) + appendStr(0) + str4;
        }
        if(fourth > 2){
          return appendStr(- 32) + NumConverter.numToStr(-32) + NumConverter.numToStr(fourth - 1)
        }
        if(fourth == -2){
          return  appendStr(-64) +  appendStr(-32) + str4;
        }
        if(fourth == -3){
          return  appendStr(-64) +  appendStr(-32) + appendStr(-32) + str4;
        }
        if(fourth < -3){
          return  appendStr(-64) +  appendStr(-32) + NumConverter.numToStr(-32) + NumConverter.numToStr(fourth+2) + str4;
        }
      }else{
        return appendStr(third - 32)  + str3;
      }
    }
    if(second == 2){
      return NumConverter.numToStr(0) + str2;
    }
    return NumConverter.simpleNumArrayToStr([-32,second - 1]) + str2;
  }
  if(second != -32){
    if(third != -32){
      return appendStr(first + second) + str2;
    }else{
      var fourth = NumConverter.first(str3);
      var str4 = NumConverter.simpleShift(str3);
      if(fourth >= 0){
        return appendStr(first + second) + str2;
      }
      if(fourth == -2){
        return  appendStr(first + second) +  appendStr(second) + appendStr(second) + str4;
      }
      if(fourth < -2){
        return  appendStr(first + second) +  appendStr(second) + NumConverter.numToStr(-32) + NumConverter.numToStr(fourth+1) + str4;
      }
    }
  }
  if(third == 0){
    var fourth = NumConverter.first(str3);
    var str4 = NumConverter.simpleShift(str3);
    if(fourth == -32){
      var fifth = NumConverter.first(str4);
      var str5 = NumConverter.simpleShift(str4);
      if(fifth == -2){
        return appendStr(first - 32) + appendStr(-32) +  appendStr(-32) + str5;
      }
      if(fifth< -2){
        return  appendStr(first - 32) +  appendStr(-32) + NumConverter.numToStr(-32) + NumConverter.numToStr(fifth+1) + str5;
      }
    }
    return appendStr(first - 32) + str3;
  }
  if(third == 2){
    return NumConverter.numToStr(first) + NumConverter.numToStr(0) + str3;
  }
  if(third > 2){
    return NumConverter.simpleNumArrayToStr([first,-32,third - 1]) + str3;
  }
  if(third == -2){
    return NumConverter.simpleNumArrayToStr([first*2,first]) + str3;
  }
  if(third == -3){
    return NumConverter.simpleNumArrayToStr([first*2,first,first]) + str3;
  }
  if(third < -3){
    return NumConverter.simpleNumArrayToStr([first*2,first,-32,third + 2]) + str3;
  }
  function appendStr(num){
    if(num == -32){
      return NumConverter.simpleNumArrayToStr([-32,0])
    }
    return NumConverter.numToStr(num)
  }
}

NumConverter.push = function(str,val){
  var beforeLast = NumConverter.at(str,-2);
  var last = NumConverter.last(str);
  var appendStr = NumConverter.numToStr(val);
  if(val == -32){
    appendStr += NumConverter.numToStr(0);
  }
  if(beforeLast != -32){
    if(val == 0){
      if(last == 0){
        str = NumConverter.simplePop(str);
        return str + NumConverter.simpleNumArrayToStr([-32,2]);
      }
      return str + appendStr;
    }
    if(last == val){
      var twoBeforeLast = NumConverter.at(str,-3);
      if(twoBeforeLast == -32){
        return str + appendStr;
      }
      if(beforeLast == val){
        str = NumConverter.simplePop(str);
        return str + NumConverter.simpleNumArrayToStr([-32,-2]);
      }
      return str + appendStr;
    }
    return str + appendStr;
  }
  //beforeLast is -32
  if(last == 0){
    if(val == -32){
      var twoBeforeLast = NumConverter.at(str,-3);
      var threeBeforeLast = NumConverter.at(str,-4);
      if(twoBeforeLast == 0 && threeBeforeLast == -32){
        str = NumConverter.simplePop(str);
        str = NumConverter.simplePop(str);
        str = NumConverter.simplePop(str);
        str = NumConverter.simplePop(str);
        return str + NumConverter.simpleNumArrayToStr([-32,0,-32,-2]);
      }
    }
    return str + appendStr;
  }
  if(last > 1){
    if(val == 0){
      str = NumConverter.simplePop(str);
      return str + NumConverter.numToStr(last + 1);
    }
    return str + appendStr;
  }
  if(last < -1){
    var twoBeforeLast = NumConverter.at(str,-3);
    if(val == twoBeforeLast){
      str = NumConverter.simplePop(str);
      return str + NumConverter.numToStr(last - 1);
    }
    return str + appendStr;
  }
}

NumConverter.lastValue = function(str,val){
  var last = NumConverter.last(str);
  var beforeLast = NumConverter.at(str,-2);
  var twoBeforeLast = NumConverter.at(str,-3);

  if(beforeLast != -32){
    return last;
  }
  if(last == 0){
    return -32;
  }
  if(last > 1){
    return 0;
  }
  if(last < -1){
    if(twoBeforeLast == 0){
      var threeBeforeLast = NumConverter.at(str,-4);
      if(threeBeforeLast == -32){
        return -32;
      }
    }
    return twoBeforeLast;
  }
}

NumConverter.modifyLast = function(str,val){
  var last = NumConverter.lastValue(str);
  str = NumConverter.pop(str);
  return NumConverter.push(str,last+val);
}

if (typeof window === 'undefined') {
  module.exports = {
    numToStr: NumConverter.numToStr,
    strToNum: NumConverter.strToNum,
    simpleNumArrayToStr: NumConverter.simpleNumArrayToStr,
    strToSimpleNumArray: NumConverter.strToSimpleNumArray,
    strToNumArray: NumConverter.strToNumArray,
    numArrayToStr: NumConverter.numArrayToStr,
    inflateNumArray: NumConverter.inflateNumArray,
    deflateNumArray: NumConverter.deflateNumArray,
    simplePop: NumConverter.simplePop,
    simpleShift: NumConverter.simpleShift,
    last: NumConverter.last,
    first: NumConverter.first,
    at: NumConverter.at,
    pop: NumConverter.pop,
    push: NumConverter.push,
    shift: NumConverter.shift,
    modifyLast: NumConverter.modifyLast
  };
}

