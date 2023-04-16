#!/usr/bin/env node

/**
 *  lambda-lambda-lambda/cli
 *  Command-line tool to create a new L³ application.
 *
 *  Copyright 2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

import {Command} from 'commander';

// Local modules.
import {createFiles} from './generator';
import {AppConfig}   from './types';

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
        errors.push("  option '--name <value>' allows up to 40 alphanumeric characters");
      }

      if (description && !/^[\w-.,!? ]{1,100}$/.test(description) || !description) {
        errors.push("  option '--description <value>' allows up to 100 alphanumeric and -.,!? characters");
      }

      if (prefix && !/^\/[\w-]{0,100}$/.test(prefix)) {
        errors.push("  option '--prefix <path>' allows up to 100 alphanumeric and - characters");
      }

      if (timeout && !/^[\d]{1,2}$/.test(timeout)) {
        errors.push("  option '--timeout <number>' allows up to 2 numeric characters");
      }

      if (sdkVersion && !/^[a-zA-Z0-9]{1,40}$/.test(sdkVersion)) {
        errors.push("  option '--sdk-version <number>' allows up to 40 numeric and . characters");
      }

      if (errors.length) {
        console.error('error: Invalid script arguments');

        throw new Error(errors.join('\n'));
      }

      // Generate sources from templates.
      await createFiles(opts);

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`${err.message}\n`);
      }

      this.outputHelp();
    }
  });

program.parse();
