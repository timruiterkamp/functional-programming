const obaApi = require('./api/obaApi')
const filterValuesInObject = require('./helpers/filterHelper')
	.filterValuesInObject
const scrape = require('./scraper/scraper').findPriceByItem
const newObj = require('./helpers/objectHelper').createNewObject
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
const filterKey = ''

api.getAll('search', filterQuery, filterKey)
	.then(response => (api.response = response.data))
	.then(apiData =>
		apiData.map(items => newObj(items, ['author', 'title', 'language']))
	)
	.then(res => (filteredData = filterValuesInObject(res)))
	.then(res => console.log(res))
	.catch(err => console.error('doet t niet'))

app.get('/', (req, res) => res.json(filteredData)).listen(port, () =>
	console.log(`Listening on port ${port}`)
)
