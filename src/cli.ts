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

  .option('--name <value>', 'Application name (Example: restfulApiHandler)')
  .option('--description <value>', 'Description')
  .option('--prefix <path>', 'Request prefix (Example: /api)', '/')
  .option('--timeout <number>', 'Function timeout (in seconds)', '15')
  .option('--sdk-version <number>', 'AWS SDK for JavaScript version', '2')
  .option('--asynchronous', 'Use asynchronous handler?', false)

  .action(async function(this: any, opts: AppConfig) {
    const {name, description, prefix, timeout, sdkVersion} = opts;

    const errors = [];

    try {

      // Validate option values.
      if (name && !/^[a-zA-Z0-9]{1,40}$/.test(name) || !name) {
        errors.push('  --name allowed values: Up to 40 alphanumeric characters');
      }

      if (description && !/^[\w-.,!? ]{1,100}$/.test(description) || !description) {
        errors.push('  --description allowed values: Up to 100 alphanumeric and -.,!? characters');
      }

      if (prefix && !/^\/[\w-]{0,100}$/.test(prefix)) {
        errors.push('  --prefix allowed values: Up to 100 alphanumeric and - characters');
      }

      if (timeout && /^[\d]{1,2}$/.test(timeout)) {
        errors.push('  --timeout allowed values: Up to 2 numeric characters');
      }

      if (sdkVersion && /^[a-zA-Z0-9]{1,40}$/.test(sdkVersion)) {
        errors.push('  --sdk-version allowed values: Up to 40 numeric and . characters');
      }

      if (errors.length) {
        console.error('ERROR: Invalid script arguments');

        throw new Error(errors.join('\n'));
      }

      // Generate sources from templates.
      await createFiles(opts, PACKAGE_PATH);

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`${err.message}\n`);
      }

      this.outputHelp();
    }
  });

program.parse();
