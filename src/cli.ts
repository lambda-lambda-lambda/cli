#!/usr/bin/env node

/**
 *  lambda-lambda-lambda/cli
 *  Command-line tool to create a new L³ application.
 *
 *  Copyright 2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

import {Command}  from 'commander';
import {execSync} from 'child_process';

// Local modules.
import {AppConfig}   from './types';
import {createFiles} from './generator';

// Get global module $PATH
const NODE_MODULES = (process.env.NODE_ENV !== 'development')
  ? execSync('npm root --location=global --loglevel=error').toString().trim() : '';

const PACKAGE_NAME = 'lambda-lambda-lambda/cli';
const PACKAGE_PATH = (NODE_MODULES) ? `${NODE_MODULES}/${PACKAGE_NAME}` : '.';

// Process CLI options.
const program = new Command();

program
  .usage('[options]')

  /* eslint-disable max-len */
  .option('--name <value>', 'Application name (Example: restfulApiHandler)', /^[a-zA-Z0-9]{1,40}$/)
  .option('--description <value>', 'Description', /^[\w-.,!? ]{1,100}$/)
  .option('--prefix <path>', 'Request prefix (Example: /api)', /^\/[\w-]{0,100}$/, '/')
  .option('--timeout <number>', 'Function timeout (in seconds)', /^[\d]{1,2}$/, '15')
  .option('--sdk-version <number>', 'AWS SDK for JavaScript version', /^[a-zA-Z0-9]{1,40}$/, '2')
  .option('--asynchronous', 'Use asynchronous handler?', false)
  .action(function(this: any, opts: AppConfig) {
    const {name, description, prefix, timeout, sdkVersion, asynchronous} = opts;

    if (name && description && prefix &&  timeout && sdkVersion && asynchronous) {

      // Generate sources from templates.
      try {
        createFiles(opts, PACKAGE_PATH);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.error('Invalid script arguments');

      this.outputHelp();
    }
  });
  /* eslint-enable max-len */

program.parse();
