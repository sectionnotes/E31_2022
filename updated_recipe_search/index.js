// I'm going to create a simple recipe server.
// It'll accept a search term sent over HTTP, search a
// set of recipes, and return matching results in JSON format.
//
const mime = require('mime-types');
const recipesArray = require('./load_data');
const searchRecipes = require('./search');
const http = require('http');

const requestListener = function (req, res) {
  // Parse the url to extract the query string parameters.
  // The url will be like this:  http://localhost:8000?search=soup

  // url.parse returns an object and we are interested in the 'query' part of it
  let fullUrl = 'http://' + req.headers.host + req.url;
  var theUrl = new URL(fullUrl);
  console.log('url ', fullUrl);
  // 'search' is the name in the name-value pair, comes from the browser
  let searchString = theUrl.searchParams.get('search');
  console.log('search: ',searchString);

  // Call the search function to look for a match for the searchString
  let data = searchRecipes(searchString, recipesArray);

  // res.end('Hello, from Recipe Server!');
  // Send the response as JSON:
  // res.writeHead(200, {'Content-type': 'application/json'});
  //
  // replace above with 
  let mimeType = mime.lookup('json');
  res.writeHead(200, {'Content-type': mimeType});

  console.log('html:', mime.lookup('html'));
  console.log('jpg', mime.lookup('jpg'));
  // stringifying cause I've got an object; turn that into a string in order to send it back to the browser
  // res.end(JSON.stringify(data));

  res.end(JSON.stringify(data, null, 2));
}

// Create the http server and start listening on a port:
const server = http.createServer(requestListener);
server.listen(8000);
