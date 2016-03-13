'use strict';
var assert = require('assert');
var eachFile = require('../');
var fs = require('fs');
var sinon = require('sinon');

describe('matching', () => {
  it('calls file handler without complete handler', done => {
    eachFile.matching(/foo/, __dirname + '/paths/missing-dir', err => {
      assert.equal(err.code, eachFile.ENOENT);
      done();
    });
  });

  it('calls complete handler without file handler', done => {
    eachFile.matching(/foo/, __dirname + '/paths/missing-dir', null, err => {
      assert.equal(err.code, eachFile.ENOENT);
      done();
    });
  });

  it('calls complete with empty path', done => {
    const fileHandler = sinon.spy();
    eachFile.matching(/foo/, __dirname + '/paths/empty-dir', fileHandler,
      (err, files) => {
        assert.equal(files.length, 0);
        assert(!err);
        assert.equal(fileHandler.callCount, 0, 'Did not call the file handler');
        done();
      });
  });

  it('calls the file handler', done => {
    eachFile.matching(/foo/, __dirname + '/paths/foo', (err, file) => {
      if (file.indexOf('foo') > -1) {
        done();
      }
    });
  });

  it('calls the complete handler', done => {
    eachFile.matching(/foo/, __dirname, null, (err, files) => {
      assert.equal(files.length, 1);
      assert(files[0].indexOf('foo') > -1);
      done();
    });
  });
});

