const filterData = fetch(
	'https://functional-programming.netlify.com/cleanBookData.json'
)
	.then(res => {
		return res.json()
	})
	.then(res => res.filter(books => books.price > 0))
	.catch(err => console.log('err', err))

filterData
	.then(data => {
		buildBarChart(data)
		const priceSelection = document.querySelector('#bookFiltering')
		priceSelection.addEventListener('change', e => {
			localStorage.setItem('selected', e.target.value)
			buildBarChart(data)
			window.location.reload()
		})
	})
	.catch(err => console.error('no data'))

function buildBarChart(data) {
	const bookStacks = createStack(data, 'price')
	console.log(localStorage.getItem('selected'))
	const chosenBooks = localStorage.getItem('selected')
		? bookStacks[localStorage.getItem('selected')]
		: bookStacks.allBooks[0]
	const max = bookStacks.allBooks.map(d => {
		const value = d.map(item => item[1]).map(items => items)
		return d3.max(value)
	})
	const margin = { top: 20, right: 160, bottom: 35, left: 30 },
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom,
		barHeight = 20

	let x = d3
		.scaleLinear()
		.domain([0, max[0]])
		.range([0, 500])

	const container = d3
		.select('svg')
		.attr('width', width)
		.attr('height', 20 * data.length)

	const bar = container
		.selectAll('g')
		.data(chosenBooks)
		.enter()
		.append('g')
		.attr('transform', function(d, i) {
			return 'translate(0,' + i * 20 + ')'
		})

	bar.append('rect')
		.attr('width', d => d.data.price)
		// add this attribute to change the color of the rect
		.attr('fill', function(d) {
			if (d[1] > 25) {
				return 'red'
			} else if (d[1] > 10) {
				return 'orange'
			}
			return 'yellow'
		})
		.attr('height', 20 - 1)

	bar.append('text')
		.attr('x', d => d.data.price)
		.attr('y', barHeight / 2)
		.attr('dy', '.35em')
		// add this attribute to change the color of the text
		.attr('fill', function(d) {
			if (d.data.title > 10) {
				return 'purple'
			}
			return 'black'
		})
		.text(d => `${d.data.title}, €${d.data.price}`)
}

/**
 * Create a d3 stack
 * @param createStack
 * @param {array} data - The data to create a d3 stack on.
 * @param {string} filter - The filter keyword were data will be filtered on
 */

function createStack(data, filter) {
	const stack = d3
		.stack()
		.keys([filter])
		.order(d3.stackOrderNone)
		.offset(d3.stackOffsetNone)

	const series = stack(data)

	const nonExpensiveBooks = series.map(data => data.filter(d => d[1] <= 7))
	const mediumExpensiveBooks = series.map(data =>
		data.filter(d => d[1] > 7 && d[1] < 15)
	)
	const expensiveBooks = series.map(data =>
		data.filter(d => d[1] > 15 && d[1] < 20)
	)
	const mostExpensiveBooks = series.map(data => data.filter(d => d[1] > 20))
	const allBooks = series.map(data => data.filter(d => d[1]))
	const bookCategories = {
		allBooks: allBooks,
		nonExpensiveBooks: nonExpensiveBooks[0],
		mediumExpensiveBooks: mediumExpensiveBooks[0],
		expensiveBooks: expensiveBooks[0],
		mostExpensiveBooks: mostExpensiveBooks[0]
	}
	return bookCategories
}

/**
 * Create a bar chart
 * @param createBarChartWithText
 * @param {array} data - The data to that will be shown
 * @param {number} width - width of the chart
 * @param {number} height - height of the chart
 * @param {number} barHeight - height of the bar
 * @param {string} selector - selector where the chart will append on
 * @param {number} max - the maximum number of the chart
 */

function createBarChartWithText(data, options = {}, max) {
	console.log(data)
	const { width, height, barHeight, selector } = options
}
