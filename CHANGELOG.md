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
