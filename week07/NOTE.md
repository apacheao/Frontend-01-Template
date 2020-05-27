

通过 Toy Browser 可以从底层了解到：
1. 从client端send request后，server端成功接收后并作出向 client 发送一段HTML字符串
2. client 解析 server 发送过来的HTML
    -client 利用状态机将 HTML 部分解析成 DOM树（[解析规则](https://html.spec.whatwg.org/multipage/parsing.html#data-state)）
    -client 将 CSS 部分解析成 CSSOM
3. computed CSS
    -收集rules
    -match selector & rules
    -将 mtached 后的 declerations 添加进element 
4. layout
    -normal flow
    -flex box
    -grids
5. render
