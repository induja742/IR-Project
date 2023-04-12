const { getQueryVector } = require("../services/indexQueryingServices/queryEngine");
const { getRankedDocuments } = require("../services/indexQueryingServices/rankingEngine");

async function searchDocuments(req, res) {
    let query = req.body.query;

    //Query engine -> Change term to term vector
    //Ranking engine -> Calculate cosine simlarity with each doc and sort them

    let queryVector;
    try {
        queryVector = await getQueryVector(query);
    } catch (err) {
        console.error("Error in fetching query vector");
        console.error(err);
        return res.json({ success: false, message: 'Please try again later' })
    }

    let matchedDocuments;
    try {
        matchedDocuments = await getRankedDocuments(queryVector);
        console.log('Returned docs by ranking engine: ', matchedDocuments)
    } catch (err) {
        console.error("Error in ranking engine");
        console.error(err);
        return res.json({ success: false, message: 'Please try again later' })
    }

    return res.json({ success: true, matchedDocuments });

}

module.exports = searchDocuments;