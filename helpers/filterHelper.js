module.exports = {
    filterTitle(arr) {
        return arr.map(
            title => (title[0] && title[0]["_"] ? title[0]["_"] : title)
        );
    }
};
