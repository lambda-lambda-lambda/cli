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
