# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2023-05-11

### Added

- CLI command to install middleware packages.
- Support for Travis-CI build process.

### Updated

- Moved CLI command/options into respective groups.
- Refactored getTemplatePath() - Travis ENOENT fix.

## [0.2.1] - 2023-07-25

## Updated

- Replaced node Docker image w/ MSFT supported release.
- templates: Removed VS Code Preview (use Built-in)

## [0.3.0] - 2023-08-09

### Added

- Added support for listing plugins.

### Updated

- Support PM2 `exec_mode` (fork/cluster)

## [0.3.1] - 2023-10-03

### Fixed

- Workaround dotfile publishing issues

### Updated

- Prevent overlapping tasks (watch_delay)
- Removed globally scoped override

## [0.3.2] - 2023-10-04

### Fixed

- Updated malformed value (use `cwd`)

### Updated

- Removed duplicate / in routePath

## [0.4.0] - 2023-10-04

### Added

- Support for configured `--runtime` option

### Fixed

- Updated PM2 logs output location
- Removed directory from `watch`

## [0.5.0] - 2023-11-06

### Added

- Swagger headers schema in `@openapi`
- `nodeVersion` template variable
- `.jsdocrc` output template
- Support for `--profile` arg in deploy script

### Fixed

- Updated AWS config access info
- Updated node user mount location
- Workaround `NODE_APP_INSTANCE` warnings
- Revert - conflicting file renamed (.gitignore)

### Updated

- Replaced image with Lambda ECR base
- Export types and related files during build
- Package node engine to AWS supported (v18)
- Upgraded devDependencies to latest

## [0.5.1] - 2024-04-11

### Updated

- Deprecated AWS SDK v2 / nodejs18.x
- Replaced Travis-CI with Github workflow

## [0.5.2] - 2024-04-15

### Fixed

- Dev Container, due to [VS Code Linux support](https://code.visualstudio.com/docs/remote/faq#_can-i-run-vs-code-server-on-older-linux-distributions) changes

## [0.5.3] - 2024-04-17

- Exported package TypeScript types (refactor)
- Upgraded outdated dependencies
- Updated copyright license year

## [0.6.0] - 2024-04-22

- Renamed/relocated JSDoc config
- Upgraded ESLint config to [flatconfig](https://eslint.org/blog/2022/08/new-config-system-part-2)
- Updated devcontainer /mnt volume `$HOME` location
- Replaced JSDoc template minami w/ [clean-jsdoc-theme](https://www.npmjs.com/package/clean-jsdoc-theme)

## [0.6.1] - 2024-05-02

- Renamed template output `openapi.js` to `openapi.config.js`
- Prepwork for [DefinitelyTyped migration](https://github.com/lambda-lambda-lambda/cli/issues/2)

## [0.6.2] - 2024-05-06

- Override Docker base image (install missing bin)
  - Fixes microsoft/vscode-remote-release/issues/9856#issue-2279937211

## [0.6.3] - 2024-05-08

### Added

- [SwaggerUIViewer](https://github.com/lambda-lambda-lambda/middleware/tree/master/plugins/SwaggerUIViewer) middleware plugin

### Updated

- Renamed types declaration file.
- Integrated [@lambda-lambda-lambda/types/cli](https://github.com/lambda-lambda-lambda/types)
  - Info lambda-lambda-lambda/cli/issues/2#issue-2249209628
- Redirect root requests to SwaggerUI

## [0.6.4] - 2024-05-30

### Updated

- Prep deprecation of `asynchronous` Yes/No values ([VS Code extension integration artifact](https://github.com/lambda-lambda-lambda/vscode-extension/blob/master/src/extension.ts#L70))
- Skip CLI args parser when imported.
- Upgraded [@lambda-lambda-lambda/types](https://github.com/lambda-lambda-lambda) (0.0.2)

## [0.6.5] - 2024-05-30

### Updated

- Added Swagger dependency [AppConfigPlugin](https://github.com/lambda-lambda-lambda/middleware/tree/master/plugins/AppConfigPlugin)
- Removed redundant prefix in Route path
- Ensure Swagger generated path matches routing
- Removed hardcoded middleware, fix output
