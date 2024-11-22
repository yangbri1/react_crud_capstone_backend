// import necessary JS modules
import express from 'express';
// 'from hereonafter 'forumSchema' is now referred to as 'Forum'
import Forum from '../models/forumSchema.mjs';

// initialize Express
const router = express.Router();

// testing route
// router.get('/', (req, res) => {
//     res.send(`*Rumble rumble* who's that? O_O -It's me forum route`);
// });

// 1. specify collection
// 2. specify action
// 3. return results
// 4. wrap in try-catch to handle extraneous errors

/* CREATE */
// create a new forum comment for MongoDB "Forum" db
router.post('/', async (req, res) => {
    try {
        // no need to specify collection w/ Mongoose as it's taken care of elsewhere
        // create new instance of model, passing in new document
        const newForum = new Forum(req.body);
        // invoke .save() method to save newly created Forum document to db
        await newForum.save();
        // return all forums in JSON string format to client
        res.json({});
    } catch (err) {
        // console out any errors to CLI
        console.error(err);
        // output custom error "500" w/ messae to Thunder-Bird/Postman/browser inspect in JSON format
        res.status(500).json({msg: "Internal Server Error - POST"});
    }
});

/* READ */
// yield all of the documents in Forum collection
router.get('/', async (req, res) => {
    try {
        // apply Mongoose .fmond() method to look for ALL documents
        const allForum = await Forum.find({});
        res.json(allForum);

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET ALL"});
    }
});

// retrieve a forum comment by it's unique "_id"
router.get('/forum/:id', async (req, res) => {
    try {
        // look for a forum comment by it's "_id"
        const singleForum = await Forum.findById(req.params.id);
        // pull out single forum comment & paste info into JSON string format
        res.json(singleForum);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET Forum (singular :id)"})
    }
});

// find all high priority messages
router.get('/priority/high', async (req, res) => {
    try {
        // collect all urgent messages
        const priority_high = await Forum.urgencyHigh({});
        // yield all high priority forum comments
        res.json(priority_high);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET Priority HIGH"});
    }
});

// find all low priority messages
router.get('/priority/low', async (req, res) => {
    try {
        // collect all less consequential messages
        const priority_high = await Forum.urgencyLow({});
        // yield all casual forum comments
        res.json(priority_high);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET Priority LOW"});
    }
});

// find all non-validated (possibly spam bot / need additional verification by human) messages
router.get('/verify', async (req, res) => {
    try {
        // collect all messages not passing captcha
        const verify_again = await Forum.robots({});
        // yield all suspicious comments
        res.json(verify_again);
    } catch (err) {
        // prompts when any error is detected
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET Verify"});
    }
});

/* UPDATE (.patch() works too -- partial change) */
// access an existing forum message by their :id & update their information body
router.put('/:id', async (req, res) => {
    try {
        /* Note: To use ANY Mongoose's methods, Mongoose must be connected to MongoDB which is here in "server.mjs" (connectDB() function invoked)
        this is because Mongoose is an Object Data Modeling (ODM) library for MongoDB */
        // utilize .findByIdAndUpdate() Mongoose method to 1) look for :id in req.params.id, 2) update data in req.body, 3) return updated data {new: true}
        let updatedForum = await Forum.findByIdAndUpdate(req.params.id, req.body, {new: true});

        // return results to client as JSON string
        res.json(updatedForum);

    } catch (err) {
        // display any error message onto CLI
        console.error(err);
        
        // catch throw out custom error code & error message
        res.status(500).json({msg: "Internal Server Error - PUT"});
    }
});

/* DELETE */
// access forum message by their request parameters :id & permanently remove it from database
router.delete('/:id', async (req, res) => {
    try {
        // find forum message by requested :id, delete & cache it to variable "deletedForum"
        let deletedForum = await Forum.findByIdAndDelete(req.params.id);

        // call forth the deleted forum from the database
        res.json(deletedForum);
        
    } catch (err) {
        // throw custom status with custom message if encounter an error
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - DELETE"});
    }
});

// export router to server.mjs (brain of operations)
export default router;