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
import {createFiles}               from './generator';
import {addPackage, listPackages}  from './installer';
import {AppConfig, ContentsPlugin} from '../index';

// Process CLI options.
const program = new Command();

program
  .usage('[command] [options]')

  .command('create')
  .description('Create a new L³ application.')
  .option('--name <value>', 'Application name (Example: restfulApiHandler)')
  .option('--description <value>', 'Description')
  .option('--prefix <path>', 'Request prefix (Example: /api)', '/')
  .option('--timeout <number>', 'Function timeout (in seconds)', '15')
  .option('--sdk-version <number>', 'AWS SDK for JavaScript version', '3')
  .option('--runtime <string>', 'Node.js Lambda runtime identifier', 'nodejs20.x')
  .option('--asynchronous', 'Use asynchronous handler?', false)

  .action(async function(this: any, opts: AppConfig) {
    const {name, description, prefix, timeout, sdkVersion, runtime} = opts;

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
        errors.push("  option '--sdk-version <number>' allows up to 40 numeric characters");
      }

      if (runtime && !/^nodejs\d{2}\.x$/.test(runtime)) {
        errors.push("  option '--runtime <string>' required format nodejs[VERSION].x");
      }

      if (process.argv.length > 2) {
        if (errors.length) {
          console.error('error: Invalid script arguments');

          throw new Error(errors.join('\n'));
        }

        // Generate sources from templates.
        await createFiles(opts, process.cwd());

        console.log('Created application sources');

      } else {
        throw 'Missing script arguments';
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`error: ${err.message}\n`);
      } else {
        this.outputHelp();
      }
    }
  });

program
  .command('install')
  .description('Install L³ middleware plugin.')
  .argument('[PluginName]', 'Plugin name (Example: BasicAuthHandler), list available if undefined')

  .action(async function(this: any, name: string) {
    const errors = [];

    try {

      // Validate argument values.
      if (name && !/^[a-zA-Z0-9]{1,40}$/.test(name)) {
        errors.push('  allows up to 40 alphanumeric characters');
      }

      if (errors.length) {
        console.error('error: Invalid script arguments');

        throw new Error(errors.join('\n'));
      }

      if (name) {

        // Install plugin sources.
        const output: string | undefined = await addPackage(name);

        console.log(`Installed plugin source:\n${output}`);

      } else {

        // List available plugins.
        const plugins = await listPackages();

        const output = (plugins.map((plugin: ContentsPlugin) => {
          return ` - ${plugin.name} (${plugin.html_url})\n`;
        })).join('');

        console.log(`Available plugins:\n${output}`);
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`error: ${err.message}\n`);
      } else {
        this.outputHelp();
      }
    }
  });

program.parse();
