'use strict';
var assert = require('assert');
var eachFile = require('../');
var fs = require('fs');
var sinon = require('sinon');

describe('eachFile', () => {
  it('calls file handler without complete handler', done => {
    eachFile(__dirname + '/paths/missing-dir', err => {
      assert.equal(err.code, eachFile.ENOENT);
      done();
    });
  });

  it('calls complete handler without file handler', done => {
    eachFile(__dirname + '/paths/missing-dir', null, err => {
      assert.equal(err.code, eachFile.ENOENT);
      done();
    });
  });

  it('calls complete with empty path', done => {
    const fileHandler = sinon.spy();

    eachFile(__dirname + '/paths/empty-dir', fileHandler,
      (err, files) => {
        assert.equal(files.length, 0);
        assert.equal(fileHandler.callCount, 0, 'Did not call the file handler');
        done();
      });
  });

  it('calls the file handler', done => {
    eachFile(__dirname, (err, file) => {
      if (file.indexOf('or_directory_test.js') > -1) {
        done();
      }
    });
  });

  it('calls the complete handler', done => {
    eachFile(__dirname, null, (err, files) => {
      files.forEach(file => {
        if (file.indexOf('or_directory_test.js') > -1) {
          done();
        }
      });
    });
  });
});

