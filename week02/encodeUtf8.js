function encodeUtf8(txt) {
    let code = encodeURIComponent(txt);
    let bytes = [];
    for (let i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexUnicode = parseInt(hex, 16);
            bytes.push(hexUnicode)
            i += 2;
        } else {
            bytes.push(c.charCodeAt(0))
        }
    }
    return bytes;
}

function decodeUtf8(bytes) {
    let encoded = "";
    for (let i = 0; i < bytes.length; i++) {
        encoded += '%' + bytes[i].toString(16);
    }
    return decodeURIComponent(encoded);
}

console.log(encodeUtf8('我是谁')); // [230, 136, 145, 230, 152, 175, 232, 176, 129]
console.log(decodeUtf8([230, 136, 145, 230, 152, 175, 232, 176, 129])); // 我是谁
