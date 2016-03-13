/**
 * Recursivly, asynchronously traverse the file system calling the provided
 * callback for each file (non-directory) found.
 *
 * Traversal will begin on the provided path.
 */
var eachFile = function(path, callback, completeHandler) {
  var files = [];
  var stats = [];

  eachFileOrDirectory(path, function(err, file, stat) {
    if (err) return callback(err);
    if (!stat.isDirectory()) {
      files.push(file);
      stats.push(stat);
      if (callback) callback(null, file, stat);
    }
  }, function(err) {
    if (err) return completeHandler(err);
    if (completeHandler) completeHandler(null, files, stats);
  });
};

eachFile.orDirectory = require('./or_directory');

module.exports = eachFile;
