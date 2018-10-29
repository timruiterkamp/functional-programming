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
    q: "boek",
    title: "moviat"
};

const parsedUrl = `${baseUrl}${queryType}/?q=classification${
    searchQuery.q
}&authorization=${obaKey.public}&refine=true`;
axios
    .get(parsedUrl)
    .then(response => {
        parser(response.data, (err, result) => {
            console.log(result);
        });
    })
    .catch(err => console.error(err));
