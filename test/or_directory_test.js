'use strict';
var assert = require('assert');
var eachFile = require('../');
var fs = require('fs');
var sinon = require('sinon');

describe('eachFile.orDirectory', () => {
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

