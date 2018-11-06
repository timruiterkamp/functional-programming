const { findObject } = require('./filterHelper')

createNewObject = (items, params = '') => {
	let newObj = {}
	params.forEach(subject => {
		newObj[subject] = findObject(items, subject.toString())
	})
	return newObj
}

module.exports = { createNewObject }
