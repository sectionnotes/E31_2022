// I'm going to create a simple recipe server.
// It'll accept a search term sent over HTTP, search a
// set of recipes, and return matching results in JSON format.
//
const mime = require('mime-types'); 
const recipesArray = require('./load_data');
const searchRecipes = require('./search');
const http = require('http');
const ejs = require('ejs');

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recipe App</title>
</head>
<body>
  <h1>Recipe Search Results</h1>
  <h2>found <%= count %> recipes:</h2>
  <ul>
    <% for (let i=0; i<results.length; i++) { %>
      <li><%= results[i].recipename %> - <%= results[i].category %></li>
    <% } %>
  </ul>
  <form method='get' action='/'>
    <input name="search" placeholder="recipe name">
    <button>Search</button>
  </form>
</body>
</html>`;

const requestListener = function (req, res) {
  // Parse the url to extract the query string parameters.
  // The url will be like this:  http://localhost:3000?search=soup

  // url.parse returns an object
  //  we are interested in the 'query' part of it
  let fullUrl = 'http://' + req.headers.host + req.url;
  var urlObject = new URL(fullUrl);
  console.log('url ', fullUrl);
  let searchString = urlObject.searchParams.get('search');
  console.log('SEARCH: ',searchString);
  // console.log('======================');
  // Deprecated:
  // const query = url.parse(req.url,true).query;
  // console.log(query);

  const pathname = urlObject.pathname; 

  // Call the search function
  // 'search' is the name in the name-value pair, comes from the browser
  let data = searchRecipes(searchString, recipesArray);

  if (pathname === '/api') {
    // Send the response as JSON:
    let mimeType = mime.lookup('json');  
    res.writeHead(200, {'Content-type': mimeType});
    res.end(JSON.stringify(data));
  } else {
    // Send response as HTML:
    let mimeType = mime.lookup('html');
    res.writeHead(200, {'Content-type': mimeType});
    console.log('data is:', data);
    res.end(ejs.render(template, data));
  }
}

// Create the http server and start listening on a port:
const server = http.createServer(requestListener);
console.log("Listening on 8000...");
server.listen(8000);
