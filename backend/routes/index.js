const router = require('express').Router()
const TermIdMapping = require("../models/termIdMapping.model.js")
const docDetails = require("../models/docDetails.model.js")

router.get('/', async (req, res) => {
    //Testing db

    // const mapping = new TermIdMapping({
    //     term_name: 'test_term',
    //     term_id: 0
    // })

    // try {
    //     await mapping.save();
    // } catch(dbSaveError) {
    //     console.error("Error in saving to the db : ", dbSaveError)
    // }

    // const doc = new docDetails({
    //     title: 'test',
    //     body: 'This is the body',
    //     path_to_doc: 'ALso a string',
    //     mod: 54654,
    //     tfs : [34,342]
    // })
    // try {
    //     await doc.save();
    // } catch(dbSaveError) {
    //     console.error("Error in saving to the db : ", dbSaveError)
    // }

    return res.json({ success: true, message: 'Welcome to backend.' })
})

module.exports = router