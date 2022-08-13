const Express = require('express');
const router = Express.Router()
const users = require ('./users.json')

// getting username object list from users list in users.json file
router.get('/users', (req, res) => {
  const usernames = []
  users.forEach((user) => {
    usernames.push(
      {
        username : user.username
      })
  })
  res.send(usernames)
})

// render index page
router.get('/index', (req, res) => {
  res.render('pages/index.ejs')
})

// render suit-game page
router.get('/suit-game', (req, res) => {
  res.render('pages/suit-game.ejs')
})

module.exports = router