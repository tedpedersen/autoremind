const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.session);

    res.render('index', {
        //add something for testes
        success: true
    });
})

router.get('/calendar', (req, res) => {
    console.log(req.session);

    res.render('calendar', {
        //comes from views folder
        success: true
    });
})


module.exports = router;