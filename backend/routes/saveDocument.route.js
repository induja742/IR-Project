const docDetails = require("../models/docDetails.model.js")

async function saveDocument(req, res) {
    
    console.log(req.file)
    console.log(req.body.title) 
    const title = req.body.title;
    
    //Call -> Term Compute Engine for this document
    res.json({success: true, message: 'Document has been successfully added to the repository'})
    
}

module.exports = saveDocument;