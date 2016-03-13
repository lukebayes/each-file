
# each-file

This is a set of utilities that extend the nodejs fs module to provide the
following features:

* Incremental notifications as files are encountered AND
* Notifications when all iterations are complete
* Minimizes work done in cases where some subset of available files are needed
* Ability to read only files that have names that match a given expression
* Asynchronous, incremental file handling

The initial use-case is a test library. Imagine a scenario where we have tens
of thousands of files spread over a relatively deep file system tree. We do not
want to wait for phased file system traversal to complete in order to begin
executing tests, and we also want to know when all files have been examined.

## Examples

```
var eachFile = require('@lukebayes/each-file');

// Get all files (not directories) forward of ./test
eachFile('./test', function(err, file) {
  console.log('File:', file);
});


// Get all files (not directories) forward of ./test with a name that matches
// the provided regular expression.
eachFile.matching(/*_test.js/, './test', function(err, file) {
  console.log('Matched File:', file);
});


// Read the contents of each file forward of ./test that matches the provided
// regular expression.
eachFile.readMatching(/*_test.js/, './test', function(err, body) {
  console.log('Body:', body);
});

