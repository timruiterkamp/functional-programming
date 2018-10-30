const obaApi = require("./obaApi");
const express = require("express");
require("dotenv").config();

const app = express();
const port = 1337;

const api = new obaApi({
    publicKey: process.env.PUBLIC_KEY,
    secret: process.env.SECRET,
    url: "https://zoeken.oba.nl/api/v1/"
});

const filterQuery = {
    q: "fuck 2015",
    sort: "title",
    branch: "result",
    facet: "book"
};

api.get("search", filterQuery).then(response => {
    app.get("/", (req, res) => {
        const newDataArray = Object.values(response.data);
        const filteredDataArray = newDataArray.find(data => data);

        res.json(filteredDataArray);
    });
    app.listen(port, () => console.log(`Listening on port ${port}`));
    // console.log(response.url);
});
