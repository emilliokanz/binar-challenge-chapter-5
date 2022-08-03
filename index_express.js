import Express from 'express';
import * as fs from 'fs';

const { readFileSync } = fs; 
const app = Express();

const USERNAME = "admin";
const PASSWORD = "12345";

app.use(Express.static('./static'))
app.use(Express.json())

// a middleware will be run before the request get sent to handler
// next() function will continue the request to the next handler
app.use('/', (req, res, next ) => {
 const username = req.body.username;
 const password = req.body.password;
 
  if (username != USERNAME) {
    return res.send('wrong username')
  }

  if (password != PASSWORD) {
    return res.send('wrong password')
  }

  console.log('this is the middleware')
  return next()
})

// '/' is for routing, so when the route is selected, will respond with determined respond
app.get('/', (req, res) => {
  const fileContent = readFileSync('./index.html')  
  // content type to be shown has to be determined
  res.header('Content-Type', 'text/html')
  res.send(fileContent)
})

app.get('/suit-game', (req, res) => {
  const fileContent = readFileSync('./suit-game.html')  
  // content type to be shown has to be determined
  res.header('Content-Type', 'text/html')
  res.send(fileContent)
})

app.listen(4000)

// post, and delete request can be sent trough terminal with curl -x POST localhost:3000/save-user

