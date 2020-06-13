
const titleCaseString = require('../Util/TitleCaseString')

const createFullName = (firstName, lastName) => {
  return titleCaseString(`${firstName} ${lastName}`)
}

module.exports = createFullName
