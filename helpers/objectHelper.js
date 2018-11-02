const filter = require('./filterHelper').findObject

createNewObject = (items, params = '') => {
	let newObj = {}
	params.forEach(subject => {
		newObj[subject] = filter(items, subject.toString())
	})
	return newObj
}

module.exports = { createNewObject }
