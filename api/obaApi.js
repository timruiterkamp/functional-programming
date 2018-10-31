// inspired by Rijk van Zanten and the convert that returns a promise by Folkert-Jan van der Pol
const axios = require("axios");
const getHelpers = require("../helpers/getHelpers");
const getter = new getHelpers();
const convert = require("xml-to-json-promise");
const jp = require("jsonpath");

class obaApi {
    constructor(options) {
        (this.publicKey = options.publicKey), (this.secret = options.secret);
        this.url = options.url;
    }

    //Get max 20 results
    async get(endpoint, params = {}, key) {
        const url = await getter.getUrl(
            this.url,
            endpoint,
            this.publicKey,
            params
        );
        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then(res => convert.xmlDataToJSON(res.data))
                .then(res => (key ? jp.query(res, `$..${key}`) : res))
                .then(res => resolve({ data: res, url: url }))
                .catch(err => reject(err));
        });
    }

    // thanks Folkert-Jan Van der Pol
    //Get all results
    async getAll(endpoint, params = {}, key) {
        const url = await getter.getUrl(
            this.url,
            endpoint,
            this.publicKey,
            params
        );
        const requests = await getter.getRequestFunctions(url);
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
                .then(res => resolve({ data: res, url: url }))
                .catch(err => reject(err));
        });
    }
}

module.exports = obaApi;
