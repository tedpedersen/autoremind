const router = require('express').Router()

router.get('/', (req, res) => {
  console.log(req.session)

  res.render('index', {
    //add something for testes
    success: true
  })
})

router.get('/calendar', (req, res) => {
  console.log(req.session)

  res.render('calendar', {
    //comes from views folder
    success: true
  })
})

//login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})

module.exports = router
