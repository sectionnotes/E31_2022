
function searchRecipes(searchTerm, recipesArray) {
  let data = {};
  data.results = recipesArray.filter( r =>
                       r.recipename.toLowerCase().includes(searchTerm) );
  data.count = data.results.length;
  return data;
}

module.exports = searchRecipes;
