#!/usr/bin/env node

require('./dist/cli');

const {createFiles, createFile} = require('./dist/generator');
const {addPackage}              = require('./dist/installer');

module.exports = {createFiles, createFile, addPackage};
