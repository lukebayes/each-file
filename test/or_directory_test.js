var assert = require('assert');
var eachFile = require('../');
var fs = require('fs');
var sinon = require('sinon');

describe('eachFile.orDirectory', () => {
  beforeEach(() => {
    sinon.stub(fs, 'readdir');
  });

  it('is available', () => {
    assert(eachFile.orDirectory instanceof Function);
  });
});

