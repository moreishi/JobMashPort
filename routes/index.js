var Twitter = require('twitter');
var express = require('express');
var router = express.Router();

// Twitter Instance
var client = new Twitter({
  consumer_key: 'hieA3RiyJrriwfWHEg7gKA',
  consumer_secret: 'LcFNDfPZthePBimntLHYzIjvFsDXsbbCmczWRe2R1c',
  access_token_key: '36963630-1csCMGuBSJd9y5rE1ISMQgiJSdugPRcKEYLy6iUra',
  access_token_secret: 'IARmMITyjP1ptX8WZ79HmXLWuVs3TB3XTbRT2fomws4'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Twitter */
router.get('/api/twitter', function(req, res, next) {

  client.stream('filter', { track: 'angularjobs' }, function(error, tweets, response){
    console.log(error);
    if (!error) {
      console.log(tweets);
      res.json(tweets);
    }
  });

  
});

module.exports = router;