const express = require('express')
const upload = require("../middlewares/multerConfig.js")

const router = express.Router()
router.get('/', async (req, res) => {
    return res.json({ success: true, message: 'Welcome to backend.' })
})


router.post('/search', require('./search.route.js'));
router.post('/saveDocument',upload.single('document'), require('./saveDocument.route.js'));
router.get('/uploadForm', async (req,res)=> {
    res.sendFile(__dirname + '/test.html');
})
module.exports = router