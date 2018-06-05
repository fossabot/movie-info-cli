#!/usr/bin/env node

const API = require("./constant");
const axios = require("axios");
const program = require("commander");
const inquirer = require("inquirer");
const signale = require("signale");

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
    .get(API.API_GET_LIST, { params: params })
    .then(response => {
      let movies = response.data.data.movies;

      movies = movies.map(movie => {
        let { id, title } = movie;

        return `id: ${id}, title: ${title}`;
      });
      
      signale.success(`\n ${movies.join("\n")}`);
    })
    .catch(error => signale.fatal(error));
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
      signale.fatal(Error("Invalid argument"));
      process.exit(1)
    }
  }

  if (program.quality) {
    if (["720p", "1080p", "3D"].indexOf(program.quality) != -1) {
      Object.assign(params, { limit: program.quality });
    } else {
      signale.fatal(Error("Invalid argument"));
      process.exit(1)
    }
  }

  if (program.minimum) {
    if (program.minimum <= 9) {
      Object.assign(params, { limit: program.minimum });
    } else {
      signale.fatal(Error("Invalid argument"));
      process.exit(1)
    }
  }

  if (program.sort) {
    if (["title", "year"].indexOf(program.sort) != -1) {
      Object.assign(params, { sort_by: program.sort });
    } else {
      signale.fatal(Error("Invalid argument"));
      process.exit(1)
    }
  }

  if (program.order) {
    if (["desc", "asc"].indexOf(program.order) != -1) {
      Object.assign(params, { order_by: program.order });
    } else {
      signale.fatal(Error("Invalid argument"));
      process.exit(1)
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
