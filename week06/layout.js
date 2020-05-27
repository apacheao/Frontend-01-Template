/**
 *
 * @param element
 */
function layout(element) {
  if (!element.computedStyle) {
    return
  }
  const elementStyle = getStyle(element);

  //只考虑display为flex的情况
  if (elementStyle.display !== "flex") {
    return
  }

  var items = element.children.filter(item => item.type === "element");

  items.sort((a, b) => {
    return (a.order || 0) - (b.order || 0)
  });

  // flexible container
  var style = elementStyle;

  ['width', 'height'].forEach(size => {
      if (style[size] === "auto" || style[size] === "") {
        style[size] = null
      }
    }
  );

  if (!style.flexDirection || style.flexDirection === "auto") {
    style.flexDirection = "row"
  }
  if (!style.alignItems || style.alignItems === "auto") {
    style.alignItems = "stretch"
  }
  if (!style.justifyContent || style.justifyContent === "auto") {
    style.justifyContent = "flex-start"
  }
  if (!style.flexWrap || style.flexWrap === "auto") {
    style.flexWrap = "nowrap"
  }
  if (!style.alignContent || style.alignContent === "auto") {
    style.alignContent = "stretch"
  }

  var mainSize, mainStart, mainEnd, mainSign, mainBase,
    crossSize, crossStart, crossEnd, crossSign, crossBase;
  if (style.flexDirection === "row") {
    mainSize = "width";
    mainStart = "left";
    mainEnd = "right";
    mainSign = +1;
    mainBase = 0;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom";
  }
  if (style.flexDirection === "row-reverse") {
    mainSize = "width";
    mainStart = "right";
    mainEnd = "left";
    mainSign = -1;
    mainBase = style.width;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom"
  }
  if (style.flexDirection === "column") {
    mainSize = "height";
    mainStart = "top";
    mainEnd = "bottom";
    mainSign = +1;
    mainBase = 0;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }
  if (style.flexDirection === "column-reverse") {
    mainSize = "height";
    mainStart = "bottom";
    mainEnd = "top";
    mainSign = -1;
    mainBase = style.height;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }
  if (style.flexWrap === "wrap-reverse") {
    var tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = +1;
  }


  var isAutoMainSize = false;
  if (!style[mainSize]) { //auto sizing
    style[mainSize] = 0;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (elementStyle[mainSize] !== null || elementStyle[mainSize] !== (void 0)) {
        style[mainSize] += elementStyle[mainSize]
      }
    }
    isAutoMainSize = true
  }

  var flexLine = [];
  var flexLines = [flexLine];

  var mainSpace = style[mainSize];
  var crossSpace = 0;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    //flex elements
    var itemStyle = getStyle(item);
    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }
    // 将flexible container收进flexLine
    if (itemStyle.flex) {
      flexLine.push(item);
    } else if (style.flexWrap === "nowrap" && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      flexLine.push(item);
    } else {
      // if flex element size more then flexible container, flex element auto flexed
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;

        //换行
        flexLine = [];
        flexLines.push(flexLine);
        flexLine.push(item);

        //换行后重置mainSpace crossSpace
        mainSpace = style[mainSize];
        crossSpace = 0
      } else {
        flexLine.push(item)
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      mainSpace -= itemStyle[mainSize]
    }
  }
  flexLine.mainSpace = mainSpace;
  console.log(items);

  if (style.flexWrap === "nowrap" || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== null && style[crossSize] !== (void 0)) ? style[crossSize] : crossSpace
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if (mainSpace < 0) {
    // overflow (happens only if containers is single line), scale every item
    var scale = style[mainSize] / (style[mainSize] - mainSpace);
    var currentMain = mainBase;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = getStyle(item);

      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }
      itemStyle[mainSize] = itemStyle[mainSize] * scale;

      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd]
    }
  } else {
    //process each flex line
    flexLines.forEach((flexLine) => {
      var mainSpace = flexLine.mainSpace;
      var flexTotal = 0;
      for (var i = 0; i < flexLine.length; i++) {
        var item = flexLine[i];
        var itemStyle = getStyle(item);

        if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }

      if (flexTotal > 0) {
        // there is flex element
        var currentMain = mainBase;
        for (let i = 0; i < flexLine.length; i++) {
          let item = items[i];
          let itemStyle = getStyle(item);

          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else {
        // there is *NO* flexible flex elements, which means, justifyContent should work
        let gap = 0;
        if (style.justifyContent === "flex-start") {
          currentMain = mainBase;
          gap = 0;
        }
        if (style.justifyContent === "center") {
          currentMain = mainSpace / 2 * mainSign + mainBase;
          gap = 0;
        }
        if (style.justifyContent === "space-between") {
          currentMain = mainBase;
          gap = mainSpace / (flexLine.length - 1) * mainSign;
        }
        if (style.justifyContent === "space-around") {
          gap = mainSpace / flexLine.length * mainSign;
          currentMain = mainBase + 1 / 2 * gap;
        }
        for (let i = 0; i < flexLine.length; i++) {
          itemStyle[mainSize] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainSize] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + gap
        }
      }
    })
  }

  // computed the cross axis sizes
  // align-items, align-self
  if (!style[crossSize]) { //auto sizing
    crossSpace = 0;
    elementStyle[crossSize] = 0;
    for (let i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize];
    for (let i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace
    }
  }

  if (style.flexWrap === "wrap-reverse") {
    crossBase = style[crossSize]
  } else {
    crossBase = 0
  }
  var lineSize = style[crossSize] / flexLines.length;
  var gap;
  if (style.alignContent === "flex-start") {
    crossBase += 0;
    gap = 0
  }
  if (style.alignContent === "flex-end") {
    crossBase += crossSign * crossSpace;
    gap = 0
  }
  if (style.alignContent === "center") {
    crossBase += crossSign * crossSpace / 2;
    gap = 0
  }
  if (style.alignContent === "space-between") {
    crossBase += 0;
    gap = crossSpace / (flexLines.length - 1)
  }
  if (style.alignContent === "space-around") {
    gap = crossSpace / flexLines.length;
    crossBase += crossSign * gap / 2;
  }
  if (style.alignContent === "stretch") {
    crossBase += 0;
    gap = 0
  }
  flexLines.forEach((flexLine) => {
    var lineCrossSize = style.alignContent === "stretch" ?
      flexLine.crossSpace + crossSpace / flexLines.length :
      flexLine.crossSpace;
    for (var i = 0; i < flexLine.length; i++) {
      var item = flexLine[i];
      var itemStyle = getStyle(item);

      var align = itemStyle.alignSelf || style.alignItems;

      if (itemStyle[crossSize] === null) {
        itemStyle[crossSize] = (align === "stretch") ?
          lineCrossSize : 0
      }
      if (align === "flex-start") {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === "flex-end") {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossEnd] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      }
      if (align === "center") {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] - crossSign * itemStyle[crossSize];
      }
      if (align === "stretch") {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))) ?
          itemStyle[crossSize] : lineCrossSize;
        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
      }
    }
    crossBase += crossSign * (lineCrossSize + gap);
  });
  console.log(items)
}

/**
 *
 * @param element
 * @return {{}|*}
 */
function getStyle(element) {
  if (!element.style) {
    element.style = {}
  }
  //console.log("----style----")
  for (let prop in element.computedStyle) {
    //处理单位
    element.style[prop] = element.computedStyle[prop].value;

    //处理以px结尾的单位
    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
    //处理小数
    if (element.style[prop].toString().match(/^[0-9/.]+$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
  }
  return element.style
}

module.exports = layout
