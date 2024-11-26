// import relevant modules to be used
import express from 'express';
import Literary_Work from '../models/literaryWorkSchema.mjs';

// initialize Express' Router instance
const router = express.Router();

// testing route
// router.get('/', (req, res) => {
//     res.send(`Testing literary work routes`);
// });

// 1. specify collection
// 2. specify action
// 3. return results
// 4. wrap in try-catch to handle any extraneous errors

/* CREATE */
// place a new document to MongoDB Literary_Work collection
router.post('/', async (req, res) => {
    // try-catch block to catch any potential errors
    try {
        // no need to specify collection with Mongoose as it's done elsewhere
        // create new instance of the model, pass in new document
        const newLiterary_Work = new Literary_Work(req.body);

        // invoke .save() method to save newly created document (literary work) to database
        await newLiterary_Work.save();

        // return all literary works in JSON string format to client
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
        
        // return all lterary works in JSON string format to client
        res.json(allLiterary_Work);
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);
        
        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - GET"});
    }
});

// grab a literary work document by its unique "_id"
router.get('/literary_work/:id', async (req, res) => {
    try {
        // search for a particular literary work in the database by it's "_id"
        const singleLiteraryWork = await Literary_Work.findById(req.params.id);
        // const singleLiteraryWork = await Literary_Work.findOne({ title: req.params.id});
        // extract a single literary work's full info document in JSON string format to browser
        res.json(singleLiteraryWork);
    } catch (err) {
        // catch any possible errors and return custom error code as well as message to client
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET Literary Work (singular :id)"});
    }
});

// grab a literary work document by its *unique* (validation rule set in respective schema) "title"
// router.get('/title/:title', async (req, res) => {
//     try {
//         // search for a particular literary work in the database by it's "title"
//         const singleLiteraryWork = await Literary_Work.findOne({ title: req.params.title});
//         // extract a single literary work's full info document in JSON string format to browser
//         res.json(singleLiteraryWork);
//     } catch (err) {
//         // catch any possible errors and return custom error code as well as message to client
//         console.error(err);
//         res.status(500).json({msg: "Internal Server Error - GET Literary Work (singular :title)"});
//     }
// });

// find all "manga" type Japanese works
router.get('/category/manga', async (req, res) => {
    try {
        // collect all "manga" pieces
        const category_manga = await Literary_Work.typeManga({});
        // yield all "manga" types
        res.json(category_manga);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET MANGA (JP) Category"});
    }
});

// find all "manhwa" type Korean works
router.get('/category/manhwa', async (req, res) => {
    try {
        // collect all "manhwa" pieces
        const category_manhwa = await Literary_Work.typeManhwa({});
        // yield all "manhwa" types
        res.json(category_manhwa);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET MANHWA (KR) Category"});
    }
});

// find all "manhua" type Chinese works
router.get('/category/manhua', async (req, res) => {
    try {
        // collect all "manhua" pieces
        const category_manhua = await Literary_Work.typeManhua({});
        // yield all "manhua" types
        res.json(category_manhua);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET MANHUA (CN) Category"});
    }
});

// snag the encompassing literary works' story status
router.get('/status', async (req, res) => {
    try {
        // collect all story status
        const story_status = await Literary_Work.statusAll({});
        // yield all story status
        res.json(story_status);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET STATUS"});
    }
});

// seize literary works with serialization (redux so if URL extends for this general path it will still show/redirect to original path)
router.get('/serialized', async (req, res) => {
    try {
        // collect all "serialized" pieces
        const serialized_yes = await Literary_Work.serializedYes({});
        // yield all "serialized" types
        res.json(serialized_yes);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET SERIALIZED"});
    }
});

// pull literary works WITHOUT serialization (let's test above first before redux here ...)
router.get('/unserialized', async (req, res) => {
    try {
        // collect all "unserialized" pieces
        const serialized_no = await Literary_Work.serializedNo({});
        // yield all "serialized" types
        res.json(serialized_no);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET UNSERIALIZED"});
    }
});

/* UPDATE */
// access an existing literary work by their :id & update their information body
router.patch('/:id', async (req, res) => {
    try {
        /* Note: To use ANY Mongoose's methods, Mongoose must be connected to MongoDB which is here in "server.mjs" (connectDB() function invoked)
        this is because Mongoose is an Object Data Modeling (ODM) library for MongoDB */
        // utilize .findByIdAndUpdate() Mongoose method to 1) look for :id in req.params.id, 2) update data in req.body, 3) return updated data {new: true}
        let updatedLW = await Literary_Work.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
        // return results to client as JSON string
        res.json(updatedLW);

    } catch (err) {
        // display any error message onto CLI
        console.error(err);
        
        // catch throw out custom error code & error message
        res.status(500).json({msg: "Internal Server Error - PATCH"});
    }
});

/* DELETE */
// (awfully similar to UPDATE route method above) access literary work by their request parameters :id & permanently remove it from database
router.delete('/:id', async (req, res) => {
    try {
        // find literary work by requested :id, delete & cache it to variable "deletedLW"
        let deletedLW = await Literary_Work.findByIdAndDelete(req.params.id);

        // call forth the deleted literary work from the database
        res.json(deletedLW);
        
    } catch (err) {
        // throw custom status with custom message if encounter an error
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - DELETE"});
    }
});

export default router;