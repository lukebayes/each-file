
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

This library started life as a
[question on Stackoverflow](http://goo.gl/AwAQpN) and quickly became a
 [gist](https://gist.github.com/lukebayes/814063) and eventually felt useful
 enough to get into a slightly more shareable form.

## Examples

```javascript
var eachFile = require('@lukebayes/each-file');

// Get all files (not directories) forward of ./test
eachFile('./test', function(err, file, stat) {
  if (err) throw err;

  console.log('File:', file, stat);
});


// Get all files (not directories) forward of ./test with a name that matches
// the provided regular expression.
eachFile.matching(/_test.js/, './test', function(err, file, stat) {
  if (err) throw err;

  console.log('Matched File:', file, stat);
});


// Read the contents of each file forward of ./test that matches the provided
// regular expression.
eachFile.readMatching(/_test.js/, './test', function(err, file, stat, body) {
  if (err) throw err;

  console.log('Body:', body);
});

