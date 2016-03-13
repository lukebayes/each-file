var eachFile = require('./each_file');

/**
 * Works just like eachFile, but it only includes files that match a provided
 * regular expression.
 *
 *   eachFileMatching(/_test.js/, 'test', function(err, file, stat) {
 *     if (err) throw err;
 *     console.log(">> Found file: " + file);
 *   });
 *
 */
module.exports = function(expression, path, callback, completeHandler) {
  var files = [];
  var stats = [];

  eachFile(path, function(err, file, stat) {
    if (err) return callback(err);
    if (expression.test(file)) {
      files.push(file);
      stats.push(stat);
      if (callback) callback(null, file, stat);
    }
  }, function(err) {
    if (err) return completeHandler(err);
    completeHandler(null, files, stats);
  });
};

