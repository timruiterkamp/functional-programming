const jp = require('jsonpath')
class filter {
	findObject(res, name) {
		return jp.query(res, `$..${name}`)
	}
	findValue(item) {
		return item[0] && item[0][0]._ ? item[0][0]._ : item
	}
	filterStringOnSpecChars(item) {
		return item.split(':')[0].split('/')[0]
	}
}

module.exports = filter
