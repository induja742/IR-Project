const {readFileContents} = require("../services/indexCreationServices/termComputeEngine.js");
/**
 * Objective: 
 * Save a document's binary to the file server
 * Save that documents vector to the database (doc_details)
 *  path_to_doc: String
    mod: Number
    tfs: [Number]
    title:String
    body: String
 * Get {tfs,mod} = documentToDocVector(termCompute(filePath).map)
 */
async function saveDocument(req, res) {
    

    readFileContents(req.file.filename, req.body.title)
    .then(()=>{
        res.json({success: true, message: 'Document has been successfully added to the repository'})
    })
    .catch(err=> {
        console.error(err)
        res.json({success: false, message: 'Document was not uploaded successfully'})
    })
    
    
}

module.exports = saveDocument;