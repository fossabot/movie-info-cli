#!/usr/bin/env node

require("dotenv").config();

const axios = require("axios");
const program = require("commander");
const inquirer = require("inquirer");

program
  .version("1.0.0", "-v --version")
  .usage("[options]")
  .option("-y --yes", "automatically populate all options", false)
  .option("-l --limit", "the limit of results", 20)
  .option("-q --quality", "used to filter by a given quality", "All")
  .option(
    "-m --minimum-rating",
    "used to filter movie by a given minimum IMDb rating",
    0
  )
  .option("-g --genre", "used to filter by a given genre", "All")
  .option("-s --sort-by", "sorts the results by choosen value", "title")
  .option(
    "-p --order-by",
    "orders the results by either Ascending or Descending order",
    "desc"
  )
  .option(
    "-w --with-rt-ratings",
    " with the Rotten Tomatoes rating included",
    false
  );

program.parse(process.argv);

let params = {
  limit: 20,
  page: 1,
  quality: "All",
  minimum_rating: 0,
  query_term: 0,
  genre: "All",
  sort_by: "date_added",
  order_by: "desc",
  with_rt_ratings: false
};

const printTable = params => {
  axios
    .get(process.env.API_GET_LIST, {
      params: params
    })
    .then(response => {})
    .catch(error => console.log(error));
};

if (program.args.length == 0) {
  inquirer
    .prompt([
      {
        name: "limit",
        message: "Limit",
        default: 20
      },
      {
        name: "quality",
        message: "Quality",
        default: "All"
      },
      {
        name: "minimum_rating",
        message: "Minimum rating",
        default: 0
      },
      {
        type: "list",
        name: "genre",
        message: "Genre",
        default: "All",
        choices: []
      },
      {
        type: "checkbox",
        name: "sort_by",
        message: "Sort by",
        choices: [],
        default: "title"
      },
      {
        type: "checkbox",
        name: "order_by",
        choices: [],
        default: "desc"
      },
      {
        type: "confirm",
        name: "with_rt_ratings",
        message: "With the Rotten Tomatoes rating"
        default: false
      }
    ])
    .then(answers => {
      console.log(answers);
    });
}
