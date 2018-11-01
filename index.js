const obaApi = require('./api/obaApi')
const filterHelper = require('./helpers/filterHelper')
const filter = new filterHelper()
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
	q: 'harry potter',
	refine: true,
	librarian: true,
	facet: 'book'
}
const filterKey = ''

api.getAll('search', filterQuery, filterKey)
	.then(response => (api.response = response.data))
	.then(
		apiData =>
			(filteredItems = apiData.map(items => {
				let newObj = {}
				newObj.author = filter.findObject(items, 'author')
				newObj.title = filter.findObject(items, 'title')
				newObj.coverImage = filter.findObject(items, 'coverimage')
				console.log(newObj)
				return newObj
			}))
	)
	.catch(err => console.error(err))

app.get('/', (req, res) => res.json(filteredItems)).listen(port, () =>
	console.log(`Listening on port ${port}`)
)
