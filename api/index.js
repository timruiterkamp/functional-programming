require('dotenv').config()
const fs = require('fs')
const express = require('express')
const obaApi = require('./OBAapiHandler/obaApi')
const initScraper = require('./scraper/scraper')
const {
	filterValuesInObject,
	filterStringOnSpecChars
} = require('./helpers/filterHelper')
const { createNewObject: newObj } = require('./helpers/objectHelper')

const app = express()
const port = 1337
app.set('views', 'views')
	.set('view engine', 'ejs')
	.get('/api', (req, res) => {
		readBookJson('./cleanBookData.json', data => {
			if (data) {
				res.json(JSON.parse(data))
			} else {
				res.write('<h2>Loading</h2>')
			}
		})
	})
	.listen(port, () => console.log(`Listening on port ${port}`))

function readBookJson(filePath, cb) {
	fs.readFile(filePath, 'utf8', function(err, data) {
		if (err) {
			startScraping()
			console.log('geen boeken data beschikbaar')
		}
		cb(data)
	})
}

function startScraping() {
	initScraper().then(scraper => {
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
				apiData.map(items =>
					newObj(items, ['author', 'title', 'language'])
				)
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
				fs.writeFile(
					'./cleanBookData.json',
					JSON.stringify(booksWithPrices),
					'utf8',
					err => console.error('write file kan niet', err)
				)
			})
			.catch(err => console.error('doet t niet'))
	})
}
