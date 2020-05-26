const titleCaseString = (str) => {
  return str.toString().toUpperCase().charAt(0) + str.substring(1).toLowerCase()
}

module.exports = titleCaseString
