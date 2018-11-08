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
		const newDataObject = data.map(d => {
			const categoryItem = checkCategory(d.price)
			return {
				...d,
				category: categoryItem,
				[categoryItem]: Number(d.price)
			}
		})

		const dataNesting = d3
			.nest()
			.key(d => d.category)
			.rollup(v => ({
				avg: d3.mean(v, d => d.price),
				total: d3.sum(v, d => d.price),
				minMax: d3.extent(v, d => d.price),
				items: v,
				numbers: v.map(item => item.price)
			}))
			.entries(newDataObject)

		console.log(dataNesting)
		const filteredData = dataNesting.map(items => ({
			...items.value,
			category: items.key
		}))
		// // console.log(filteredData)
		// createStackedBarChart(filteredData, data)
		showDataStats(filteredData, data)
	})
	.catch(err => console.error('no data'))

function checkCategory(price) {
	// needs to become a switch case
	if (price <= 12) {
		return 'least'
	} else if (price >= 12 && price < 20) {
		return 'medium'
	} else if (price >= 20) {
		return 'most'
	} else {
		price
	}
}

function createStackedBarChart(data, totalData) {
	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
		width = 500 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom

	// const totalPrices = data.map(d => d.values)
	// console.log(totalData)
	//Thanks Folkert Jan
	var x = d3
		.scaleBand()
		.domain(10)
		.range([0, width])
		.paddingInner(0.3)
		.paddingOuter(0.3)

	var y = d3
		.scaleLinear()
		.range([height, 0])
		.domain([0, 50])

	const color = d3
		.scaleLinear()
		.domain([1, totalData.length])
		.interpolate(d3.interpolateHcl)
		.range([d3.rgb('#007AFF'), d3.rgb('#FFF500')])

	const xAxis = g =>
		g
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.call(g => g.selectAll('.domain').remove())

	const yAxis = g =>
		g
			.attr('transform', `translate(${margin.left},0)`)
			.call(d3.axisLeft(y).ticks(null, 's'))
			.call(g => g.selectAll('.domain').remove())

	var svg = d3
		.select('#stackedChart')
		.append('svg')
		.attr('width', width)
		.attr('height', height)

	const filteredData = data.map(item => item)
	console.log(filteredData)
	svg.selectAll('g')
		.data(filteredData.numbers)
		.enter()
		.append('g') // every language one group
		.attr('fill', (d, index) => color(index))
		.selectAll('rect')
		.data(d => d)
		.enter()
		.append('rect') // every year in language one rect
		.attr('width', x.bandwidth())
		.attr('height', d => {
			console.log(d)
			return y(d.y[1] - d.y[0])
		})
		.attr('data-lang', d => d.category)
		.attr('x', d => xScale(Number(d.value)))
		.attr('y', d => height - yScale(d.y[1]))

	svg.append('g').call(xAxis)

	svg.append('g').call(yAxis)
}

function showDataStats(data, totalData) {
	const bookamount = document.querySelector('#bookAmount')
	const totalValue = document.querySelector('#totalvalue')
	const lowValueBooks = document.querySelector('#lowValueBooks')
	const mediumValueBooks = document.querySelector('#mediumValueBooks')
	const highValueBooks = document.querySelector('#highValueBooks')

	const totalPrice = d3
		.nest()
		.key(d => d.total)
		.entries(data)
		.map(data => Number(data.key))
		.reduce((base, value) => base + value)

	bookamount.textContent = `${totalData.length} books`
	totalValue.textContent = `€${totalPrice}`
	lowValueBooks.textContent = `${data[0].items.length} books`
	mediumValueBooks.textContent = `${data[1].items.length} books`
	highValueBooks.textContent = `${data[2].items.length} books`
}
