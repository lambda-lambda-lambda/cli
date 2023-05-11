'use strict';

const chai = require('chai');
const exec = require('child_process').exec;
const fs   = require('fs');
const path = require('path');

const expect = chai.expect;

// Command-line script.
const script = path.resolve('index.js');

describe('CLI', function() {
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
      before(() => cleanUp());
      after(() => cleanUp());

      it('should not return error', function(done) {
        testCommand(['create', '--name testHandler', "--description 'Test'"], function(stdout) {
          expect(stdout).to.be.empty;
          done();
        });
      });
    });
  });

  describe('install', function() {
    describe('argument', function() {
      describe('missing argument', function() {
        it('should return error', function(done) {
          testOption(['install'], function(stdout) {
            expect(stdout).to.match(/error: missing required argument 'PackageName'/);
            done();
          });
        });
      });
    });
  });
});

/**
 * Clean up test project output.
 */
function cleanUp() {
  const dir = `${process.cwd()}/test-handler`;

  fs.existsSync(dir) && fs.rmSync(dir, {recursive: true});
}

/**
 * Test Commander command in child process.
 */
function testCommand(vals, callback) {
  const args = vals.join(' ');
  const cmd  = `node '${script}' ${args}`;

  exec(cmd, (error, stdout, stderr) => callback(error || stderr));
}

/**
 * Test Commander options in child process.
 */
function testOption(vals, callback) {
  const args = vals.join(' ');
  const cmd  = `node '${script}' ${args}`;

  exec(cmd, callback);
}
