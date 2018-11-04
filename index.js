require('dotenv').config()
const fs = require('fs')
const express = require('express')
const obaApi = require('./api/obaApi')
const initScraper = require('./scraper/scraper')
const {
	filterValuesInObject,
	filterStringOnSpecChars
} = require('./helpers/filterHelper')
const { createNewObject: newObj } = require('./helpers/objectHelper')

initScraper().then(scraper => {
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
		lang: 'nl',
		facet: ['genre(avonturenroman)', 'language(dut)']
	}

	api.getAll('search', filterQuery)
		.then(response => (api.response = response.data))
		.then(apiData =>
			apiData.map(items => newObj(items, ['author', 'title', 'language']))
		)
		.then(dirtyBooks => filterValuesInObject(dirtyBooks))
		.then(
			cleanBooksWithDirtyTitles =>
				(filteredData = cleanBooksWithDirtyTitles.map(book => ({
					...book,
					title: filterStringOnSpecChars(book.title)
				})))
		)
		.then(cleanBooks => scraper.findPricesByItems(cleanBooks))
		.then(booksWithPrices => {
			console.log(booksWithPrices)
			return (finalizedBooksDataset = booksWithPrices)
		})
		.catch(err => console.error('doet t niet'))

	app.get('/', (req, res) => {
		fs.writeFile(
			'./api/cleanBookData.json',
			JSON.stringify(finalizedBooksDataset),
			'utf8',
			err => console.error('write file kan niet', err)
		)

		res.json(finalizedBooksDataset)
	}).listen(port, () => console.log(`Listening on port ${port}`))
})
