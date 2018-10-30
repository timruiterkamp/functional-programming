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
    q: "fuck",
    sort: "year"
};

api.get("search", filterQuery).then(response => {
    console.log(response);
    app.get("/", (req, res) => {
        res.json(Object.values(response.data));
    });
    app.listen(port, () => console.log(`Listening on port ${port}`));
    console.log(response.url);
});
