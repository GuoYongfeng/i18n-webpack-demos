var fs = require('fs')
var basepath = process.cwd()
var srcPath = basepath + '/src';

module.exports = function() {
  var dirs = fs.readdirSync(srcPath);
  var matchs = [], jsFiles = {}, ejsFiles = {};

  dirs.forEach(function (item) {
      jsFiles[item] = srcPath + "/" + item + '/index.js';
      ejsFiles[item] = srcPath + "/" + item + '/index.ejs';
  });

  return {
    js: jsFiles,
    ejs: ejsFiles
  };
}
