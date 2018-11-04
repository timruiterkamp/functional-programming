const queryString = require('query-string')
const axios = require('axios')
const convert = require('xml-to-json-promise')

const getUrl = (setUrl, endpoint, key, { facet, ...restParams } = {}) => {
	const queryFilters = queryString.stringify(restParams)
	const checkIfFacetExists = facet ? facet.map(item => `&facet=${item}`) : ''
	const url = `${setUrl}${endpoint}/?authorization=${key}&${queryFilters}${checkIfFacetExists}`
	console.log(url.replace(',', ''))
	return url.replace(',', '')
}

const getRequestFunctions = url => {
	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(res => convert.xmlDataToJSON(res.data))
			.then(res => {
				const promises = []
				const maxPage =
					Math.ceil(res.aquabrowser.meta[0].count[0] / 20) + 1
				for (let i = 1; i < maxPage; i++) {
					promises.push(axios.get(`${url}&page=${i}`))
				}
				resolve(promises)
			})
			.catch(err => reject(err))
	})
}

module.exports = { getUrl, getRequestFunctions }
