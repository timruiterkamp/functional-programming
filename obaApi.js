// inspired by Rijk van Zanten and the convert that returns a promise by Folkert-Jan van der Pol
const axios = require("axios");
const queryString = require("query-string");
const convert = require("xml-to-json-promise");

class obaApi {
    constructor(options) {
        (this.publicKey = options.publicKey), (this.secret = options.secret);
        this.url = options.url;
    }

    get(endpoint, params) {
        const path = endpoint;
        return new Promise((resolve, reject) => {
            let { facet, ...restParams } = params;
            const queryFilters = queryString.stringify(restParams);
            const facetExist = facet ? `&facet=type(${facet})` : "";
            let url =
                this.url +
                path +
                "/?authorization=" +
                this.publicKey +
                "&" +
                queryFilters +
                facetExist;
            console.log(url);
            axios
                .get(url)
                .then(response => convert.xmlDataToJSON(response.data))
                .then(response => resolve({ data: response, url: url }))
                .catch(err => err);
        });
    }
}

module.exports = obaApi;
