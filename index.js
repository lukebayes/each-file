
var eachFile = require('./src/each_file');
// Literate interface methods
eachFile.orDirectory = require('./src/or_directory');
eachFile.matching = require('./src/matching');
eachFile.matchingRead = require('./src/matching_read');

module.exports = eachFile;

