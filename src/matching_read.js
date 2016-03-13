var eachFileMatching = require('./each_file_matching');
var fs = require('fs');

/**
 * Read each file with a file name that matches the provided expression
 * and was found in the provided path.
 *
 * Calls the optionally provided callback for each file found.
 *
 * Calls the optionally provided completeHandler when the search is
 * complete.
 *
 *   readEachFileMatching(/_test.js/, 'test', function(err, file, stat, content) {
 *     if (err) throw err;
 *     console.log(">> Found file: " + file + " with: " + content.length + " chars");
 *   });
 */
module.exports = function(expression, path, callback, completeHandler) {
  var files = [];
  var contents = [];
  var stats = [];
  eachFileMatching(expression, path, function(err, file, stat) {
    fs.readFile(file, function(err, content) {
      if (err) return callback(err);
      files.push(file);
      contents.push(content);
      stats.push(stat);
      if (callback) callback(null, file, stat, content);
    });
  }, function(err) {
    if (err) return completeHandler(err);
    if (completeHandler) completeHandler(err, files, stats, contents);
  });
};

