//
// The set of recipes is in a regular text file in json format.
//
// I'll need to read in that file, so first I'll pull in the fs library
// which is built into node (a core module).  fs stands for file system.
const fs = require('fs');

// I'll read in the file contents:
const recipes = fs.readFileSync('recipes.json', 'utf8');

// Now I'll parse the JSON to give me an array of objects:
const recipesArray = JSON.parse(recipes);

module.exports = recipesArray;
