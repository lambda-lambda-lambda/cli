# L³ CLI

[![npm version](https://badge.fury.io/js/@lambda-lambda-lambda%2Fcli.svg)](https://badge.fury.io/js/@lambda-lambda-lambda%2Fcli) [![](https://img.shields.io/npm/dm/@lambda-lambda-lambda/cli.svg)](https://www.npmjs.com/package/@lambda-lambda-lambda/cli) [![Build Status](https://api.travis-ci.com/lambda-lambda-lambda/cli.svg?branch=master)](https://app.travis-ci.com/github/lambda-lambda-lambda/cli) [![Install size](https://packagephobia.com/badge?p=@lambda-lambda-lambda/cli)](https://packagephobia.com/result?p=@lambda-lambda-lambda/cli)

Command-line tool to create a new [L³](https://github.com/lambda-lambda-lambda) application.

## Dependencies

- [Node.js](https://nodejs.org)

## Installation

Install the command-line utility using [NPM](https://npmjs.com).

    $ npm install -g @lambda-lambda-lambda/cli

## Usage

### Create a new L³ application

    Usage: lambda-lambda-lambda create [options]

    Options:
    --name <value>          Application name (Example: restfulApiHandler)
    --description <value>   Description
    --prefix <path>         Request prefix (Example: /api) (default: "/")
    --timeout <number>      Function timeout (in seconds) (default: "15")
    --sdk-version <number>  AWS SDK for JavaScript version (default: "2")
    --asynchronous          Use asynchronous handler? (default: false)
    -h, --help              display help for command

### Install [L³ middleware](https://github.com/lambda-lambda-lambda/middleware/tree/master/plugins) plugin

    Usage: lambda-lambda-lambda install [options] <PluginName>

    Arguments:
      PluginName            Plugin name (Example: BasicAuthHandler), list packages if undefined

    Options:
    -h, --help              display help for command

## Developers

### CLI options

Compile JavaScript sources from [TypeScript](https://www.typescriptlang.org) to a distribution:

    $ npm run compile

Compile and listen for changes (development mode):

    $ npm run watch

Run [ESLint](https://eslint.org/) on project sources:

    $ npm run lint

Run [Mocha](https://mochajs.org) integration tests:

    $ npm run test

## Contributions

If you fix a bug, or have a code you want to contribute, please send a pull-request with your changes. (Note: Before committing your code please ensure that you are following the [TypeScript style guide](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md))

## Versioning

This package is maintained under the [Semantic Versioning](https://semver.org) guidelines.

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_lambda-lambda-lambda/cli_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
