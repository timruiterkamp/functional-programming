const puppeteer = require('puppeteer')

findPriceByItem = async searchTerm => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.setViewport({ width: 1280, height: 800 })
	await page.goto('https://www.bol.com/nl/', {
		waitLoad: true,
		waitNetworkIdle: true // defaults to false
	})
	await page.type('#searchfor', searchTerm)
	await page.select('#product_select', 'books_all')
	await page.click('input.search-btn')
	try {
		await page.waitForSelector('#facet_1426')
		await page.click('#facet_1426')
		console.log('bestaaaat')
	} catch (err) {
		console.log("The element didn't appear.")
	}

	try {
		await page.waitForSelector('#facet_8293')
		await page.click('#facet_8293')
		console.log('komt hier, facet8293')
	} catch (err) {
		console.log("The element didn't appear.")
	}

	await page.waitForSelector('a.product-title')
	const productValue = await page.evaluate(() =>
		document
			.querySelector('.price-block__highlight')
			.querySelector('meta')
			.getAttribute('content')
	)
	console.log(productValue)
	await browser.close()
}

module.exports = { findPriceByItem }
