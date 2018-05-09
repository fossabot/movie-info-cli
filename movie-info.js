#!/usr/bin/env node

require("dotenv").config();
const axios = require("axios");
const program = require("commander");
const inquirer = require("inquirer");

program
  .version("0.1.0")
  .option("-a --about", "About command")
  .option("-")
  .parse(process.argv);
