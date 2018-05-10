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

if (program.id) {  
  if (!!program.more) {

  } else {
    axios
      .get(process.env.API_GET_MOVIE_DETAIL, {
        params: {
          movie_id: program.id,
          with_images: true,
          with_cast: true
        }
      })
      .then(response => {
        JSON.stringify(response.data["data"]["movie"], null, " ");
      })
      .catch(error => console.log(error));
  }
}
