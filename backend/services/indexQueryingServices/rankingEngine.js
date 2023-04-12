const DocDetails = require("../../models/docDetails.model.js");

async function getRankedDocuments(queryVector) {

    //Findind mod of query vector -> Based on normalised term frequency
    let queryMod = 0;
    for (let [key, value] of queryVector) {
        queryMod += value * value;
    }
    queryMod = Math.sqrt(queryMod);

    let candidateDocuments;
    try {
        //Optimize later
        candidateDocuments = await DocDetails.find()
        // candidateDocuments = await db.collection.aggregate([
        //     {
        //         "$addFields": {
        //             "myarray": {
        //                 "$map": {
        //                     "input": selectedIds,
        //                     "as": "doc_vector",
        //                     "in": {
        //                         "$arrayElemAt": [
        //                             "$myarray",
        //                             "$$doc_vector"
        //                         ]
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // ])
    } catch (dbError) {
        console.error("Error in fetching doc_details from database");
        throw dbError;
    }


    candidateDocuments.forEach((currDoc) => {
        currDoc.currCosineSimilarity = 0;
        for (let [key, value] of queryVector) {
            currDoc.currCosineSimilarity += currDoc.tfs[key] * value;
        }
        currDoc.currCosineSimilarity /= currDoc.mod * queryMod;
        currDoc.tfs = undefined;
    })

    candidateDocuments.sort((a, b) => {
        return b.currCosineSimilarity - a.currCosineSimilarity;
    })

    return candidateDocuments.slice(0, 10);

}

module.exports = { getRankedDocuments };