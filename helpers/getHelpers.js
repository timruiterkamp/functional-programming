const queryString = require('query-string')
const axios = require('axios')
const convert = require('xml-to-json-promise')

class getter {
	getUrl(setUrl, endpoint, key, params = {}) {
		const path = endpoint
		let { facet, ...restParams } = params
		const queryFilters = queryString.stringify(restParams)
		const facetExist = facet ? `&facet=type(${facet})` : ''
		const url = `${setUrl}${path}/?authorization=${key}&${queryFilters}${facetExist}`
		console.log(url)
		return url
	}

	getRequestFunctions(url) {
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
}

module.exports = getter
