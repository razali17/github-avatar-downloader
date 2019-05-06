var request = require('request');
var secrets = require('./secrets.js')
var fs = require('fs');

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466','./avatar/kvirani.jpg')