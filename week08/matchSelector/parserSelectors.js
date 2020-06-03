function parseSelectors(selectors) {
    let CssSelectorParser = require('css-selector-parser').CssSelectorParser,

        parser = new CssSelectorParser();

    parser.registerSelectorPseudos('has');
    parser.registerNestingOperators('>', '+', '~');
    parser.registerAttrEqualityMods('^', 'apos;', '*', '~')
    parser.enableSubstitutes();

    const util = require('util');

    return util.inspect(parser.parse(selectors), false, null)
}

module.exports = parseSelectors
