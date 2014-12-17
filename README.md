num_converter.js
============

convert number to efficient printable string and vice versa
convert array of number to printable string and vice versa

数値、もしくは数値の配列を短くなるようにascii文字列に変換
変換した文字列を数値、もしくは数値の配列に戻す。

```node.js

    //var convert = require('./lib/num_converter');
    // add package.json "num_converter": "git://github.com/takeshy/num_converter.js.git"
    var convert = require('num_converter');
    //str is "ds}B"
    var str = convert.numToStr(100000);
    //100000
    console.log(convert.strToNum(str)) 

    //arrStr is "VcTcrJf\r_dorIE"
    var arrStr = convert.numArrayToStr([20,50,1000,8124,91111,3]);
    
    //[20,50,1000,8124,91111,3]
    console.log(convert.strToNumArray(arrStr)) 

```

```html

    <script src="/js/num_converter.js"></script>
    <script>
    //str is "ds}B"
    var str = NumConverter.numToStr(100000);
    //100000
    console.log(NumConverter.strToNum(str)) 

    //arrStr is "VcTcrJf\r_dorIE"
    var arrStr = NumConverter.numArrayToStr([20,50,1000,8124,91111,3]);
    
    //[20,50,1000,8124,91111,3]
    console.log(NumConverter.strToNumArray(arrStr)) 
    </script>

```

version 0.2
fix bug  if  -32 continues three times, data is broken after pop()
