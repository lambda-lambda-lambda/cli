/**
 *  lambda-lambda-lambda/cli
 *  Command-line tool to create a new L³ application.
 *
 *  Copyright 2023-2024, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

import {camelCase, paramCase, pascalCase} from 'change-case';
import {execSync}                         from 'child_process';
import {renderFile}                       from 'template-file';

import * as fs   from 'fs';
import * as path from 'path';

// Local modules
import {AppConfig, TemplateVars} from '@lambda-lambda-lambda/types/cli';

/**
 * Generate app sources from templates.
 */
export async function createFiles(appConfig: AppConfig, outPath: string): Promise<void> {
  const templates = getTemplatePath();
  const manifest  = `${templates}/MANIFEST`;

  const vars: TemplateVars = {
    appName: camelCase(appConfig.name),
    appDescription: appConfig.description,
    appPrefix: appConfig.prefix,
    appTimeout: appConfig.timeout,
    appRuntime: appConfig.runtime,
    pkgName: paramCase(appConfig.name),
    sdkPackage: (appConfig.sdkVersion === '2') ? 'aws-sdk-mock' : 'aws-sdk-client-mock',
    cfResourceName: pascalCase(appConfig.name),
    routePath: '/example',
    routePrefix: ((appConfig.prefix !== '/') ? appConfig.prefix : ''),
    nodeVersion: appConfig.runtime.replace(/[^0-9]/g, '')
  };

  const manFiles: string[] = (await renderFile(manifest, {...vars})).split(/\r?\n/);
  const tplFiles: string[] = fs.readdirSync(templates);

  for (let tplFile of tplFiles) {
    let outFile: string | void = getFsPath(manFiles, tplFile, outPath);

    if (outFile) {
      const outDir: string = path.dirname(outFile);

      // TODO: Remove VS Code extension pass-thru (e.g. Yes value)
      const isAsync: boolean = (appConfig.asynchronous === true || appConfig.asynchronous === 'Yes');

      // Select template based on type.
      if (isMiddleware(outFile)) {
        tplFile = `${templates}/${path.basename(outFile)}`;
      } else if (isRoute(outFile)) {
        tplFile = `${templates}/route` + fileSuffix(isAsync) + '.js';
      } else if (isApp(outFile)) {
        tplFile = `${templates}/app` + fileSuffix(isAsync) + '.js';
      } else {
        tplFile = `${templates}/${tplFile}`;
      }

      outFile = outFile.replace(/-async/, '');

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, {recursive: true});
      }

      const content: string = await renderFile(tplFile, {...vars});
      fs.writeFileSync(outFile, content, 'utf8');
    }
  }
}

/**
 * Generate file source from a template.
 */
export async function createFile(name: string, outPath: string, basePath: string): Promise<void> {
  const templates = getTemplatePath();

  let resPath: string = getResourcePath(outPath);
  resPath = (resPath) ? `${resPath}/` : '';

  const vars: TemplateVars = {
    routePath: `${getAppPrefix(basePath)}/${resPath}${name.toLowerCase()}`
  };

  const outFile = `${outPath}/${pascalCase(name)}.js`;

  // Select template based on type.
  const tplFile = (isMiddleware(outPath))
    ? `${templates}/middleware.js`
    : `${templates}/route.js`;

  const content: string = await renderFile(tplFile, {...vars});
  fs.writeFileSync(outFile, content, 'utf8');
}

/**
 * Return configured application prefix.
 */
function getAppPrefix(basePath: string): string | void {
  const config = `${basePath}/config.json`;

  if (fs.existsSync(config)) {
    return JSON.parse(fs.readFileSync(config, 'utf8')).router.prefix;
  }

  throw new Error('Failed to load application config');
}

/**
 * Return output path for a given file.
 */
function getFsPath(files: string[], cmpFile: string, outPath: string): string | void {
  if (outPath && cmpFile && outPath) {
    cmpFile = cmpFile.replace(/^\_/, '.');

    for (const file of files) {
      const regex = new RegExp(`\/${path.parse(cmpFile).name}`);

      if (regex.test(file) || path.basename(file) === cmpFile) {
        return `${outPath}/${file}`;
      }
    }
  }
}

/**
 * Return global templates source path.
 */
function getTemplatePath(): string {
  if (process.env.NODE_ENV === 'production') {
    const moduleLib: string = execSync('npm root --location=global --loglevel=error').toString().trim();

    return `${moduleLib}/@lambda-lambda-lambda/cli/templates`;
  }

  return `${__dirname}/../templates`;
}

/**
 * Return path relative to resource directory.
 */
function getResourcePath(value: string): string {
  return value.replace(/^.*\/src\/(?:middleware|routes)\/?(.*)?$/, '$1');
}

/**
 * Check for middleware output path.
 */
function isMiddleware(path: string): boolean {
  return !!/\/src\/middleware/.test(path);
}

/**
 * Check for route output path.
 */
function isRoute(path: string): boolean {
  return !!/\/src\/routes/.test(path);
}

/**
 * Check for app output path.
 */
function isApp(path: string): boolean {
  return !!/\/src\/app/.test(path);
}

/**
 * Return -async file suffix.
 */
function fileSuffix(add: boolean): string {
  return add ? '-async' : '';
}
