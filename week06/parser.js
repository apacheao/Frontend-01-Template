let currentToken = null;
let currentAttribute = null;

//将html节点塞进栈中
let stack = [{type: "document", children: []}];

// 文本节点
let currentTextNode = null;

// 创建好 token 后提交
function emit(token) {
    // 获取栈顶元素 由于栈先进后出的特点 因此栈顶元素为栈里最后一个元素
    let top = stack[stack.length - 1];

    if (token.type !== "text") { //处理除 text 类型之外的节点
        if (token.type === "startTag") {
            let element = {
                type: "element",
                children: [],
                attributes: []
            };
            element.tagName = token.tagName;

            for (let p in token) {
                if (p !== "type" && p !== "tagName") {
                    element.attributes.push({
                        name: p,
                        value: token[p]
                    })
                }
            }

            top.children.push(element);
            element.parent = top;
            stack.push(element);

        } else if (token.type === "selfCloseTag") {
            return;
        } else if (token.type === "endTagOpen") {
            if (top.tagName !== token.tagName) {
                throw new Error("start tag not match end tag");
            } else {
                stack.pop()
            }
        }
    } else if (token.type === "text") { //处理 text 类型节点
        if (currentTextNode === null) {
            currentTextNode = {
                type: "text",
                content: ""
            };
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content
    }
}

const EOF = Symbol("EOF"); //End Of File

function data(char) {
    if (char === "<") {
        return tagOpen
    } else if (char === EOF) {
        emit({
            type: "EOF"
        });
        return;
    } else {
        currentToken = {
            type: "text",
            content: char
        };
        emit({
            type: "text",
            content: char
        });
        return data;
    }
}

function tagOpen(char) {
    if (char === "/") {
        return endTagOpen
    } else if (char.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        };
        return tagName(char)
    } else {
        return;
    }
}

function endTagOpen(char) {
    if (char.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTagOpen",
            tagName: ""
        };
        return tagName(char)
    } else {
        return;
    }
}

function tagName(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName(char)
    } else if (char === "/") {
        return selfCloseStartTag
    } else if (char === ">") {
        emit(currentToken);
        return data
    } else if (char.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += char.toLowerCase()
        return tagName
    } else {
        return tagName
    }
}

function beforeAttributeName(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (char === "/" || char === ">" || char === EOF) {
        return afterAttributeName(char);
    } else if (char === "=") {
        return
    } else {
        currentAttribute = {
            name: "",
            value: ""
        };
        return attributeName(char)
    }
}

function attributeName(char) {
    if (char.match(/^[\t\n\f ]$/) || char === "/" || char === ">" || char === EOF) {
        return afterAttributeName(char)
    } else if (char === "=") {
        return beforeAttributeValue
    } else if (char === "\u0000") {
        return;
    } else if (char === "\"" || char === "\'" || char === "<") {
        return attributeName
    } else {
        currentAttribute.name += char;
        return attributeName
    }
}

function afterAttributeName(char) {
    if (char.match(/^[\r\n\f ]$/)) {
        return;
    } else if (char === "/") {
        return selfCloseStartTag
    } else if (char == "=") {
        return beforeAttributeValue
    } else if (char === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken);
        return data
    } else {
        currentAttribute = {
            name: "",
            value: ""
        };
        return attributeName(char)
    }
}

function beforeAttributeValue(char) {
    if (char.match(/^[\r\n\f ]$/)) {
        return;
    } else if (char === "\"") {
        return doubleQuotedAttributeValue
    } else if (char === "\'") {
        return singleQuotedAttributeValue
    } else if (char === ">") {
        emit(currentToken)
    } else {
        return unQuotedAttributeValue(char)
    }
}

function doubleQuotedAttributeValue(char) {
    if (char === "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return quotedAfterAttributeValue
    } else if (char === "\u0000") {
        // return data
    } else if (char === EOF) {
        // return data
    } else {
        currentAttribute.value += char;
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(char) {
    if (char === "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return quotedAfterAttributeValue
    } else if (char === "\u0000") {
        // return data
    } else if (char === EOF) {
        // return data
    } else {
        currentAttribute.value += char;
        return singleQuotedAttributeValue
    }
}

function unQuotedAttributeValue(char) {
    if (char.match(/^[\r\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (char === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken);
        return data
    } else if (char === "/") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfCloseStartTag
    } else if (char === "\u0000") {
        // return data
    } else if (char === "\"" || char === "\'" || char === "<" || char === "=" || char === "`") {
        // return data
    } else if (char === EOF) {
        // return data
    } else {
        currentAttribute.value += char;
        return unQuotedAttributeValue
    }
}

function quotedAfterAttributeValue(char) {
    if (char.match(/^[\r\n\f ]$/)) {
        return beforeAttributeName
    } else if (char === "/") {
        return selfCloseStartTag
    } else if (char === ">") {
        emit(currentToken);
        return data
    } else if (char === EOF) {
        // return data
    } else {
        // return data
    }
}

function selfCloseStartTag(char) {
    if (char === ">") {
        currentToken.isSelfClosing = true;
        currentToken.type = "selfCloseTag";
        emit(currentToken);
        return data;
    } else {
        return;
    }
}

// init FSM(有限状态机)
module.exports.parserHTML = function parserHTML(html) {

    let state = data;

    for (let c of html) {
        state = state(c)
        // console.log(state)
    }
    state = state(EOF);
    console.log(stack[0]);
};
