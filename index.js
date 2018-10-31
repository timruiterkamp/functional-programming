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
    q: "boek",
    sort: "title",
    branch: "results",
    facet: "video"
};

const filterKey = "title";

api.get("search", filterQuery, filterKey)
    .then(response => {
        api.response = response.data;
    })
    .catch(err => console.error(err));

app.get("/", (req, res) => res.json(api.response)).listen(port, () =>
    console.log(`Listening on port ${port}`)
);
