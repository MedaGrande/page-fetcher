const processargv = process.argv;
const request = require('request');
const fs = require('fs');
const readline = require('readline');
const url = processargv[2];
const path = processargv[3];

//use readling to get user input if file already exists
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetch = function (url, path) {
  request(url, (error, response, body) => {
    if (error) {
      // Print the error if one occurred
      console.log('error:', error);
      return;
    }
    fs.writeFile(path, body, err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ./index.html`);
        // file downloaded successfully
        rl.close();
      }
    });
  });
};

//check if the file exists and if it does let the user decide
if (fs.existsSync(path)) {
  rl.question("File already exists. Please input 'Y' & enter if you want to continue. ", (answer) => {
    if (answer === 'Y') {
      //download body to index.html
      fetch(url, path);
    } else {
      console.log("Please use a different file name!");
      rl.close();
      //console.log('File exists');}
    }
  });
} else {
  fetch(url, path);
}













