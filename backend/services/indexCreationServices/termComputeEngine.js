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
const {promises:fs} = require('fs');
const pdfParse = require('pdf-parse')

// Function to fetch all docs in documents directory.
async function readFileNames() {
    files = await fs.readdir(__dirname+'/../../documents')
    return files
}

// Function to read contents of a file.
async function readFileContents(fileName, title) {
    let readFile = await fs.readFile(__dirname+'/../../documents/'+fileName)
    try {
      let pdfExtract = await pdfParse(readFile)
      // pdfExtract.text = runPythonModel([pdfExtract.text])
      if(title.length) title = pdfExtract.text.substring(0,50);
      let body = pdfExtract.text.substring(0,200)
      let content = runPythonModel([pdfExtract.text]), path = fileName;
      content = content.split(' ')
      let contentMap = new Map()
      for(let i=0;i<content.length;i++) if(contentMap.has(content[i])) contentMap[content[i]]++; else contentMap[content[i]]=1;
      let mappings = [];
      for (var [key, value] of Object.entries(contentMap)) {  
        mappings.push({term: key, count: value});
      }
      let docToBeSaved = {mappings, body, title, path}
      // console.log(docToBeSaved);
    } catch (error) {
      throw new Error(error)
    }
}

// Function for tokenizing, removal of stopwords, extra characters, stemming
function runPythonModel(arr) {
  const python = spawnSync("python3", [
    `services/indexCreationServices/preprocess.py`,
    JSON.stringify({arr})
  ]);
  let result = python.stdout?.toString()?.trim();
  const error = python.stderr?.toString()?.trim();
  if(error) {
    console.log(error)
    return 'Error';
  } else {
    return result
  }
}

async function getPDF() {
    let files = await readFileNames()
    console.log(files);
    for(let i=0;i<files.length;i++) {
      console.log('Reading ', files[i]);
        await readFileContents(files[i], '')
        // contents.content = runPythonModel([contents.content])
    }
}

module.exports = getPDF