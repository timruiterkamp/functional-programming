const obaApi = require("./api/obaApi");
const filterTitle = require("./helpers/filterHelper").filterTitle;
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
    q: "harry potter",
    refine: true,
    librarian: true,
    facet: "book"
};
const filterKey = "title";

api.getAll("search", filterQuery, filterKey)
    .then(response => {
        console.log(response);
        api.response = response.data;
        const getKey = filterTitle(response.data);
        // console.log(getKey);
    })
    .catch(err => console.log("doet t niet"));

app.get("/", (req, res) => res.json(api.response)).listen(port, () =>
    console.log(`Listening on port ${port}`)
);
