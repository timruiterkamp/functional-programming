const obaApi = require('./api/obaApi')
const filter = require('./helpers/filterHelper')
const scrape = require('./scraper/scraper').findPriceByItem
const newObj = require('./helpers/objectHelper').createNewObject
var fs = require('fs')

const express = require('express')
require('dotenv').config()

const app = express()
const port = 1337

const api = new obaApi({
	publicKey: process.env.PUBLIC_KEY,
	secret: process.env.SECRET,
	url: 'https://zoeken.oba.nl/api/v1/'
})

const filterQuery = {
	q: 'roman',
	refine: true,
	librarian: true,
	facet: 'genre(avonturenroman)'
}

api.getAll('search', filterQuery)
	.then(response => (api.response = response.data))
	.then(apiData =>
		apiData.map(items => newObj(items, ['author', 'title', 'language']))
	)
	.then(res => (filteredValues = filter.filterValuesInObject(res)))
	// .then(res => {
	// 	const filtereuh = res.map(item => {
	// 		for (const val of Object.values(item)) {
	// 			console.log(val)
	// 		}
	// 	})
	// 	console.log(filtereuh)
	// 	return res
	// })
	.then(res => scrape('Het geheim van pater Brugman'))
	.then(res =>
		app.get('/', (req, res) => {
			fs.writeFile(
				'./api/cleanBookData.json',
				JSON.stringify(filteredValues),
				'utf8',
				err => console.error('write file kan niet', err)
			)

			res.json(filteredValues)
		})
	)
	.catch(err => console.error('doet t niet'))

app.listen(port, () => console.log(`Listening on port ${port}`))
