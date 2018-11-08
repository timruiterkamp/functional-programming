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
				category: categoryItem
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

		const statisticData = dataNesting.map(items => ({
			...items.value,
			category: items.key
		}))

		//Thanks Folkert Jan
		const filteredData = d3
			.nest()
			.key(d => d.category)
			.entries(newDataObject)
			.map(category => ({
				...category,
				total: category.values.length,
				indexedItems: category.values.map((item, index) => ({
					y: [index, item.price],
					...item
				}))
			}))

		console.log(filteredData)
		createStackedBarChart(filteredData, data)
		showDataStats(statisticData, data)
	})
	.catch(err => console.error('no data', err))

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
		width = 960 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom

	//Thanks Folkert Jan for the base of my d3 visualisation
	var y = d3.scaleBand().rangeRound([0, width])

	var x = d3
		.scaleLinear()
		.rangeRound([height - margin.bottom, margin.top])
		.domain([60, 0])

	const color = d3
		.scaleLinear()
		.domain([1, totalData.length])
		.interpolate(d3.interpolateHcl)
		.range([d3.rgb('#007AFF'), d3.rgb('#FFF500')])

	const svg = d3
		.select('#stackedChart')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)

	svg.selectAll('g')
		.data(data)
		.enter()
		.append('g')
		.attr('transform', 'translate(40,-5)')
		.selectAll('rect')
		.data(d => d.indexedItems)
		.enter()
		.append('rect')
		.attr('width', d => d.price * 10)
		.attr('height', 50)
		.attr('data-val', d => d.price)
		.attr('x', d => y(d.price))
		.attr('y', d => {
			return height - x(d.y[1])
		})
		.attr('fill', (d, index) => color(index))
		.on('mouseover', function(d) {
			console.log(d)
			var xPosition =
				parseFloat(d3.select(this).attr('x')) + y.bandwidth()
			var yPosition = parseFloat(d3.select(this).attr('y')) / 2 + height

			d3.select('#tooltip')
				.style('left', xPosition + 'px')
				.style('top', yPosition + 'px')
				.select('#value')
				.text(
					`${d.title}	${d.author ? d.author + ',' : ''} prijs: €${
						d.price
					}`
				)

			d3.select('#tooltip').classed('hidden', false)
		})
		.on('mouseout', function() {
			d3.select('#tooltip').classed('hidden', true)
		})

	svg.append('g')
		.attr('transform', `translate(20,${height})`)
		.call(d3.axisBottom(x))

	svg.append('g')
		.attr('transform', `translate(20,30)`)
		.call(d3.axisLeft(y))
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
