var express = require('express');
var router = express.Router();

// const searchRecipes = require('../search');

const { searchRecipes, findByName } = require('../search');

const recipesArray = require('../load_data');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Search Query: ', req.query.search);
  let data = searchRecipes(req.query.search, recipesArray);
  data.title = 'Recipe Search Results for: ' + req.query.search;
  res.render('results', data);
  // res.render('results', { title: 'Recipe Search Results:', count: 20,  results: [] });
});

router.get('/api',  function(req, res, next) {
   let data = searchRecipes(req.query.search, recipesArray);
   res.json(data);
});

router.get('/recipe/:recipe_name',  function(req, res, next) {
   // res.end("will show details of recipe " + req.params.recipe_name);
   const recipe = findByName(req.params.recipe_name, recipesArray);

   res.render('display_recipe', { recipe: recipe});
});

module.exports = router;
