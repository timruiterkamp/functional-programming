const obaApi = require('./api/obaApi')
const filter = require('./helpers/filterHelper')
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
	.then(
		res =>
			(filteredData = Object.values(res).map(x => {
				const values = []
				const { author, title, languages } = x

				values.push({
					auteur:
						author && filter.findValue(author)
							? filter.findValue(author)
							: '',
					title:
						title && filter.findValue(title)
							? filter.findValue(title)
							: '',
					languages:
						languages && filter.findValue(languages)
							? filter.findValue(languages)
							: ''
				})
				return values
			}))
	)
	.then(res => {
		scrape('Jaws')
		res.map(
			x => {
				const titels = Object.values(x)[0].title
				// console.log(filter.filterStringOnSpecChars(titels))
			}
			// (Object.values(x)[0].price = scraper.findPriceByItem(
			// 	Object.values(x)[0].title
			// ))
		)
	})
	.then(res => console.log(res))
	.catch(err => console.error('doet t niet'))

app.get('/', (req, res) => res.json(filteredData)).listen(port, () =>
	console.log(`Listening on port ${port}`)
)
