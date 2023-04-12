/**
 * Objectives:
 * Parse Text from all pdfs
 * Tokenize them all
 * Stemming
 * Calculate term frequency for every term in a document
 * Normalize that term frequency using (1+log(tf))
 * Save this in doc_details for every doc
*/

const { spawnSync } = require("child_process");
const path = require('path');
const { promises: fs } = require('fs');
const pdfParse = require('pdf-parse')
const documentToDocVector = require("./documentToDocVector.js");
const DocDetails = require("../../models/docDetails.model.js");

// Function to fetch all docs in documents directory.
async function readFileNames() {
    files = await fs.readdir(__dirname + '/../../documents')
    return files
}

// Function to read contents of a file.
async function readFileContents(fileName, title) {
    // console.log(fileName, title)
    console.log(__dirname + '/../../documents/' + fileName)
    let readFile = await fs.readFile(__dirname + '/../../documents/' + fileName)
    try {
        let pdfExtract = await pdfParse(readFile)
        // console.log(pdfExtract)
        // pdfExtract.text = runPythonModel([pdfExtract.text])
        if (title.length) title = pdfExtract.text.substring(0, 50);
        let body = pdfExtract.text.substring(0, 200)
        let content = runPythonModel([pdfExtract.text]), path = fileName;
        console.log(content)
        content = content.split(' ')
        let contentMap = new Map()
        for (let i = 0; i < content.length; i++) contentMap[content[i]] = 0;
        for (let i = 0; i < content.length; i++) contentMap[content[i]]++;
        let mappings = [];
        for (var [key, value] of Object.entries(contentMap)) {
            mappings.push({ term: key, count: value });
        }
        let docToBeSaved = { mappings, body, title, path }
        // console.log(docToBeSaved);

        try {
            let resp = await documentToDocVector(docToBeSaved)
            console.log("Success in documentToDocVector")
        } catch(err){
            console.error(err)
        }
    } catch (error) {
        throw new Error(error)
    }
}

// Function for tokenizing, removal of stopwords, extra characters, stemming
function runPythonModel(arr) {
    console.log(arr)
    const python = spawnSync("python", [
        `./services/indexCreationServices/preprocess.py`,
        JSON.stringify({ arr })
    ]);
    let result = python.stdout?.toString()?.trim();
    const error = python.stderr?.toString()?.trim();
    if (error) {
        console.log(error)
        throw 'Error';
    } else {
        return result
    }
}

async function getPDF() {

    let alreadyAvailableDocs = new Set();
    try {
        let dbResponse = await DocDetails.find({},{path_to_doc:1});
        // console.log(dbResponse)
        dbResponse.forEach(({path_to_doc})=> {
            alreadyAvailableDocs.add(path_to_doc);
        })
    } catch(dbError) {
        console.error('Error in fetching all doc details');
        throw dbError;
    }
    let files = await readFileNames()
    // console.log(files);
    for (let i = 0; i < files.length; i++) if(alreadyAvailableDocs.has(files[i]) == 0) {
        console.log('Reading ', files[i]);
        await readFileContents(files[i], '')
        // contents.content = runPythonModel([contents.content])
    }
}

module.exports = {getPDF, readFileContents, runPythonModel}