/**
 * 我们如何使用状态机处理从 一个字符串中 abcabx
 */
function match(string) {
  let state = start;
  for (let c of string) {
    state = state(c)
  }
  return state === end
}

function end() {
  return end
}

function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

function foundA(c) {
  if (c === 'b') {
    return foundB
  } else {
    return start(c)
  }
}

function foundB(c) {
  if (c === 'c') {
    return foundC
  } else {
    return start(c)
  }
}

function foundC(c) {
  if (c === 'a') {
    return foundSecondA
  } else {
    return start(c)
  }
}

function foundSecondA(c) {
  if (c === 'b') {
    return foundSecondB
  } else {
    return start(c)
  }
}

function foundSecondB(c) {
  if (c === 'x') {
    return end
  } else {
    return foundB(c)
  }
}

console.log(match('i a greabcabcabxat'));
