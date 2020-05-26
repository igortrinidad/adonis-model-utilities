const accounting = require('accounting')

/**
 *
 * @param {number} value
 * @param {options} options
 */
const formatCurrency = (value, options) => {

  const number = parseFloat(value)

  if(isNaN(number)) {
    return value
  }

  accounting.settings = {
    currency: options,
    number: {
      precision: 2,  // default precision on numbers is 0
      thousand: ".",
      decimal : ","
    }
  }

  return accounting.formatMoney(number)

}


module.exports = formatCurrency
