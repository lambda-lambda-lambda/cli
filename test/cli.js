'use strict';

const chai = require('chai');
const exec = require('child_process').exec;
const path = require('path');

const expect = chai.expect;

describe('CLI', function() {
  describe('options', function() {
    describe('--name', function() {
      describe('missing value', function() {
        it('should return error', function(done) {
          testOption(['--name'], function(stdout) {
            expect(stdout).to.match(/error: option '--name <value>' argument missing/);
            done();
          });
        });
      });
    });

    describe('--description', function() {
      describe('missing value', function() {
        it('should return error', function(done) {
          testOption(['--description'], function(stdout) {
            expect(stdout).to.match(/error: option '--description <value>' argument missing/);
            done();
          });
        });
      });
    });

    describe('--prefix', function() {
      describe('missing value', function() {
        it('should not return error', function(done) {
          testOption(['--prefix'], function(stdout) {
            expect(stdout).to.not.match(/error: option '--prefix <value>' argument missing/);
            done();
          });
        });
      });
    });

    describe('--timeout', function() {
      describe('missing value', function() {
        it('should not return error', function(done) {
          testOption(['--timeout'], function(stdout) {
            expect(stdout).to.not.match(/error: option '--timeout <value>' argument missing/);
            done();
          });
        });
      });
    });

    describe('--sdk-version', function() {
      describe('missing value', function() {
        it('should not return error', function(done) {
          testOption(['--sdk-version'], function(stdout) {
            expect(stdout).to.not.match(/error: option '--sdk-version <value>' argument missing/);
            done();
          });
        });
      });
    });

    describe('--asynchronous', function() {
      describe('missing value', function() {
        it('should not return error', function(done) {
          testOption(['--asynchronous'], function(stdout) {
            expect(stdout).to.not.match(/error: option '--asynchronous <value>' argument missing/);
            done();
          });
        });
      });
    });
  });
});

/**
 * Test Commander options in child process.
 */
function testOption(vals, callback) {
  const file = path.resolve('dist/cli.js');
  const args = vals.join(' ');

  exec(`node '${file}' ${args}`, callback);
}
