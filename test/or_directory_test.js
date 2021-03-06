'use strict';
var assert = require('assert');
var eachFile = require('../');
var fs = require('fs');
var sinon = require('sinon');

describe('orDirectory', () => {
  it('calls file handler without complete handler', done => {
    eachFile.orDirectory(__dirname + '/paths/missing-dir', err => {
      assert.equal(err.code, eachFile.ENOENT);
      done();
    });
  });

  it('calls complete handler without file handler', done => {
    eachFile.orDirectory(__dirname + '/paths/missing-dir', null, err => {
      assert.equal(err.code, eachFile.ENOENT);
      done();
    });
  });

  it('calls complete with empty path', done => {
    let callCount = 0;

    eachFile.orDirectory(__dirname + '/paths/emtpy-dir', err => {
      callCount++;
      assert.equal(err.code, eachFile.ENOENT);
    }, (err, files) => {
      callCount++;
      assert.equal(err.code, eachFile.ENOENT);
      assert.equal(callCount, 2);
      done();
    });
  });

  it('calls the file handler', done => {
    eachFile.orDirectory(__dirname, (err, file) => {
      if (file.indexOf('or_directory_test.js') > -1) {
        done();
      }
    });
  });

  it('calls the complete handler', done => {
    eachFile.orDirectory(__dirname, null, (err, files) => {
      files.forEach(file => {
        if (file.indexOf('or_directory_test.js') > -1) {
          done();
        }
      });
    });
  });
});

