//Modules
const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('choice' in params){
      const choice = params.choice
      res.writeHead(200, {'Content-Type': 'application/json'});
      let rockPaperScissors = {
        generateChoice(){
          let rand = Math.ceil(Math.random()*3)
          let compResult = rand === 1 ? 'Rock': rand === 2 ? 'Paper' : 'Scissors'
          return compResult
        },
        checkWinner(choice){
          const compResult = this.generateChoice()
          if(compResult === choice) return 'Drew'
          else if(compResult === 'Rock' && choice === 'Paper') return 'Win'
          else if(compResult === 'Rock' && choice === 'Scissors') return 'Lose'
          else if(compResult === 'Scissors' && choice === 'Paper') return 'Lose'
          else if(compResult === 'Scissors' && choice === 'Rock') return 'Win'
          else if(compResult === 'Paper' && choice === 'Scissors') return 'Win'
          else if(compResult === 'Paper' && choice === 'Rock') return 'Lose'
        },
        objToJsonResult(){
          const result = {result: this.checkWinner(choice)}
          return result
        }
      }
        console.log(choice)
        console.log(rockPaperScissors.objToJsonResult(choice))
        res.end(JSON.stringify(rockPaperScissors.objToJsonResult(choice)));
    }
    }

  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);

