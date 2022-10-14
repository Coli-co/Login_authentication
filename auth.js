const users = require('./public/user.json')

function checkUser(email, password) {
  for (let user of users) {
    if (user.email === email && user.password === password) {
      return user
    }
  }
}

module.exports = checkUser
