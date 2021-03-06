const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const axios = require('axios');
const keys = require('./keys.js')


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log('use triggered')
  next();
});


// create a GET route
app.get('/express_backend/:searchTerm', async (req, res) => {
  console.log('backend hit')
  var searchTerms = req.params.searchTerm.split(',');
  //console.log(searchTerms)
  console.log('Before filter',searchTerms)

  //use map to add string to each item
  let x = searchTerms.map( (item,index)=>{
    //replace ands with %20
    var str = item
    var res = str.replace(/ and /gi,'%20')
    //only append "ors" to every term cluster before the last item
    if(index===searchTerms.length-1){
      return res
    } else{
      return res+'%20OR%20'
    }
  })

  console.log('Post filter',x)
  let completeQuery = x.join('')
  console.log('Complete Query:',completeQuery)

    //twitter
    const twitterCredentials = {
        client: {
          id: keys.twitter.REACT_APP_ID,
          secret: keys.twitter.REACT_APP_SECRET,
        },
        auth: {
          tokenHost: 'https://api.twitter.com',
          tokenPath: '/oauth2/token',
          revokePath: '/oauth2/invalidate_token'
        }
      };

    // Initialize the OAuth2 Library for twitter
    const twitterOauth2 = require('simple-oauth2').create(twitterCredentials);
    
    const twitterTokenConfig = {
      scope: 'read',
    };

    //twitter
    try{
        const result = await twitterOauth2.clientCredentials.getToken(twitterTokenConfig);
        const accessTokenObject = twitterOauth2.accessToken.create(result);
        const accessToken = accessTokenObject.token['access_token']
        const config = {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip'
          },
        }
      
      try{
          let query = completeQuery
          //(soccer%20OR%20basketball)
          //https://api.linkedin.com/v1/companies/1337/updates?start=20&count=10&format=json

          let completeURL = 'https://api.twitter.com/1.1/search/tweets.json?q=('+query+')&tweet_mode=extended&result_type=recent'
          console.log('Complete URL:',completeURL)
          const response = await axios.get(completeURL, config)
          const data = await response.data

          res.send(data) 
          
          //console.log(data)
          
      } catch(error){
          console.log(error)
          }
    
    } catch(error){
        console.log(error)
        }
    
    




});