'use strict'
const {
    Function
} = require("@kcp/functions");
const fetch = require("node-fetch");
const search = require("./../../utils/search.json");

module.exports = class extends Function {
    /**
     * 
     * @param {string} type anime, character or any other form of search
     * @param {*} key could be ID or search string, used for searching the type
     * @param {number} page to retrieve set amount of pages, default set to 1
     * @param {number} amount number of entries to show in one page
     */
    async run(type, key, page, amount) {

        // check for page, set default to 1
        if (!page) page = 1;

        // error check for empty values
        if (!type) {
            throw new Error("Type of search not defined! Choose from \"anime or character\"");
        } else if (!key || !page || !amount) {
            throw new Error("Search term, page count, or amount per page was not provided!");
        }

        // check for 'anime' or 'character'
        var qType = null
        switch (type) {
            case "anime":
                qType = search["anime"];
                break;
            case "character":
                qType = search["character"];
                break;
            default:
                throw new Error("Type not supported.");
        }

        // query search based on type
        var query = `query ($id: Int, $page: Int, $perPage: Int, $search: String) { Page (page: $page, perPage: $perPage) { pageInfo { total currentPage lastPage hasNextPage perPage } ${qType} } }`;
        var variables = null;

        // check for @key to see it's number or not
        const isNumber = /^[0-9]+$/.test(key);

        // if number -> perform ID search
        if (isNumber) {
            variables = {
                id: key,
                page: page,
                perPage: amount
            };
        } else { // else -> perform string search
            variables = {
                search: key,
                page: page,
                perPage: amount
            };
        }

        // options for post request
        var options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        // performing fetch with POST request
        var response = await fetch("https://graphql.anilist.co", options);

        // json body of the response
        var json = await response.json();

        // checks for error in response body
        if (json.data === null) {
            if (json.errors[0].status === 404) {
                return "Oopsie, can't find anything on that...";
            } else {
                return `Status: ${json.errors[0].status} \nMessage: ${json.errors[0].message}`;
            }
        }

        // returning the json.data if everything passes
        return json.data;
    }

};