const puppeteer = require('puppeteer')
const clickInput = async (page, selector) => {
	await page.$eval(selector, input => {
		input.click()
	})
	return await page.waitForNavigation({ waitUntil: 'networkidle0' })
}

const findPriceByItem = async searchTerm => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.setViewport({ width: 1280, height: 800 })
	await page.goto('https://www.bol.com/nl/', {
		waitUntil: 'networkidle0'
	})
	await page.type('#searchfor', searchTerm)
	await page.select('#product_select', 'books_all')
	await page.click('input.search-btn')
	await page.waitForNavigation({ waitUntil: 'networkidle0' })
	try {
		await clickInput(page, 'input#facet_1426')
		await clickInput(page, 'input#facet_8293')
	} catch (err) {
		console.log("The elements didn't appear")
	}
	await page.waitForSelector('a.product-title')
	const productValue = await page.$eval(
		'.price-block__highlight',
		priceBlock =>
			priceBlock.textContent
				.replace(/[\n\r]+|[\s]{2,}/g, ' ')
				.trim()
				.split(',')[0]
		////https://stackoverflow.com/questions/42920985/textcontent-without-spaces-from-formatting-text
	)
	console.log(productValue)
	await browser.close()
}

module.exports = { findPriceByItem }
