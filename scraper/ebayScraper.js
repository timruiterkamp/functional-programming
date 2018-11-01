const eBay = require('ebay-node-api')
const axios = require('axios')
require('dotenv').config()

// let ebay = new eBay({
// 	clientID: 'TimRuite-OBAprice-SBX-bc2330105-a3ec6a6b',
// 	clientSecret: 'SBX-c23301059fda-d591-43b0-b743-cd62',
// 	body: {
// 		grant_type: 'client_credentials'
// 	}
// })
let ebay = new eBay({
	clientID: 'TimRuite-OBAprice-SBX-bc2330105-a3ec6a6b',
	limit: 6
})
ebay.findItemsByKeywords('iphone').then(
	data => {
		console.log(data) // fetches top 6 results in form of JSON.
	},
	error => {
		console.log(error)
	}
)
