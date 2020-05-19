/**
 * 从一个字符串 string 中找到 abcdef
 */

function match(string) {
  let foundA = false;
  let fountB = false;
  let foundC = false;
  let fountD = false;
  let foundE = false;
  for (let c of string) {
    if (c === 'a') {
      foundA = true
    } else if (foundA && c === 'b') {
      fountB = true;
    } else if (fountB && c === 'c') {
      foundC = true;
    } else if (foundC && c === 'd') {
      fountD = true;
    } else if (fountD && c === 'e') {
      foundE = true;
    } else if (foundE && c === 'f') {
      return true;
    } else {
      foundA = false;
      fountB = false;
      foundC = false;
      fountD = false;
      foundE = false;
    }
  }
  return false
}

console.log(match('i amabcdef great'));
