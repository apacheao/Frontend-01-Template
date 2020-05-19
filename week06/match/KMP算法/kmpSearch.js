/**
 * 获取字符串最长公共前后缀长度
 * @param pattern
 * @return {Array}
 */
function getPrefixTable(pattern) {
  let len = 0;         // 最长公共前后缀长度
  let prefixTable = new Array(pattern.length);
  prefixTable[0] = len;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      prefixTable[i] = len;
      i++;
    } else {
      if (len > 0) {
        len = prefixTable[len - 1]
      } else {
        prefixTable[i] = len;
        i++
      }
    }
  }
  return prefixTable
}

/**
 * 将数组向后移动一位
 * @param arr
 * @return arr
 */

function moveRightOneStep(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    arr[i] = arr[i - 1]
  }
  arr[0] = -1;
  return arr;
}

/**
 * 获取pattern在string完全匹配开始的位置
 * @param string
 * @param pattern
 * @return {number}
 */
function kmpSearch(string, pattern) {

  let matchStartIndex = 0;

  let i = 0;  // string  下标
  let j = 0;  // pattern 下标

  let movePrefixTable = moveRightOneStep(getPrefixTable(pattern));

  while (i < string.length) {
    if (j === pattern.length - 1 && pattern[j] === string[i]) {
      matchStartIndex = i - j;
      j = movePrefixTable[j];
    }

    if (string[i] === pattern[j]) {
      i++;
      j++
    } else {
      j = movePrefixTable[j];
      if (j === -1) {
        i++;
        j++;
      }
    }
  }
  return matchStartIndex
}

console.log(kmpSearch('abcbabcbbaacbb', 'babcbba'));
