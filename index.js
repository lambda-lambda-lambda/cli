#!/usr/bin/env node

if (!module.parent) {
  return require('./dist/cli');
}

const {createFiles, createFile}  = require('./dist/generator');
const {addPackage, listPackages} = require('./dist/installer');

module.exports = {createFiles, createFile, addPackage, listPackages};
