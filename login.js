import Express from 'express';
import lodash from 'lodash';


const app = Express();
const _ = lodash

const users = [
  {
    username: 'admin',
    password: '12345'
  },
  {
    username: 'player',
    password: 'pL4Y3r'
  }
]

app.set('view engine', 'ejs')
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('./static'))

app.get('/', (req, res) => {
  res.render('pages/login.ejs', {status: ''})
})

app.post('/auth', (req, res, next ) => {
 const username = req.body.username;
 const password = req.body.password;
 

  // find matching user in mockup user datas
 const user = _.find(users, function(x) {return x.username == username})
  
  // logic for authentication
if (!user) {
  res.render('pages/login.ejs', { status: 'username not found'})
}
if (user.password != password) {
  res.render('pages/login.ejs', { status: 'wrong password'})
}
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

app.get('/index', (req, res) => {
  res.render('pages/index.ejs')
})

app.get('/suit-game', (req, res) => {
  res.render('pages/suit-game.ejs')
})

app.listen(4000)

// post, and delete request can be sent trough terminal with curl -x POST localhost:3000/save-user

