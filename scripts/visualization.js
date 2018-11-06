const filterData = fetch('http://localhost:1337/api')
	.then(res => {
		return res.json()
	})
	.then(res => res.filter(books => books.price > 0))
	.catch(err => console.log('err', err))

filterData
	.then(data => {
		const width = 460,
			barHeight = 20,
			max = d3.max(data, d => d.price)

		let x = d3
			.scaleLinear()
			.domain([0, max])
			.range([0, width])

		const container = d3
			.select('svg')
			.attr('width', width)
			.attr('height', barHeight * data.length)

		const bar = container
			.selectAll('g')
			.data(data)
			.enter()
			.append('g')
			.attr('transform', function(d, i) {
				console.log(i)
				return 'translate(0,' + i * barHeight + ')'
			})

		bar.append('rect')
			.attr('width', d => d.price * 10)
			// add this attribute to change the color of the rect
			.attr('fill', function(d) {
				if (d.price > 25) {
					return 'red'
				} else if (d.price > 10) {
					return 'orange'
				}
				return 'yellow'
			})
			.attr('height', barHeight - 1)

		bar.append('text')
			.attr('x', d => d.price)
			.attr('y', barHeight / 2)
			.attr('dy', '.35em')
			// add this attribute to change the color of the text
			.attr('fill', function(d) {
				if (d.title > 10) {
					return 'purple'
				}
				return 'black'
			})
			.text(d => d.title)
	})
	.catch(err => console.error('no data'))
// const barChart = document.querySelector('.bar-chart')
// d3.select(barChart)
// 	.append('svg')
// 	.attr('width', '100vw')
// 	.attr('height', '100vh')
