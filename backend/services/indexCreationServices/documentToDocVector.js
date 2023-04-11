/**
 * Objectives:
      Save term-id mapping to db
      Create a documents tfs vector
 * Methodology:
    Creating tfs array
    1. Fetch the termIdMapping
    2. For every term in term-count map, find terms id in termIdMapping
    3. Change the map from term-count to term_id-count
    4. For terms not found in termIdMapping, get the largest index from termIdMapping and start assigning new id's
    5. Save those to termIdMapping
    6. Add these new terms to term_id-count map
    7. Create the tfs array by traversing the term_id map in sorted order
    8. For indexes not found put zero
    9. 'mod' will be rooted square sum of tfs
 * @mappings : Array of objects of type {term : term-frequency}
 * @toReturn : {tfs : [Number], mod: Number}
*/

const DocDetails = require("../../models/docDetails.model.js");
const TermIdMapping = require("../../models/termIdMapping.model.js"); 
//Schema for the above : {term_name:'String', term_id: Int}
module.exports = async function documentToDocVector({title,body,path,mappings}) {

   let termIdMapping = new Map();
   try {
      let dbResponse = await TermIdMapping.find();
      dbResponse.forEach(({term_name, term_id})=>{
         termIdMapping.set(term_name, term_id);
      })
   } catch(dbCallError) {
      console.error("Error in fetching term id mapping from the db");
      throw dbCallError;
   }

   console.log(termIdMapping);
   let currentLargestId = termIdMapping.size;
   let newTermIdMappings = [];
   let idToCountMappings = new Map();
   mappings.forEach(({term, count})=>{
      if(termIdMapping.has(term)) {
         idToCountMappings.set(termIdMapping.get(term), count);
      } else {
         //Save this terms mapping to db
         newTermIdMappings.push({term_name: term, term_id: currentLargestId});
         //And save here in idToCountMapping as well
         idToCountMappings.set(currentLargestId, count);
         currentLargestId++;
      }
   })

   
   let tfs = Array(currentLargestId).fill(0);
   let mod = 0;
   for(let [termId, termCount] of idToCountMappings) {
      tfs[termId] = 1 + ((termCount == 0) ? -1 :  Math.log(termCount));
      mod = mod + tfs[termId] * tfs[termId];
   }
   mod = Math.sqrt(mod);
   
   console.log(newTermIdMappings)
   //Saving new Mappings to termIdMapping in the database
   try {
      await TermIdMapping.insertMany(newTermIdMappings);
   } catch(dbSaveError) {
      console.error("Error in saving new mappings to the database");
      throw dbSaveError;
   }


   let docObject = {
      title: title, 
      body: body,
      path_to_doc: path || '',
      mod,
      tfs
   }

   new DocDetails(docObject).save()
      .then((dbResponse)=>{
         console.log("Successfully saved in doc details");
      })
      .catch(dbSaveError=> {
         console.error("Error in saving doc details");
         throw dbSaveError;
      })
}