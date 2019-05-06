var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
var args = process.argv.slice(2);
var owner = args[0];
var repo = args[1];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + owner + "/" + repo + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

//Helper function that saves downloads the given url file to the give filePath.
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  });
  .pipe(fs.createWriteStream(filePath));
};

getRepoContributors("jquery", "jquery", function(err, result) {
  var data = JSON.parse(result);
  if (args.length != 2) {     // throw an error if 2 arguments are not specified in the command line
  throw "You need to specify two command line argurments";
  };
  data.forEach(function(user) {
    var fileP = user.login + ".jpg";
    var avatarURL = user.avatar_url;
    downloadImageByURL(avatarURL, fileP);
  });
});