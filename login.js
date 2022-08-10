import Express from 'express';
import lodash from 'lodash';
import bodyParser from 'body-parser'
import * as fs from 'fs';

const { readFileSync } = fs; 
const app = Express();
const _ = lodash

const users = [
  {
    username: 'admin',
    password: '12345'
  },
  {
    username: 'player2',
    password: 'pL4Y3r'
  }
]

app.set('view engine', 'ejs')
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('./static'))

app.get('/', (req, res) => {
  res.render('pages/login.ejs')
//  const loginContent = readFileSync('./login.html')  
//  res.header('Content-Type', 'text/html')
//  res.send(loginContent)
})

app.post('/auth', (req, res, next ) => {
 const username = req.body.username;
 const password = req.body.password;

  // find matching user in mockup user datas
 const user = _.find(users, function(x) {return x.username == username})
  
  // logic for authentication
if (!user) {
  res.send('user not found')
}
if (user.password != password) {
  res.send('wrong password')
}

//  console.log(user)
// redirect to index page if authenticated
 res.redirect('/index') 
})
// getting user list without password
app.get('/users', (req, res) => {
  const usernames = []
  users.forEach((user) => {
    usernames.push(user.username)
  })
  res.send(usernames)
})

// '/' is for routing, so when the route is selected, will respond with determined respond
app.get('/index', (req, res) => {
  res.render('pages/index.ejs')
  // const fileContent = readFileSync('./index.html')  
  // res.header('Content-Type', 'text/html')
  // res.send(fileContent)
})

app.get('/suit-game', (req, res) => {
  res.render('pages/suit-game.ejs')
  // const fileContent = readFileSync('./suit-game.html')  
  // res.header('Content-Type', 'text/html')
  // res.send(fileContent)
})

app.listen(4000)

// post, and delete request can be sent trough terminal with curl -x POST localhost:3000/save-user

