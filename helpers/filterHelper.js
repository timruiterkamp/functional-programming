const jp = require('jsonpath')

findObject = (res, name) => jp.query(res, `$..${name}`)
findValue = item => (item[0] && item[0][0]._ ? item[0][0]._ : item)
filterStringOnSpecChars = item => item.split(':')[0].split('/')[0]
filterValuesInObject = res => {
	return Object.values(res).map(({ author, title, language }) => ({
		author: author && findValue(author) ? findValue(author) : '',
		title: title && findValue(title) ? findValue(title) : '',
		language: language && findValue(language) ? findValue(language) : ''
	}))
}

module.exports = {
	findObject,
	findValue,
	filterStringOnSpecChars,
	filterValuesInObject
}
