/**
 *  lambda-lambda-lambda/cli
 *  Command-line tool to create a new L³ application.
 *
 *  Copyright 2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

import {pascalCase} from 'change-case';
import fetch        from 'node-fetch';

import * as fs from 'fs';

// Github repository URLs.
const REPO_CONTENT_URL = 'https://raw.githubusercontent.com/lambda-lambda-lambda/middleware/master';
const REPO_PUBLIC_URL  = 'https://github.com/lambda-lambda-lambda/middleware/tree/master';

/**
 * Install remote middleware
 */
export async function addPackage(name: string): Promise<string|undefined> {
  const cwd = process.cwd();

  if (!isAppRoot(cwd)) {
    throw new Error('Command must be executed in APP_ROOT');
  }

  const fileName = pascalCase(name);
  const outFile  = `${cwd}/src/middleware/${fileName}.js`;

  if (fs.existsSync(outFile)) {
    throw new Error('Middleware already exists');
  }

  const content = await getPackage(fileName);
  if (content) {
    fs.writeFileSync(outFile, content, 'utf8');

    return `${REPO_PUBLIC_URL}/plugins/${name}/README.md`;
  }
};

/**
 * Fetch remote file; return text as string.
 */
function getPackage(name: string): Promise<string> {
  return fetch(`${REPO_CONTENT_URL}/plugins/${name}/src/plugin.js`)

    // Handle errors.
    .then(response => {
      const {status} = response;

      if ([404, 500].includes(status)) {
        throw new Error(`Package name '${name}' not found`);
      }

      return response;
    })

    // Parse response.
    .then(response => response.text());
}

/**
 * Check for app root path.
 */
function isAppRoot(path: string): boolean {
  return !!fs.existsSync(`${path}/src/app.js`);
}
