const searchRecipes = require('./search.js');
const mime = require('mime-types');
const fs = require('fs');
const http = require('http');


const recipes = fs.readFileSync('recipes.json', 'utf8');
const recipesArray = JSON.parse(recipes);
console.log('array of recipe objects: ', recipesArray);


function requestListener(req, res) {

  // req.headers.host => http://localhost:8000
  const fullUrl = 'http://' + req.headers.host + req.url;

  const urlObject = new URL(fullUrl);

  const searchString = urlObject.searchParams.get('search');

  console.log(searchString);

  let data = searchRecipes(searchString, recipesArray);

  let mimeType = mime.lookup('json');

  res.writeHead(200, {'Content-type': mimeType});

  res.end(JSON.stringify(data));
  
}

const server = http.createServer(requestListener);
server.listen(8000);
