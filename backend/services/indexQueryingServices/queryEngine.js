const { runPythonModel } = require("../indexCreationServices/termComputeEngine");
const TermIdMapping = require('../../models/termIdMapping.model')
//TO-DO
async function getQueryVector(query) {
    query = await runPythonModel(query)
    query = query.split(' ');
    let mappings = await TermIdMapping.find({
        'term_name': {'$in': query}
    })
    let termIndexCount = new Map(), termIndex = new Map();
    for(let i=0;i<mappings.length;i++) {termIndex[mappings[i].term_name] = mappings[i].term_id; termIndexCount[mappings[i].term_id]=0;}
    for(let i=0;i<query.length;i++) termIndexCount[termIndex[query[i]]]++;
    console.log(termIndexCount);
}

module.exports = {getQueryVector}