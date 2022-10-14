const users = require('./public/user.json')

function checkUser(email, password) {
  for (let user of users) {
    if (user.email === email && user.password === password) {
      return user
    }
  }
}

function checkLoginStatus(req, res, next) {
  if (req.session.user) {
    console.log('Authenticated')
    next()
  } else {
    console.log('Not authenticated')
    return res.redirect('/')
  }
}

module.exports = { checkUser, checkLoginStatus }
