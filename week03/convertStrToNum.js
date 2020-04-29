// 获取码点
function getCodePoint(char) {
  if (/\d/.test(char)) return char.codePonitAt(0) - '0'.codePointAt(0);
  if (/[a-fA-F]/.test(char)) return (char.toUpperCase()).codePonitAt(0) - 'a'.codePointAt(0) + 10;
  throw Error('should input legal string');
}

// 转Number
function convertStrToNum(str, radix = 10) {
   const chars = str.split('');
   const charsLen = chars.length;
   let number = 0;
   let i = 0;
   while (i < charsLen && chars[i] !== '.') {
     number *= radix;
     number += getCodePoint(chars[i]);
     i++
   }
   if (chars[i] === '.') {
     i++
   }
   while(i < charsLen) {
     fraction /= radix;
     number += getCodePoint(chars[i]) * fraction;
     i++;
   }
   return number
}
