const moment = require('moment')

const formatDate = (value, from, to) => {

  if(moment(value, from).isValid()) {
    return moment(value, from).format(to)
  }

  return value
}

module.exports = formatDate
