/**
 * 我们如何使用状态机处理从 一个字符串中 abababx
 */

function match(string) {
  let state = start;
  for (let c of string) {
    state = state(c)
  }
  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundB
  } else {
    return start
  }
}

function foundB(c) {
  if (c === 'b') {
    return found2A
  } else {
    return start(c)
  }
}

function found2A(c) {
  if (c === 'a') {
    return found2B
  } else {
    return start(c)
  }
}

function found2B(c) {
  if (c === 'b') {
    return found3A
  } else {
    return start(c)
  }
}

function found3A(c) {
  if (c === 'a') {
    return found3B
  } else {
    return start(c)
  }
}

function found3B(c) {
  if (c === 'b') {
    return foundX
  } else {
    return start(c)
  }
}

function foundX(c) {
  if (c === 'x') {
    return end
  } else {
    return found3A(c)
  }
}

function end() {
  return end
}

console.log(match('i a greababababxat'));
