#!/usr/bin/env node

require("dotenv").config();

const axios = require("axios");
const program = require("commander");
const inquirer = require("inquirer");

program
  .version("1.0.0", "-v --version")
  .usage("[options] <id> [more]")
  .option("-l --list", "Get all movie list")
  .option("-i, --id <id>", "Search movie by id")
  .option("-m --more", "More options");

program.parse(process.argv);

const getMovie = (with_images = false, with_casts = false) => {
  var movie;

  axios
    .get(process.env.API_GET_MOVIE_DETAIL, {
      params: {
        movie_id: program.id,
        with_images: with_images,
        with_cast: with_casts
      }
    })
    .then(response => {
      movie = response.data.data.movie;
      console.log(movie);
    })
    .catch(error => console.log(error));
  
  return movie;
};

if (program.id) {
  let with_images = false;
  let with_casts = false;

  if (!!program.more) {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "with_images",
          message: "With image?",
          default: false
        },
        {
          type: "confirm",
          name: "with_casts",
          message: "With casts?",
          default: false
        }
      ])
      .then(answers => {
        getMovie(answers.with_images, answers.with_casts);
      });
  } else {
    getMovie();
  }
}
