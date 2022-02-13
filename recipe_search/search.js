
function searchRecipes(searchTerm, rArr) {
   let data = { results: [] };
   if (searchTerm) {
     for (let i=0; i<rArr.length; i++) {
        if (rArr[i].recipename.toLowerCase().includes(searchTerm.toLowerCase())) {
          data.results.push(rArr[i]);
        }

     }
   }
   data.count = data.results.length;
   return data;
}

// console.log('search results for term biscuits: ', searchRecipes('biscuits', recipesArray));

module.exports = searchRecipes;
