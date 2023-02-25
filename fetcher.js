const processargv = process.argv;
const request = require('request');
const fs = require('fs');
const readline = require('readline');

//use readling to get user input if file already exists
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(processargv[2], (error, response, body) => {
  if (error) {
    // Print the error if one occurred
    console.log('error:', error);
  }

  const isValidPath = (path) => {
    if (isValid(`./index.html`)) {
      return true;
    }
  }
   

  if (`(./index.html).exists()`) {
    rl.question("File already exists. Please input 'Y' & enter if you want to continue.", (answer) => {
      if (answer === 'Y') {
        //download body to index.html
        fs.writeFile('./index.html', body, err => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Downloaded and saved ${body.length} bytes to ./index.html`);
            // file downloaded successfully
            rl.close();
          }
        });
      } else {
        rl.close();
      }
    })
    }
});
  

