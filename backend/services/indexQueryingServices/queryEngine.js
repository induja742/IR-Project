const { runPythonModel } = require("../indexCreationServices/termComputeEngine");
const TermIdMapping = require('../../models/termIdMapping.model')
//TO-DO
async function getQueryVector(query) {
    query = await runPythonModel(query)
    query = query.split(' ');
    let mappings = await TermIdMapping.find({
        'term_name': {'$in': query}
    })

    let dbTermToIndex = new Map();
    for(let i=0;i<mappings.length;i++) {
        dbTermToIndex.set(mappings[i].term_name, mappings[i].term_id);
    } 

    let indexToCount = new Map();
    for(let i=0;i<query.length;i++) {
        let currIndex = -1;
        if(dbTermToIndex.has(query[i])) {
            currIndex = dbTermToIndex.get(query[i]);
        }
        if(currIndex!=-1) {
            if(indexToCount.has(currIndex)) {
                indexToCount.set(currIndex,indexToCount.get(currIndex)+1);
            } else {
                indexToCount.set(currIndex, 1);
            }
        }
    }
    return indexToCount;
}

module.exports = {getQueryVector}