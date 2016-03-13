var nullFunction = require('./null_function');
var orDirectory = require('./or_directory');

/**
 * Recursivly, asynchronously traverse the file system calling the provided
 * callback for each file (non-directory) found.
 *
 * Traversal will begin on the provided path.
 */
var eachFile = function(path, opt_fileHandler, opt_completeHandler) {
  var completeHandler = opt_completeHandler || nullFunction;
  var fileHandler = opt_fileHandler || nullFunction;
  var files = [];
  var stats = [];

  orDirectory(path, function(err, file, stat) {
    if (err) return fileHandler(err);
    if (!stat.isDirectory()) {
      files.push(file);
      stats.push(stat);
      fileHandler(null, file, stat);
    }
  }, function(err) {
    if (err) return completeHandler(err);
    if (completeHandler) completeHandler(null, files, stats);
  });
};

// Constants
eachFile.ENOENT = 'ENOENT';

// Literate interface methods
eachFile.orDirectory = require('./or_directory');

module.exports = eachFile;
