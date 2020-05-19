/**
 * 从一个字符串 string 中找到 ab
 */

function match(string) {
  let foundA = false;
  for (let c of string) {
    if (c === 'a') {
      foundA = true;
    } else if (foundA && c === 'b') {
      return true;
    } else {
      foundA = false;
    }
  }
  return false
}

let matchResult = match('i abm great');

console.log(matchResult);
