
const isEmpty = (object) => {
  return !object || JSON.stringify(object) === '{}'
}

module.exports = {
  isEmpty
}
