const accounting = require('accounting')

/**
 *
 * @param {number} value
 * @param {options} options
 */
const formatCurrency = (value, options = {}) => {

  const number = parseFloat(value)

  const accountingOptions = {
    symbol : "US$ ",   // default currency symbol is '$'
    format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal : ",",  // decimal point separator
    thousand: ".",  // thousands separator
    precision : 2   // decimal places
  }

  Object.assign(accountingOptions, options)

  if(isNaN(number)) {
    return value
  }

  accounting.settings = {
    currency: accountingOptions,
    number: {
      precision: 2,  // default precision on numbers is 0
      thousand: ".",
      decimal : ","
    }
  }

  return accounting.formatMoney(number)

}


module.exports = formatCurrency
