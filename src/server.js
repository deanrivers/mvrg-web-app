// const express = require('express');
// const bodyParser = require('body-parser')
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 8080;
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(process.env.PORT || 8080);
// // app.listen(port, () => console.log(`Listening on port ${port}`));
// console.log(`Listening on port ${port}`)

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const axios = require('axios');


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', async (req, res) => {
  //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    const accessToken = '1230503856813084672-OhPWOMQgk1mxeXNyeX4nc4ViewDOhq'
    const twitterCredentials = {
        client: {
          id: 'OgBtfenn7MGg0OqJdJiT0SV27',
          secret: 'r2nn8JKZlYpSknTe04UBipP4UL54n7A6rS2qg0kBXVhftOBGYL'
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
       const response = await axios.get('https://api.twitter.com/1.1/search/tweets.json?q=turtles%20bears', config)
        const data = await response.data

        res.send(data) 
        console.log(data)
    } catch(error){
        console.log(error)
        }
    
} catch(error){
    console.log(error)
    }
});