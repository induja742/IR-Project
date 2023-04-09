const router = require('express').Router()

router.get('/', (req, res)=>{
    return res.json({success: true, message: 'Welcome to backend.'})
})

module.exports = router