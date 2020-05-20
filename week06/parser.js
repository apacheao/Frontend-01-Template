let currentToken = null;
let currentAttribute = null;

function emit(token) {
  //if (token.type !== "text")
  console.log(token);
}

const EOF = Symbol("EOF"); // End Of File

function data(c) {
  if (c === "<") {
    return tagOpen
  } else if (c === EOF) {
    emit({
      type: "EOF"
    });
    return;
  } else {
    emit({
      type: "text",
      content: c
    });
    return data
  }
}

function tagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      name: ""
    };
    return tagName(c)
  } else if (c === '/') {
    return endTagOpen
  } else {
    emit({
      type: "EOF"
    });
    return;
  }
}

function endTagOpen(c) {
  if (c === '>') {
    return data
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    };
    return tagName(c)
  } else {
    emit({
      type: "EOF"
    });
    return;
  }
}

function tagName(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c.toLowerCase();
    return tagName
  } else if (c.match(/^[\t\f\n ]$/)) {
    return beforeAttributeName
  } else if (c === "/") {
    return selfClosingStartTag
  } else if (c === '>') {
    emit(currentToken);
    return data
  } else if (c === EOF) {
    emit(EOF);
  } else {
    currentToken.tagName += c;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\f\n ]$/) || c === "/" || c === ">" || c === EOF) {
    return afterAttributeName(c);
  } else if (c === '=') {
    currentAttribute = {
      name: c,
      value: ""
    };
    return attributeName;
  } else {
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
};

function afterAttributeName(c) {
  if (c.match(/^[\t\f\n ]$/) || c === "/") {
    return selfCloseTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    emit(currentToken);
    return data
  } else if (c === EOF) {
    emit(EOF)
  } else {
    currentAttribute = {
      name: "",
      value: ""
    };
    return attributeName(c)
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\f\n ]$/) || c === "\"") {
    return doubleQuotedAttributeValue
  } else if (c === "'") {
    return singleQuotedAttributeValue
  } else if (c === ">") {
    emit(currentToken);
    return data
  } else {
    return unquotedAttributeValue
  }
}

function doubleQuotedAttributeValue(c) {
  if (c === "\"") {
    return quotedAfterAttributeValue;
  } else if (c === EOF) {
    emit(EOF)
  } else {
    currentAttribute.value += c;
  }
}

function singleQuotedAttributeValue(c) {
  if (c === "'") {
    return quotedAfterAttributeValue;
  } else if (c === EOF) {
    emit(EOF)
  } else {
    currentAttribute.value += c;
  }
}

function unquotedAttributeValue(c) {
  if (c.match(/^[\t\f\n ]$/)) {
    return beforeAttributeName
  } else if (c === ">") {
    emit(currentToken);
    return data
  } else if (c === EOF) {
    emit(EOF);
  } else {
    currentAttribute.value += c;
  }
}

function quotedAfterAttributeValue(c) {
  if (c.match(/^[\t\f\n ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfCloseTag;
  } else if (c === ">") {
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    emit(EOF);
  } else {
    return beforeAttributeName(c);
  }
}

function selfCloseTag(c) {
  if (c === '>') {
    currentToken.isSelfClose = true;
    return data
  } else if (c === EOF) {
    return;
  } else {
    return beforeAttributeName(c)
  }
}

function attributeName(c) {
  if (c === EOF) {
    return afterAttributeName(c);
  } else if (c === "=") {
    return beforeAttributeName;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentAttribute.name += c.toLowerCase();
  } else if (c === "\"" || c === "'" || c === "<") {

  } else {
    currentAttribute.name += c;
    return attributeName
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
  // console.log(html);
};
