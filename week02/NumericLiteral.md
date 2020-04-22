**NumericLiteral::**
 
-   DecimalLiteral
-   BinaryIntegerLiteral
-   OctalIntegerLiteral
-   HexIntegerLiteral

**关于DecimalLiteral**

**DecimalLiteral::**

-  DecimalIntegerLiteral | .DecimalDigits(opt) | ExponentPart(opt)

 **DecimalIntegerLiteral::** 

-  0
-  NonZeroDigit | DecimalDigits(opt)

**DecimalDigit::**
    one of [0123456789]

**NonZeroDigit::**
   one of [123456789]

**ExponentPart**
   ExponentIndicator | SignedInteger

**ExponentIndicator**
   one of [eE]

**SignedInteger**
    DecimalDigits | +DecimalDigits | -DecimalDigits

因此我们通过逆推可以得出 
DecimalIntegerLiteral 的正则为  (0|[1-9][0-9])
.DecimalDigits(opt) 的正则为 (.[0-9])
ExponentPart(opt) 的正则为 [eE] | ([+-]?[0-9])


关于BinaryIntegerLiteral
**BinaryIntegerLiteral**

BinaryIntegerLiteral
0b BinaryDigits | 0B BinaryDigits

BinaryDigits 
one of [01]

因此我们通过逆推可以得出 
BinaryIntegerLiteral的正则为  ([ob | oB][01])


关于OctalIntegerLiteral
**OctalIntegerLiteral**

OctalIntegerLiteral
0o OctalDigits | 0O OctalDigits

OctalDigits 
one of [01234567]

因此我们通过逆推可以得出 
OctalIntegerLiteral的正则为  ([0o | 0O][0-9])

关于HexIntegerLiteral
**HexIntegerLiteral**

HexIntegerLiteral
0x HexDigits | 0X HexDigits

HexDigits
one of [0123456789abcdefABCDEF]

因此我们通过逆推可以得出 
HexIntegerLiteral的正则为  ([0x | 0X][0-9a-fA-F])

总结可以得出 匹配所有 Number 直接量 的 正则 为：
(0|[1-9][0-9])|(.[0-9])|[eE]|([+-]?[0-9])|([ob|oB][01])|([0o|0O][0-9])|([0x|0X][0-9a-fA-F])
 


  
