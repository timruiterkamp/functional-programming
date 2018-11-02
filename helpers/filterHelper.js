const jp = require('jsonpath')

findObject = (res, name) => jp.query(res, `$..${name}`)

findValue = item => (item[0] && item[0][0]._ ? item[0][0]._ : item)

filterStringOnSpecChars = item => item.split(':')[0].split('/')[0]

module.exports = { findObject, findValue, filterStringOnSpecChars }
