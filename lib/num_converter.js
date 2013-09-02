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

NumConverter.strToNum = function(str){
  var chars = str.split("");
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

NumConverter.nBitToStr = function(nBit){
  if(nBit.length <= 6){
    return NumConverter.NumCodeSet[parseInt(nBit,2).toString()];
  }
  var b5 = nBit.substr(0,5);
  var ch = NumConverter.NumCodeSet[parseInt("10" + b5,2)];
  var remain = nBit.substr(5);
  return ch + NumConverter.nBitToStr(remain);
}

NumConverter.strToNumArray = function(sortedNumsStr){
  if(!sortedNumsStr){ return [];}
  var chars = sortedNumsStr.split("");
  var arrs = []
  while(chars.length > 0){
    arrs.push(NumConverter.charsToNum(chars));
  }
  var ret = [];
  var times = 0;
  var first = true;
  var baseNum = null;
  var before = null;
  var sameVal = null;
  while(arrs.length > 0){
    var num = arrs.shift();
    if(first){
      first = false;
      bases = [num];
      before = num;
      sameVal = num;
    }else if(num < 0){
      bases = [];
      for(var i=num+1;i<0;i++){
        var val = before + sameVal;
        bases.push(val);
        before = val;
      }
    }else{
      bases = [before + num];
      before = before + num;
      samveVal = num;
    }
    for(var i=0;i<bases.length;i++){
      var indices = NumConverter.sortedNumSetToDecompress(arrs);
      for(var i=0;i<indices.length;i++){
        ret[indices[i]] = bases[i];
      }
    }
  }
  return ret;
}

NumConverter.sortedNumSetToDecompress = function(sortedNumSet){
  var ret = []
  var sameVal = null;
  var diff = sortedNumSet.shift();
  var before = 0;
  while(diff != -1){
    if(diff >= 0){
      var val = before + diff;
      ret.push(val);
      sameVal = diff;
      before = val;
      diff = sortedNumSet.shift();
    }else{
      for(var i=diff+1;i < 0;i++){
        var val = before + sameVal;
        ret.push(val);
        before = val;
      }
      diff = sortedNumSet.shift();
    }
  }
  return ret;
}


NumConverter.sortedNumSetToCompress = function(sortedNums){
  var before = 0;
  var sameCount = 1;
  var ret = [sortedNums[0]];
  var before = sortedNums[0];
  var sameVal = sortedNums[0];
  for(var i=1;i<sortedNums.length;i++){
    var diff = sortedNums[i] - before;
    if(diff == sameVal){
      sameCount+=1;
    }else{
      if(sameCount != 1){
        ret.push(sameCount * -1);
      }
      ret.push(diff);
      sameCount = 1;
      sameVal = diff;
    }
    before = sortedNums[i];
  }
  if(sameCount != 1){
    ret.push(sameCount * -1);
  }
  ret.push(-1);
  return ret;
}

NumConverter.numArrayToStr = function(nums){
  var ret = "";
  var numSet = {};
  if(nums.length == 0) return "";
  for(var i=0;i<nums.length;i++){
    if(!numSet[nums[i]]) numSet[nums[i]] = [];
    numSet[nums[i]].push(i);
  }
  var numSetSorted = [];
  for(var key in numSet){
    numSetSorted.push(parseInt(key,10));
  }
  numSetSorted.sort(function(a,b){return a - b});
  var baseNums = NumConverter.sortedNumSetToCompress(numSetSorted)
  var before = 0;
  var sameVal = baseNums[0]

  for(var i=0; i < baseNums.length;i++){
    var num = baseNums[i];
    if(i != 0 && num==-1){
      break;
    }
    if(i != 0 && num < 0){
      for(var j = num + 1; j < 0;j++){
        var current = before + sameVal;
        ret+= NumConverter.simpleNumArrayToStr(NumConverter.sortedNumSetToCompress(numSet[current]))
        before = current;
      }
    }else{
      var current = before + num;
      ret += NumConverter.numToStr(num);
      ret += NumConverter.simpleNumArrayToStr(NumConverter.sortedNumSetToCompress(numSet[current]))
      before = current;
      sameVal = num;
    }
  }
  return ret;
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

if (typeof window === 'undefined') {
  module.exports = {
    numToStr: NumConverter.numToStr,
    strToNum: NumConverter.strToNum,
    strToSimpleNumArray: NumConverter.strToSimpleNumArray,
    simpleNumArrayToStr: NumConverter.simpleNumArrayToStr,
    numArrayToStr: NumConverter.numArrayToStr,
    strToNumArray: NumConverter.strToNumArray,
    sortedNumSetToCompress : NumConverter.sortedNumSetToCompress,
    sortedNumSetToDecompress : NumConverter.sortedNumSetToDecompress
  };
}
