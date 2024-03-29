/**
 *  lambda-lambda-lambda/cli
 *  Command-line tool to create a new L³ application.
 *
 *  Copyright 2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

export interface AppConfig {
  description: string,
  name: string,
  asynchronous: string,
  prefix: string,
  timeout: string,
  sdkVersion: string,
  runtime: string
}

export interface TemplateVars {
  appDescription?: AppConfig['description'],
  appName?: AppConfig['name'],
  appPrefix?: AppConfig['prefix'],
  appTimeout?: AppConfig['timeout'],
  appRuntime?: AppConfig['runtime'],
  pkgName?: string,
  sdkPackage?: string,
  runtime?: string,
  cfResourceName?: string,
  routePath: string,
  nodeVersion?: string
}

export interface ContentsPlugin {
  name: string,
  html_url: string
}
