const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const axios = require('axios');
const url = require('url')
const keys = require('./keys.js')

// const dotenv = require('dotenv')
// dotenv.config()
// console.log(dotenv.config)


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend/:searchTerm', async (req, res) => {
  var searchTerms = req.params.searchTerm.split(',');
  //console.log(searchTerms)
  console.log(searchTerms)
  //use map to add string to each item
  let x = searchTerms.map( (item,index)=>{
    if(index==0){ //first index
      return '('+item+'%20'
    } else if(index==searchTerms.length-1){ //last index
      return '%20'+item+')'
    } else{ //everything else in between
      return 'OR%20'+item+'%20OR'
      //(soccer%20OR%20basketball%20OR%20india)
    }
  })

  console.log(x)
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
        

        let completeURL = 'https://api.twitter.com/1.1/search/tweets.json'+query
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