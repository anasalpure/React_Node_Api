const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretkey ="anas_alpure_sec";

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => { 
  res.json({
    message: 'Post created...',
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com',
    admin:1
  }

  jwt.sign({user}, secretkey , (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space [Bearer <access_token>]
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const Token = bearer[1]; //<access_token>
    // verify the token
    console.log(Token);

    jwt.verify(Token, secretkey , (err, authData) => {
        if(err) {
            console.log(err);
           res.sendStatus(403);
        } else {
           // Next middleware
           console.log(authData);
           next();
        }
    });
   
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));