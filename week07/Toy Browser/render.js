const images = require("images");

function render(viewport, element) {
  if (element.computedStyle && JSON.stringify(element.computedStyle) !== "{}") {
    var img = images(parseInt(element.computedStyle.width.value.split('px')[0]), parseInt(element.computedStyle.height.value.split('px')[0]));
    if (element.computedStyle["background-color"].value) {
        let color = element.computedStyle["background-color"].value;
        console.log(color)
        color.match(/rgb\((\d+),(\d+),(\d+)\)/);
        img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1);
        viewport.draw(img, 20, 30);
    }
  }

  if (element.children) {
    for (var child of element.children) {
      render(viewport, child)
    }
  }
}

module.exports = render;
