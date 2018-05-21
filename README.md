# movie-info-cli

Simple CLI to get movie info

## Installing

Using npm

`npm i -g movie-info-cli`

Using yarn

`yarn global add movie-info-cli`

**Note**: If you can't install by yarn or npm on Linux or Mac. You can use `sudo` to install.

## Usage

`movie-detail <id> [options]`

* **id**: Required. This is the id of movie. If you don't know what your movie id is, just enter a random number
* **options**: Optional. Options for movie detail, you can select `movie-detail -h` to learn more

`movie-list [options]`

* **options**: Optional. Options to get movie list. You can select `movie-list -h` to learn more

## Built with

* [commander](https://github.com/tj/commander.js)
* [inquirer](https://github.com/SBoudrias/Inquirer.js)
* [axios](https://github.com/axios/axios)

## Authors

* Phong Duong - [phongduong](https://github.com/phongduong)

## License

MIT
