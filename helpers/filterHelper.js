const jp = require('jsonpath')
class filter {
	Title(arr) {
		return arr.map(
			title => (title[0] && title[0]['_'] ? title[0]['_'] : title)
		)
	}
	findObject(res, name) {
		return jp.query(res, `$..${name}`)
	}
}

module.exports = filter
