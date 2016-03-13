var eachFileMatching = require('./matching');
var fs = require('fs');
var nullFunction = require('./null_function');

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
var matchingRead = function(expression, path, opt_fileHandler, opt_completeHandler) {
  var completeHandlerReceived = false;
  var contents = [];
  var fileHandler = opt_fileHandler || nullFunction;
  var files = [];
  var pendingReadCount = 0;
  var stats = [];

  var attemptCompleteHandler = function(err) {
    if (opt_completeHandler && completeHandlerReceived && pendingReadCount === 0) {
      opt_completeHandler(err, files, stats, contents);
    }
  };

  var errorHandler = function(err) {
    fileHandler(err);
    if (opt_completeHandler && pendingReadCount === 0) {
      opt_completeHandler(err);
    }
  };

  eachFileMatching(expression, path, function(err, file, stat) {
    if (err) return errorHandler(err);

    // Reads are asynchronous, so we cannot rely on the eachFileMatching
    // completeHandler to come in after pending reads. So instead we have
    // to track pending reads and fire the complete handler when we have
    // no more.
    pendingReadCount++;
    fs.readFile(file, function(err, data) {
      pendingReadCount--;
      if (err) return errorHandler(err);

      var content = data.toString();
      files.push(file);
      contents.push(content);
      stats.push(stat);
      fileHandler(null, file, stat, content);

      // Call the provided complete handler only if necessary
      attemptCompleteHandler(null, files, stats, contents);
    });

  }, function(err) {
    completeHandlerReceived = true;
    attemptCompleteHandler();
  });
};

module.exports = matchingRead;

