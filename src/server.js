const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const axios = require('axios');
const keys = require('./keys.js')

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend/:searchTerm', async (req, res) => {
  var searchTerms = req.params.searchTerm.split(',');
  //console.log(searchTerms)
  console.log('Before filter',searchTerms)
  //use map to add string to each item
  let x = searchTerms.map( (item,index)=>{
    return item+'%20'
  })

  // for(var i = 0;i<searchTerms.length;i++){
  //   if(i==0){
  //     x.splice(i+1, 0, orOperator)
  //   }
  //   if(i==searchTerms.length-1){
  //     x.splice(i, 0, orOperator)
  //   }
    
  // }


  console.log('Post filter',x)
  let completeQuery = x.join('')
  console.log('Complete Query:',completeQuery)
    //console.log(req)
    // res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    // console.log(req.body)
    const accessToken = keys.REACT_APP_ACCESS_TOKEN
    const twitterCredentials = {
        client: {
          id: keys.REACT_APP_ID,
          secret: keys.REACT_APP_SECRET
        },
        auth: {
          tokenHost: 'https://api.twitter.com',
          tokenPath: '/oauth2/token',
          revokePath: '/oauth2/invalidate_token'
        }
      };
      // Initialize the OAuth2 Library
      const twitterOauth2 = require('simple-oauth2').create(twitterCredentials);
      const twitterTokenConfig = {
        scope: 'read',
      };

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
      
        let query = '?q='+completeQuery

        //(soccer%20OR%20basketball)

        let completeURL = 'https://api.twitter.com/1.1/search/tweets.json'+query+'&tweet_mode=extended&result_type=recent'
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