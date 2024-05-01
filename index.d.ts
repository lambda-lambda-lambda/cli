/**
 *  lambda-lambda-lambda/cli
 *  Command-line tool to create a new L³ application.
 *
 *  Copyright 2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

export interface AppConfig {
  name: string,
  description: string,
  prefix: string,
  asynchronous: string,
  timeout: string,
  sdkVersion: string,
  runtime: string
}

export interface TemplateVars {
  appName?: AppConfig['name'],
  appDescription?: AppConfig['description'],
  appPrefix?: AppConfig['prefix'],
  appTimeout?: AppConfig['timeout'],
  appRuntime?: AppConfig['runtime'],
  pkgName?: string,
  sdkPackage?: string,
  cfResourceName?: string,
  routePath: string,
  nodeVersion?: string
}

export interface PluginInfo {
  name: string,
  html_url: string
}
