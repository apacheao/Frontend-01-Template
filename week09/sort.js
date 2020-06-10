//布局(包含四代布局: Normal flow / Flex / Grid / Houdini)
const layoutTypeProperties = [
  tables = [
    "captionSide",
    "emptyCells", //https://developer.mozilla.org/en-US/docs/Web/CSS/empty-cells
    "tableLayout",
  ],
  NormalFlow = [
    "columnCount", //https://developer.mozilla.org/en-US/docs/Web/CSS/column-count
    "columnFill",
    "columnGap",
    "columnRule",
    "columnRuleColor",
    "columnRuleStyle",
    "columnRuleWidth",
    "columnSpan", //https://developer.mozilla.org/en-US/docs/Web/CSS/column-span
    "columnWidth", //https://developer.mozilla.org/en-US/docs/Web/CSS/column-width
    "columns", //https://developer.mozilla.org/en-US/docs/Web/CSS/columns
    "gap",

    "orphans", //https://developer.mozilla.org/en-US/docs/Web/CSS/orphans

    "float",
    "clear",

    "display",

    "position",
    "bottom",
    "top",
    "right",
    "left",

    "zIndex",
    "zoom",

    "verticalAlign",
    "visibility",
  ],
  Flex = [
    "alignContent",
    "alignItems",
    "alignSelf",
    "flex",
    "flexBasis",
    "flexDirection",
    "flexFlow",
    "flexGrow",
    "flexShrink",
    "flexWrap",
    "justifyContent",
    "justifyItems",
    "justifySelf",
    "order",
    "placeContent",
    "placeItems",
    "placeSelf",
  ],
  Grid = [
    "grid",
    "gridArea",
    "gridAutoColumns",
    "gridAutoFlow",
    "gridAutoRows",
    "gridColumn",
    "gridColumnEnd",
    "gridColumnGap",
    "gridColumnStart",
    "gridGap",
    "gridRow",
    "gridRowEnd",
    "gridRowGap",
    "gridRowStart",
    "gridTemplate",
    "gridTemplateAreas",
    "gridTemplateColumns",
    "gridTemplateRows",
  ],
   "counterIncrement",
   "counterReset",
   "marker",
  Houdini = []
];

//盒模型
const boxTypeProperties = [
  "blockSize",
  "inlineSize",
  "maxBlockSize",
  "maxInlineSize",
  "paddingBlockEnd",
  "paddingBlockStart",
  "paddingInlineEnd",
  "paddingInlineStart",
  "maxWidth",
  "maxZoom",
  "minBlockSize",
  "minHeight",
  "minInlineSize",
  "minWidth",
  "minZoom",
  "marginBlockEnd",
  "marginBlockStart",
  "marginInlineEnd",
  "marginInlineStart",
  "border",
  "borderBlockEnd",
  "borderBlockEndColor",
  "borderBlockEndStyle",
  "borderBlockEndWidth",
  "borderBlockStart",
  "borderBlockStartColor",
  "borderBlockStartStyle",
  "borderBlockStartWidth",
  "borderBottom",
  "borderBottomColor",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderBottomStyle",
  "borderBottomWidth",
  "borderCollapse",
  "borderColor",
  "borderImage",
  "borderImageOutset",
  "borderImageRepeat",
  "borderImageSlice",
  "borderImageSource",
  "borderImageWidth",
  "borderInlineEnd",
  "borderInlineEndColor",
  "borderInlineEndStyle",
  "borderInlineEndWidth",
  "borderInlineStart",
  "borderInlineStartColor",
  "borderInlineStartStyle",
  "borderInlineStartWidth",
  "borderLeft",
  "borderLeftColor",
  "borderLeftStyle",
  "borderLeftWidth",
  "borderRadius",
  "borderRight",
  "borderRightColor",
  "borderRightStyle",
  "borderRightWidth",
  "borderSpacing",
  "borderStyle",
  "borderTop",
  "borderTopColor",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderTopStyle",
  "borderTopWidth",
  "borderWidth",

  "outline",
  "outlineColor",
  "outlineOffset",
  "outlineStyle",
  "outlineWidth",

  "maxHeight",
  "height",
  "width",
  "margin",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",

  "padding",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",

  "boxShadow",
  "boxSizing",

  "opacity",
  "stopOpacity",

  "overflow",
  "overflowAnchor",
  "overflowWrap",
  "overflowX",
  "overflowY",

  "shapeImageThreshold",
  "shapeMargin",
  "shapeOutside",
  "shapeRendering",
  
  "resize",
  "rowGap",
];

//动画
const animationTypeProperties = [
  "animation",
  "animationDelay",
  "animationDirection",
  "animationDuration",
  "animationFillMode",
  "animationIterationCount",
  "animationName",
  "animationPlayState",
  "animationTimingFunction",

  "offset", //https://developer.mozilla.org/en-US/docs/Web/CSS/offset
  "offsetDistance",
  "offsetPath",
  "offsetRotate",

  "transform",
  "transformBox",
  "transformOrigin",
  "transformStyle",
  "transition",
  "transitionDelay",
  "transitionDuration",
  "transitionProperty",
  "transitionTimingFunction",

  "willChange",
];

