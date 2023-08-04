'use strict';

const chai = require('chai');
const exec = require('child_process').exec;
const fs   = require('fs');
const os   = require('os');
const path = require('path');

const expect = chai.expect;

const tmpDir = path.resolve(os.tmpdir());
const outDir = `${tmpDir}/lambda-lambda-lambda`;

// Command-line script.
const script = path.resolve('index.js');

describe('CLI', function() {
  before(() => setUp());
  after(() => tearDown());

  describe('create', function() {
    describe('options', function() {
      describe('--name', function() {
        describe('missing value', function() {
          it('should return error', function(done) {
            testOption(['create', '--name'], function(stdout) {
              expect(stdout).to.match(/error: option '--name <value>' argument missing/);
              done();
            });
          });
        });
      });

      describe('--description', function() {
        describe('missing value', function() {
          it('should return error', function(done) {
            testOption(['create', '--description'], function(stdout) {
              expect(stdout).to.match(/error: option '--description <value>' argument missing/);
              done();
            });
          });
        });
      });

      describe('--prefix', function() {
        describe('missing value', function() {
          it('should not return error', function(done) {
            testOption(['create', '--prefix'], function(stdout) {
              expect(stdout).to.not.match(/error: option '--prefix <value>' argument missing/);
              done();
            });
          });
        });
      });

      describe('--timeout', function() {
        describe('missing value', function() {
          it('should not return error', function(done) {
            testOption(['create', '--timeout'], function(stdout) {
              expect(stdout).to.not.match(/error: option '--timeout <value>' argument missing/);
              done();
            });
          });
        });
      });

      describe('--sdk-version', function() {
        describe('missing value', function() {
          it('should not return error', function(done) {
            testOption(['create', '--sdk-version'], function(stdout) {
              expect(stdout).to.not.match(/error: option '--sdk-version <value>' argument missing/);
              done();
            });
          });
        });
      });

      describe('--asynchronous', function() {
        describe('missing value', function() {
          it('should not return error', function(done) {
            testOption(['create', '--asynchronous'], function(stdout) {
              expect(stdout).to.not.match(/error: option '--asynchronous <value>' argument missing/);
              done();
            });
          });
        });
      });
    });

    describe('generator', function() {
      describe('success', function() {
        it('should not return error', function(done) {
          testCommand(['create', '--name testHandler', "--description 'Test'"], function(stdout) {
            expect(stdout).to.match(/Created application sources/);
            done();
          }, outDir);
        });
      });
    });
  });

  describe('install', function() {
    describe('argument', function() {
      describe('missing argument', function() {
        it('should return package list', function(done) {
          testCommand(['install'], function(stdout) {
            expect(stdout).to.match(/Available plugins/);
            done();
          });
        });
      });
    });

    describe('installer', function() {
      describe('invalid directory', function() {
        it('should return error', function(done) {
          testCommand(['install', 'PluginName'], function(stdout) {
            expect(stdout).to.match(/error: Command must be executed in APP_ROOT/);
            done();
          });
        });
      });

      describe('invalid package', function() {
        it('should return error', function(done) {
          testCommand(['install', 'PluginName'], function(stdout) {
            expect(stdout).to.match(/error: Plugin name 'PluginName' not found/);
            done();
          }, `${outDir}/test-handler/testHandler`);
        });
      });

      describe('success', function() {
        it('should not return error', function(done) {
          testCommand(['install', 'BasicAuthHandler'], function(stdout) {
            expect(stdout).to.match(/Installed plugin source/);
            done();
          }, `${outDir}/test-handler/testHandler`);
        });
      });
    });
  });
});

/**
 * Create test output directory.
 */
function setUp() {
  fs.mkdirSync(outDir, {recursive: true});
}

/**
 * Remove test output directory.
 */
function tearDown() {
  fs.existsSync(outDir) && fs.rmSync(outDir, {recursive: true});
}

/**
 * Test Commander command in child process.
 */
function testCommand(vals, callback, cwd = outDir) {
  const args = vals.join(' ');
  const cmd  = `node '${script}' ${args}`;

  exec(cmd, {cwd}, (error, stdout, stderr) => callback(stdout || error || stderr));
}

/**
 * Test Commander options in child process.
 */
function testOption(vals, callback) {
  const args = vals.join(' ');
  const cmd  = `node '${script}' ${args}`;

  exec(cmd, callback);
}
