var eachFile = require('./each_file');
var nullFunction = require('./null_function');

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
var matching = function(expression, path, opt_fileHandler, opt_completeHandler) {
  var files = [];
  var stats = [];
  var fileHandler = opt_fileHandler || nullFunction;
  var completeHandler = opt_completeHandler || nullFunction;

  eachFile(path, function(err, file, stat) {
    if (err) return fileHandler(err);
    if (expression.test(file)) {
      files.push(file);
      stats.push(stat);
      fileHandler(null, file, stat);
    }
  }, function(err) {
    if (err) return completeHandler(err);
    completeHandler(null, files, stats);
  });
};

module.exports = matching;

