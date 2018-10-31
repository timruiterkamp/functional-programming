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
                .then(res => convert.xmlDataToJSON(res.data))
                .then(res => (key ? jp.query(res, `$..${key}`) : res))
                .then(res => resolve({ data: res, url: url }))
                .catch(err => console.error(err));
        });
    }

    async getAll(endpoint, params = {}, key) {
        const url = await this.getUrl(endpoint, params);
        const requests = await this.getRequestFunctions(url);
        return new Promise((resolve, reject) => {
            axios
                .all(requests)
                .then(
                    axios.spread(async (...ress) => {
                        const json = ress.map(async res =>
                            convert.xmlDataToJSON(res.data)
                        );
                        return Promise.all(json);
                    })
                )
                .then(res => res.map(obj => obj.aquabrowser.results[0].result))
                .then(res => [].concat(...res))
                .then(res => (key ? jp.query(res, `$..${key}`) : res))
                .then(res => {
                    console.log(res);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }

    getRequestFunctions(url) {
        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then(res => convert.xmlDataToJSON(res.data))
                .then(res => {
                    const promises = [];
                    const maxPage =
                        Math.ceil(res.aquabrowser.meta[0].count[0] / 20) + 1;
                    for (let i = 1; i < maxPage; i++) {
                        promises.push(axios.get(`${url}&page=${i}`));
                    }
                    resolve(promises);
                })
                .catch(err => reject(err));
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
