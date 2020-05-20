let currentToken = null;
let currentAttribute = null;

function emit(token) {
  if (token.type !== "text")
    console.log(token)
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
  if (c === "/") {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
    };
    return tagName(c)
  } else {
    // return data
  }
}


function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    };
    return tagName(c)
  } else if (c === ">") {
    // return data
  } else if (c === EOF) {
    // return data
  }
}


function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName(c)
  } else if (c === "/") {
    return selfClosingStartTag
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c.toLowerCase();
    return tagName
  } else if (c === ">") {
    emit(currentToken);
    return data
  } else {
    return tagName
  }
}


function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === ">" || c === "/" || c === EOF) {
    return afterAttributeName(c)
  } else if (c === "=") {
    return;
  } else {
    currentAttribute = {
      name: "",
      value: ""
    };
    return attributeName(c)
  }
}

function afterAttributeName(c) {
  if (c === "/") {
    return selfClosingStartTag
  } else if (c === EOF) {
    return;
  } else {
    emit(currentToken);
    return data
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return afterAttributeName(c)
  } else if (c === "=") {
    return beforeAttributeValue
  } else if (c === "\u0000") {
    // return data
  } else if (c === "\"" || c === "\'" || c === "<") {
    return attributeName
  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return beforeAttributeValue
  } else if (c === "\"") {
    return doubleQuotedAttributeValue
  } else if (c === "\'") {
    return singleQuotedAttributeValue
  } else if (c === ">") {
    emit(currentToken)
    // return data
  } else {
    return UnquotedAttributeValue(c)
  }
}

function doubleQuotedAttributeValue(c) {
  if (c === "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c === "\u0000") {
    // return data
  } else if (c === EOF) {
    // return data
  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(c) {
  if (c === "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c === "\u0000") {
    // return data
  } else if (c === EOF) {
    // return data
  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === "/") {
    return selfClosingStartTag
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken);
    return data
  } else if (c === EOF) {
    // return data
  } else {
    // return data
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    // emit(currentToken)
    return beforeAttributeName
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value
    // emit(currentToken)
    return selfClosingStartTag
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken);
    return data
  } else if (c === "\u0000") {
    // return data
  } else if (c === "\"" || c === "\'" || c === "<" || c === "=" || c === "`") {
    // return data
  } else if (c === EOF) {
    // return data
  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue
  }
}


function selfClosingStartTag(c) {
  if (c === ">" || c === "/") {
    currentToken.isSelfClosing = true
    currentToken.type = "selfClosingTag"
    emit(currentToken)
    return data
  } else if (c === "EOF") {
    // return data
  } else {
    // return data
  }
}

module.exports.parseHTML = function parseHTML(html) {

  let state = data;

  for (let c of html) {
    state = state(c)
    // console.log(state)
  }
  state = state(EOF)
};
