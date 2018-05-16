#!/usr/bin/env node

require("dotenv").config();

const axios = require("axios");
const program = require("commander");
const inquirer = require("inquirer");

program
  .version("1.0.0", "-v --version")
  .command('detail <id>', 'Search movie with id')
  .command('list [query]', 'Get movie list with optional query')
  .parse(process.argv);

