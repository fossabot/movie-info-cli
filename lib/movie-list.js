#!/usr/bin/env node

require("dotenv").config();

const axios = require("axios");
const program = require("commander");
const inquirer = require("inquirer");

let params = {
  limit: 20,
  quality: "All",
  minimum_rating: 0,
  sort_by: "title",
  order_by: "desc",
  with_rt_ratings: false
};

const printTable = params => {
  axios
    .get(process.env.API_GET_LIST, {
      params: params
    })
    .then(response => {
      let movies = response.data.data.movies;

      movies = movies.map(movie => {
        let { id, title } = movie;

        return `id: ${id}, title: ${title}`;
      });

      console.table(movies);
    })
    .catch(error => console.log(error));
};

const movieList = () => {
  program
    .version("1.0.0", "-v --version")
    .usage("[options]")
    .option("-y --yes", "automatically populate all options")
    .option("-l --limit [limit]", "the limit of results")
    .option("-q --quality [quality]", "used to filter by a given quality")
    .option(
      "-m --minimum [rating]",
      "used to filter movie by a given minimum IMDb rating"
    )
    .option("-s --sort [sort]", "sorts the results by choosen value")
    .option(
      "-o --order [order]",
      "orders the results by either ascending or descending order"
    )
    .option("-w --withrt", " with the Rotten Tomatoes rating included");

  program.parse(process.argv);

  if (program.yes) {
    printTable(params);
  }

  if (program.limit) {
    if (program.limit <= 20) {
      Object.assign(params, { limit: program.limit });
    } else {
      throw new Error("Invalid argument");
    }
  }

  if (program.quality) {
    if (["720p", "1080p", "3D"].indexOf(program.quality) != -1) {
      Object.assign(params, { limit: program.quality });
    } else {
      throw new Error("Invalid argument");
    }
  }

  if (program.minimum) {
    if (program.minimum <= 9) {
      Object.assign(params, { limit: program.minimum });
    } else {
      throw new Error("Invalid argument");
    }
  }

  if (program.sort) {
    if (["title", "year"].indexOf(program.sort) != -1) {
      Object.assign(params, { sort_by: program.sort });
    } else {
      throw new Error("Invalid argument");
    }
  }

  if (program.order) {
    if (["desc", "asc"].indexOf(program.order) != -1) {
      Object.assign(params, { order_by: program.order });
    } else {
      throw new Error("Invalid argument");
    }
  }

  if (program.withrt) {
    Object.assign(params, { with_rt_ratings: program.withrt });
  }

  if (
    (program.limit ||
      program.quality ||
      program.minimum ||
      program.sort ||
      program.order ||
      program.withrt) &&
    !program.yes
  ) {
    printTable(params);
  }

  if (
    !program.limit &&
    !program.quality &&
    !program.minimum &&
    !program.sort &&
    !program.order &&
    !program.withrt &&
    !program.yes
  ) {
    inquirer
      .prompt([
        {
          name: "limit",
          message: "Limit (1 - 50 (inclusive))",
          default: 20
        },
        {
          type: "list",
          name: "quality",
          message: "Quality",
          choices: ["720p", "1080p", "3D"]
        },
        {
          name: "minimum_rating",
          message: "Minimum rating (0 - 9 (inclusive))",
          default: 0
        },
        {
          type: "list",
          name: "sort_by",
          message: "Sort by",
          choices: ["title", "year"]
        },
        {
          type: "list",
          name: "order_by",
          message: "Order by",
          choices: ["desc", "asc"]
        },
        {
          type: "confirm",
          name: "with_rt_ratings",
          message: "With the Rotten Tomatoes rating",
          default: false
        }
      ])
      .then(answers => {
        printTable(answers);
      });
  }
};

exports.movieList = movieList;