//颜色，背景, 滤镜...
const backgroundTypeProperties = [
  "filter",
  "backdropFilter",
  "backfaceVisibility",
  "background",
  "backgroundAttachment",
  "backgroundBlendMode",
  "backgroundClip",
  "backgroundColor",
  "backgroundImage",
  "backgroundOrigin",
  "backgroundPosition",
  "backgroundPositionX",
  "backgroundPositionY",
  "backgroundRepeat",
  "backgroundRepeatX",
  "backgroundRepeatY",
  "backgroundSize",

  "clip", //背景裁剪

  "imageOrientation", //https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation
  "imageRendering", //https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
  "isolation", //https://developer.mozilla.org/en-US/docs/Web/CSS/isolation

  "mixBlendMode", //https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode

  "objectFit", //https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
  "objectPosition", //https://developer.mozilla.org/en-US/docs/Web/CSS/object-position

  "perspective",
  "perspectiveOrigin",

  "unicodeBidi",
  "unicodeRange",
  
  "bufferedRendering",
  "contain", //https://developer.mozilla.org/en-US/docs/Web/CSS/contain
];

//字体
const fontTypeProperties = [
  "color",
  "stopColor",
  "font",
  "fontDisplay",
  "fontFamily",
  "fontFeatureSettings",
  "fontKerning",
  "fontOpticalSizing",
  "fontSize",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontVariantCaps",
  "fontVariantEastAsian",
  "fontVariantLigatures",
  "fontVariantNumeric",
  "fontVariationSettings",
  "fontWeight",

   "colorScheme",
  
  "src",
];

//文本
const textTypeProperties = [
  "breakAfter",
  "breakBefore",
  "breakInside",
  "hyphens", //https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
  "letterSpacing",
  "lineBreak", //https://developer.mozilla.org/en-US/docs/Web/CSS/line-break
  "lineHeight",

  //列表
  "listStyle",
  "listStyleImage", //https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-image
  "listStylePosition",
  "listStyleType",

  "paintOrder",

  "textAlign",
  "textAlignLast",
  "textAnchor",
  "textCombineUpright",
  "textDecoration",
  "textDecorationColor",
  "textDecorationLine",
  "textDecorationSkipInk",
  "textDecorationStyle",
  "textIndent",
  "textOrientation",
  "textOverflow",
  "textRendering",
  "textShadow",
  "textSizeAdjust",
  "textTransform",
  "textUnderlinePosition",

  "whiteSpace",
  "wordBreak",
  "wordSpacing",
  "wordWrap",

  "quotes",
  "tabSize",
  
   "writingMode",
];

//svg
const svgTypeProperties = [
  "alignmentBaseline",
  "baselineShift",
  "clipPath",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorRendering",
  "cx",
  "cy",
  "rx",
  "ry",
  "x",
  "y",
  "r",
  "d",
  "direction",
  "dominantBaseline",
  "fill",
  "fillOpacity",
  "fillRule",
  "floodColor",
  "floodOpacity",
  "lightingColor",
  "mask",
  "maskType",
  "markerEnd",
  "markerMid",
  "markerStart",

  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",

  "vectorEffect",
];

//others
const othersTypeProperties = [
  "all",
  "touchAction",

  "userSelect",
  "userZoom",

  "caretColor", //input光标
  "content", //pseudo
  "size",
  "pointerEvents",
  "cursor",
  "orientation", //https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation

  "overscrollBehavior",
  "overscrollBehaviorBlock",
  "overscrollBehaviorInline",
  "overscrollBehaviorX",
  "overscrollBehaviorY",
  "scrollBehavior",
  "scrollMargin",
  "scrollMarginBlock",
  "scrollMarginBlockEnd",
  "scrollMarginBlockStart",
  "scrollMarginBottom",
  "scrollMarginInline",
  "scrollMarginInlineEnd",
  "scrollMarginInlineStart",
  "scrollMarginLeft",
  "scrollMarginRight",
  "scrollMarginTop",
  "scrollPadding",
  "scrollPaddingBlock",
  "scrollPaddingBlockEnd",
  "scrollPaddingBlockStart",
  "scrollPaddingBottom",
  "scrollPaddingInline",
  "scrollPaddingInlineEnd",
  "scrollPaddingInlineStart",
  "scrollPaddingLeft",
  "scrollPaddingRight",
  "scrollPaddingTop",
  "scrollSnapAlign",
  "scrollSnapStop",
  "scrollSnapType",
  
  "page",
  "pageBreakAfter",
  "pageBreakBefore",
  "pageBreakInside",
  
  "speak",
  "widows",
];
