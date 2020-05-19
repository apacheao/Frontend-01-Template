/**
 * 从一个字符串 string 中找到 a
 */

function match(string) {
  for (let c of string) {
    if (c === 'a') {
      return true
    }
  }
  return false
}

match('i am great');
