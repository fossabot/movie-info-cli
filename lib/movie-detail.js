#!/usr/bin/env node

const API = require("./constant");
const axios = require("axios");
const program = require("commander");
const inquirer = require("inquirer");

const printTable = (movieId, withCasts = false) => {
  axios
    .get(API.API_GET_MOVIE_DETAIL, {
      params: {
        movie_id: movieId,
        with_cast: withCasts
      }
    })
    .then(response => {
      let {
        title,
        year,
        genres,
        language,
        mpa_rating,
        cast
      } = response.data.data.movie;
      let casts = withCasts ? cast.map(cast => cast.name).join(", ") : "";

      console.log({
        Title: title,
        Year: year,
        Genres: genres.join(", "),
        Language: language,
        "MPA rating": mpa_rating,
        Casts: casts
      });
    })
    .catch(error => console.log(error));
};

const movieDetail = () => {
  program
    .version("1.0.0", "-v --version")
    .usage("<id> [options]")
    .arguments("<id>")
    .option("-y --yes", "automatically populate all options", false)
    .option("-w --withcasts", "with casts", false)
    .action(function(id) {
      movieId = id;
    });

  program.parse(process.argv);

  if (program.yes && !program.withcasts) {
    console.log(`With casts: false`);
    printTable(movieId, false);
  } else if (!program.yes && program.withcasts) {
    printTable(movieId, true);
  } else {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "with_casts",
          message: "With casts?",
          default: false
        }
      ])
      .then(answers => {
        printTable(movieId, answers.with_casts);
      });
  }
};

exports.movieDetail = movieDetail;
