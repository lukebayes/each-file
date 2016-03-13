var fs = require('fs');

/**
 * Call fileHandler with the file name and file Stat for each file found inside
 * of the provided directory.
 *
 * Call the optionally provided completeHandler with an array of files (mingled
 * with directories) and an array of Stat objects (one for each of the found
 * files.
 *
 * Following is an example of a simple usage:
 *
 *   var eachFile = require('@lukebayes/each-file');
 *
 *   eachFileOrDirectory('test/', function(err, file, stat) {
 *     if (err) throw err;
 *     if (!stat.isDirectory()) {
 *       console.log(">> Found file: " + file);
 *     }
 *   });
 *
 * Following is an example that waits for all files and directories to be
 * scanned and then uses the entire result to do somthing:
 *
 *   eachFileOrDirectory('test/', null, function(files, stats) {
 *     if (err) throw err;
 *     var len = files.length;
 *     for (var i = 0; i < len; i++) {
 *       if (!stats[i].isDirectory()) {
 *         console.log(">> Found file: " + files[i]);
 *       }
 *     }
 *   });
 */
module.exports = function(directory, fileHandler, completeHandler) {
  var filesToCheck = 0;
  var checkedFiles = [];
  var checkedStats = [];

  directory = (directory) ? directory : './';

  var fullFilePath = function(dir, file) {
    return dir.replace(/\/$/, '') + '/' + file;
  };

  var checkComplete = function() {
    if (filesToCheck == 0 && completeHandler) {
      completeHandler(null, checkedFiles, checkedStats);
    }
  };

  var onFileOrDirectory = function(fileOrDirectory) {
    filesToCheck++;
    fs.stat(fileOrDirectory, function(err, stat) {
      filesToCheck--;
      if (err) return fileHandler(err);
      checkedFiles.push(fileOrDirectory);
      checkedStats.push(stat);
      fileHandler(null, fileOrDirectory, stat);
      if (stat.isDirectory()) {
        onDirectory(fileOrDirectory);
      }
      checkComplete();
    });
  };

  var onDirectory = function(dir) {
    filesToCheck++;
    fs.readdir(dir, function(err, files) {
      filesToCheck--;
      if (err) return fileHandler(err);
      files.forEach(function(file, index) {
        file = fullFilePath(dir, file);
        onFileOrDirectory(file);
      });
      checkComplete();
    });
  }

  onFileOrDirectory(directory);
};

