// import relevant modules to be used
import express from 'express';
import Literary_Work from '../models/literaryWorkSchema.mjs';

// initialize Express' Router instance
const router = express.Router();

// testing route
router.get('/', (req, res) => {
    res.send(`Testing literary work routes`);
});

// 1. specify collection
// 2. specify action
// 3. return results
// 4. wrap in try-catch to handle any extraneous errors

/* CREATE */
// place a new devil fruit to MongoDB Literary_Work collection
router.post('/', async (req, res) => {
    // try-catch block to catch any potential errors
    try {
        // no need to specify collection with Mongoose as it's done elsewhere
        // create new instance of the model, pass in new document
        const newLiterary_Work = new Literary_Work(req.body);

        // invoke .save() method to save newly created document (literary work) to database
        await newLiterary_Work.save();

        // return all devil fruits in JSON string format to client
        res.json({});
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);

        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - POST"});
    }
});

/* READ */
// retrieve all of the documents in Literary_Work collection
router.get('/', async (req, res) => {
    // try-catch error handling to handle any possible extraneous errors
    try {
        // call Mongoose .find() function with empty object {} to query all documents from Literary_Work collection
        // Aside: .find() method could look for documents fulfilling a single-field or compound fields
        const allLiterary_Work = await Literary_Work.find({});
        
        // return all devil fruits in JSON string format to client
        res.json(allLiterary_Work);
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);
        
        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - GET"});
    }
});

/* UPDATE */
/* DELETE */

export default router;