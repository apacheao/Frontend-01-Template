**StringLiteral::**
  由两部分组成
  
1.   "DoubleStringCharactersopt"
2.   'SingleStringCharactersopt'

**DoubleStringCharacters(opt)**
   DoubleStringCharacter | DoubleStringCharacters(opt)
   
**DoubleStringCharacter** 
  SourceCharacter **but not one** of (" or \ or LineTerminator <LS> <PS> \EscapeSequence | LineContinuation)
  
  由于式子较长 我们先来看 _or \ or LineTerminator <LS> <PS>_ 这部分
  
  LineTerminator => <LF> | <CR> | <LS> | <PS>  <=> \r | \n | \u2028 | \u2029
  
   [^(\r\n\u2028\u2029\\)|\u2028|\u2029|\\]
   
  在看一下 _\EscapeSequence | LineContinuation_
  
  EscapeSequence 由四部分组成 CharacterEscapeSequence | 0[lookahead ∉ DecimalDigit] | HexEscapeSequence | UnicodeEscapeSequence
  
  \EscapeSequence => \\['"\bfnrtv] | [^'"\bfnrtvdxu\r\n\u2028\u2029] | [xu][0-9] | x?[0-9a-fA-F] | u[0-9]{4}
  
  LineContinuation 由\LineTerminatorSequence组成
  \LineTerminatorSequence => \\(\r\n|[\r\n\u2028\u2029]))*
  
  总结：DoubleStringCharactersopt => "(^(\r\n\u2028\u2029\\)|\u2028|\u2029|\\|\\['"\bfnrtv] | [^'"\bfnrtvdxu\r\n\u2028\u2029] | [xu][0-9] | x?[0-9a-fA-F] | u[0-9]{4}|\\(\r\n|[\r\n\u2028\u2029]))*")
  
  同理：SingleStringCharactersopt => '([^'\r\n\u2028\u2029\\]|\u2028|\u2029|\\((['"\bfnrtv]|[^'"\bfnrtvdxu\r\n\u2028\u2029])|0(?!d)|x[0-9a-fA-F][0-9a-fA-F]|(u[0-9a-fA-F]{4}|u{(0[0-9a-fA-F]{5}|10[0-9a-fA-F]{4}|[0-9a-fA-F]{1,4})}))|\\(\r\n|[\r\n\u2028\u2029]))*')
  
  StringLiteral的正则表达式为："(^(\r\n\u2028\u2029\\)|\u2028|\u2029|\\|\\['"\bfnrtv] | [^'"\bfnrtvdxu\r\n\u2028\u2029] | [xu][0-9] | x?[0-9a-fA-F] | u[0-9]{4}|\\(\r\n|[\r\n\u2028\u2029]))*")|'([^'\r\n\u2028\u2029\\]|\u2028|\u2029|\\((['"\bfnrtv]|[^'"\bfnrtvdxu\r\n\u2028\u2029])|0(?!d)|x[0-9a-fA-F][0-9a-fA-F]|(u[0-9a-fA-F]{4}|u{(0[0-9a-fA-F]{5}|10[0-9a-fA-F]{4}|[0-9a-fA-F]{1,4})}))|\\(\r\n|[\r\n\u2028\u2029]))*')
  
