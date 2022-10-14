const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const { checkUser, checkLoginStatus } = require('./auth')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'first-try',
    resave: true,
    saveUninitialized: false
  })
)

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  const user = checkUser(email, password)

  if (user) {
    req.session.user = user.firstName

    return res.send(`Welcome, ${user.firstName}.`)
  }
  return res.send(
    'Invalid email or password, please check your input correctly!'
  )
})

app.get('/welcome', checkLoginStatus, (req, res) => {
  const user = req.session.user
  return res.render('welcome', { user })
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
