const axios = require("axios");
var parser = require("xml2js").parseString;
require("dotenv").config();

const obaKey = {
    public: process.env.PUBLIC_KEY,
    secret: process.env.SECRET
};
const baseUrl = "http://obaliquid.staging.aquabrowser.nl/api/v1/";
const queryType = "search";
const searchQuery = {
    q: "boek"
};

// axios.get(baseUrl + searchQuery.query + `/?${searchQuery.q}authorization=${obaKey.public}`)

axios
    .get(
        `${baseUrl}${queryType}/?q=${searchQuery.q}&authorization=${
            obaKey.public
        }&refine=true`
    )
    .then(response => {
        parser(response.data, (err, result) => {
            const data = Object.values(result);
            const filterAquaData = data.map(x =>
                Object.values(x).map(items => items)
            );
            const furtherFilter = filterAquaData.map(items =>
                items.map(x => console.log(x))
            );

            console.log(Object.values(furtherFilter));
        });
    })
    .catch(err => console.error(err));