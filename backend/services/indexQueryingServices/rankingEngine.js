const DocDetails = require("../../models/docDetails.model.js");

async function getRankedDocuments(queryVector) {
    //Findind mod of query vector -> Based on normalised term frequency
    let queryMod = 0;
    let selectedIds = [];
    let queryV = []
    for (let [key, value] of queryVector) {
        console.log(key, value);
        queryMod += value * value;
        selectedIds.push(Number(key));
        queryV.push(Number(value))
    }
    queryMod = Math.sqrt(queryMod);
    // console.log(selectedIds);
    let candidateDocuments;
    try {
        // candidateDocuments = await DocDetails.find()
        candidateDocuments = await DocDetails.aggregate([
            {
                "$addFields": {
                    "tfs": {
                        "$map": {
                            "input": selectedIds,
                            "as": "i",
                            "in": {
                                "$arrayElemAt": [
                                    "$tfs",
                                    "$$i"
                                ]
                            }
                        }
                    }
                }
            }
        ])
    } catch (dbError) {
        console.error("Error in fetching doc_details from database");
        throw dbError;
    }


    candidateDocuments.forEach((currDoc) => {
        currDoc.currCosineSimilarity = 0;
        for (let i=0;i<queryV.length;i++) {
            if(currDoc.tfs[i]==null) currDoc.tfs[i]=0;
            currDoc.currCosineSimilarity += currDoc.tfs[i] * queryV[i];
        }
        if(queryMod!=0 && queryMod!=0) {
            currDoc.currCosineSimilarity /= currDoc.mod * queryMod;
        }
    })

    candidateDocuments.sort((a, b) => {
        return b.currCosineSimilarity - a.currCosineSimilarity;
    })

    return candidateDocuments.slice(0, 10);

}

module.exports = { getRankedDocuments };