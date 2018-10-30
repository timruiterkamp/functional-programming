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

api.get("search", filterQuery).then(response => {
    app.get("/", (req, res) => {
        const newDataArray = Object.values(response.data);
        const filteredDataArray = newDataArray.map(data => data);
        res.json(filteredDataArray);
    });
    app.listen(port, () => console.log(`Listening on port ${port}`));
});
