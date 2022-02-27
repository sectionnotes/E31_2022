
function searchRecipes(searchTerm, recipesArray) {
  
  let data = { count: 0, results: [] };
  if (searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    data.results = recipesArray.filter( r => r.recipename.toLowerCase().includes(searchTerm) );
    data.count = data.results.length;
  }
  return data;
}

module.exports = searchRecipes;
