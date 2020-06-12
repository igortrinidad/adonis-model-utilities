const titleCaseString = (str) => {
  return str.toString().split(' ').map((str) => str.toUpperCase().charAt(0) + str.substring(1).toLowerCase()).join(' ')
}


module.exports = titleCaseString
