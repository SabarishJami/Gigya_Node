var router = require('express').Router();
const jwt = require('jsonwebtoken')

router.get('/pluck', (req, res) => {
    if (req.decoded)
        res.send({
            uid: req.decoded
        })
    else
        res.send('something wemt wrong')
})

router.post('/check', (req, res) => {
    if (req.decoded)
        res.send({
            uid: req.decoded
        })
    else
        res.send('something wemt wrong')
})

module.exports = router;