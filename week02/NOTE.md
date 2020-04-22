### week-01问题描述：
```
(1) 写一个正则表达式 匹配所有 Number 直接量

(2) 写一个 UTF-8 Encoding 的函数

(3) 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

(4) week-02 第二周总结
```

1. [解答过程](https://github.com/apacheao/Frontend-01-Template/blob/master/week02/NumericLiteral.md) 
```
(0|[1-9][0-9])|(.[0-9])|[eE]|([+-]?[0-9])|([ob|oB][01])|([0o|0O][0-9])|([0x|0X][0-9a-fA-F]) 
```

2. [解答过程](https://github.com/apacheao/Frontend-01-Template/blob/master/week02/encodeUtf8.js)

3. [解答过程](https://github.com/apacheao/Frontend-01-Template/blob/master/week02/StringLiteral.md)
```
"(^(\r\n\u2028\u2029\\)|\u2028|\u2029|\\|\\['"\bfnrtv] | [^'"\bfnrtvdxu\r\n\u2028\u2029] | [xu][0-9] | x?[0-9a-fA-F] | u[0-9]{4}|\\(\r\n|[\r\n\u2028\u2029]))*")|'([^'\r\n\u2028\u2029\\]|\u2028|\u2029|\\((['"\bfnrtv]|[^'"\bfnrtvdxu\r\n\u2028\u2029])|0(?!d)|x[0-9a-fA-F][0-9a-fA-F]|(u[0-9a-fA-F]{4}|u{(0[0-9a-fA-F]{5}|10[0-9a-fA-F]{4}|[0-9a-fA-F]{1,4})}))|\\(\r\n|[\r\n\u2028\u2029]))*') 
```

**二周总结**：
[week-02总结](https://github.com/apacheao/blog/issues/8)
