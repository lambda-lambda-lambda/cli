/**
 *  lambda-lambda-lambda/cli
 *  Command-line tool to create a new L³ application.
 *
 *  Copyright 2023-2025, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

import {pascalCase} from 'change-case';
import fetch        from 'node-fetch';

import * as fs from 'fs';

// Local modules.
import {PluginInfo} from '@lambda-lambda-lambda/types/cli';

// Github repository URLs.
const REPO_CONTENT_URL = 'https://raw.githubusercontent.com/lambda-lambda-lambda/middleware/master';
const REPO_PLUGIN_URL  = 'https://api.github.com/repos/lambda-lambda-lambda/middleware/contents/plugins';
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
 * Request plugin list from the package repo.
 */
export function listPackages(): Promise<PluginInfo[]> {
  return fetch(REPO_PLUGIN_URL)

    // Handle errors.
    .then(response => {
      const {status} = response;

      if ([404, 500].includes(status)) {
        throw new Error('Package list not available');
      }

      return response;
    })

    // Parse response.
    .then(response => response.text())
    .then(body     => JSON.parse(body));
}

/**
 * Fetch remote file; return text as string.
 */
function getPackage(name: string): Promise<string> {
  return fetch(`${REPO_CONTENT_URL}/plugins/${name}/src/plugin.js`)

    // Handle errors.
    .then(response => {
      const {status} = response;

      if ([404, 500].includes(status)) {
        throw new Error(`Plugin name '${name}' not found`);
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
