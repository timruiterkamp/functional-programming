// inspired by Rijk van Zanten and the convert that returns a promise by Folkert-Jan van der Pol
const axios = require("axios");
const queryString = require("query-string");
const convert = require("xml-to-json-promise");
const jp = require("jsonpath");

class obaApi {
    constructor(options) {
        (this.publicKey = options.publicKey), (this.secret = options.secret);
        this.url = options.url;
    }

    async get(endpoint, params = {}, key) {
        const url = await this.getUrl(endpoint, params);
        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then(response => convert.xmlDataToJSON(response.data))
                .then(
                    response =>
                        key ? jp.query(response, `$..${key}`) : response
                )
                .then(response => resolve({ data: response, url: url }))
                .catch(err => console.error(err));
        });
    }

    getUrl(endpoint, params = {}) {
        const path = endpoint;
        let { facet, ...restParams } = params;
        const queryFilters = queryString.stringify(restParams);
        const facetExist = facet ? `&facet=type(${facet})` : "";
        const url =
            this.url +
            path +
            "/?authorization=" +
            this.publicKey +
            "&" +
            queryFilters +
            facetExist;
        console.log(url);
        return url;
    }

    // async getAll(endpoint, params = {}, key) {}
}

module.exports = obaApi;
