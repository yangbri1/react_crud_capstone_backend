// import relevant modules to be used
import express from 'express';
import Animation from '../models/animationSchema.mjs';

// initialize Express' Router instance
const router = express.Router();

// testing route
// router.get('/', (req, res) => {
//     res.send(`Testing animation routes`);
// });

// 1. specify collection
// 2. specify action
// 3. return results
// 4. wrap in try-catch to handle any extraneous errors

/* CREATE */
// create a new animation to be added to MongoDB Animation collection
router.post('/', async (req, res) => {
    // try-catch block to catch any potential errors
    try {
        // no need to specify collection with Mongoose as it's done elsewhere
        // create new instance of the model, pass in new document
        const newAnimation = new Animation(req.body);

        // invoke .save() method to save newly created document (animation) to database
        await newAnimation.save();

        // return all Animations in JSON string format to client
        res.json({});
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);

        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - POST"});
    }
});
/* READ */
// retrieve all of the documents in Animation collection
router.get('/', async (req, res) => {
    // try-catch error handling to handle any possible extraneous errors
    try {
        // call Mongoose .find() function with empty object {} to query all documents from Animation collection
        // Aside: .find() method could look for documents fulfilling a single-field or compound fields
        const allAnimations = await Animation.find({});
        
        // return all Animations in JSON string format to client
        res.json(allAnimations);
        
    } catch (err) {
        // console out error in command line interface
        console.error(err);
        
        // output custom error "500" and message to 
        res.status(500).json({msg: "Internal Server Error - GET"});
    }
});

// fetch single Animation by its unique "_id"
// Side Note: required additional req.path /animation added to req.baseUrl /animation else this GET route overshadows all other child routes built on base Url path /Animations afterwards
router.get('/animation/:id', async (req, res) => {
    // try-catch block to catch any possible errors from invalid :id insertion by user
    try {
        /* Note: Since Mongoose inherently type-cast fields, there is no need to wrap the parameter id within ObjectId() */
        // use Mongoose's .findById() method to query by document's "_id"
        const singleAnimation = await Animation.findById(req.params.id);
        /* Aside: res.send() method will also work here, but since we are working with Express -- develop RESTful API's ... 
        handling JSON data, may be better to use res.json() [converts to json stringify & res.send() at end anyways] */
        res.json(singleAnimation);
    } catch (err) {
        // logs out error, status code, custom message if encounter error
        console.error(err);
        res.json({msg: "Internal Server Error - GET Animation (singular)"}).status(500);
    }
});

/* score, original, unoriginal, tbd, ongoing, completed */
// get all animations with ratings (should be similar to get all animations route if this field is required ...)
router.get('/scores', async (req, res) => {
    try {
        // collect all of the animations with ratings
        let scores = await Animation.scoreIncluded({});
        // print out cumulative scores
        res.json(scores);
    } catch (err) {
        // console out errors
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET All Scores"})
    }
});

// find all "ORIGINAL" animations
router.get('/label/original', async (req, res) => {
    try {
        // gather up all "ORIGINAL" animations
        let label_original = await Animation.labelOriginal({});
        // log out all animations given an "ORIGINAL" label
        res.json(label_original);
    } catch (err) {
        // print out errors, error code, error message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET ORIGINAL Label"});
    }
});

// find all "UNORIGINAL" animations with source materials
router.get('/label/unoriginal', async (req, res) => {
    try {
        // gather up all "UNORIGINAL" animations
        let label_unoriginal = await Animation.labelUnoriginal({});
        // log out all animations given an "UNORIGINAL" wanted status
        res.json(label_unoriginal);
    } catch (err) {
        // print out errors, error code, error message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET UNORIGINAL Label"});
    }
});

// find all "TBD" airing status
router.get('/status/tbd', async (req, res) => {
    try {
        // gather up all "TBD" airing statuses
        let status_tbd = await Animation.airingTBD({});
        // log out all animations given an "TDB" status
        res.json(status_tbd);
    } catch (err) {
        // print out errors, error code, error message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET TBD Status"});
    }
});

// find all "ONGOING" airing status
router.get('/status/ongoing', async (req, res) => {
    try {
        // gather up all "ONGOING" airing statuses
        let status_ongoing = await Animation.airingOngoing({});
        // log out all animations given an "ONGOING" status
        res.json(status_ongoing);
    } catch (err) {
        // print out errors, error code, error message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET ONGOING Status"});
    }
});

// find all "COMPLETED" airing status
router.get('/status/completed', async (req, res) => {
    try {
        // gather up all "COMPLETED" airing statuses
        let status_completed = await Animation.airingCompleted({});
        // log out all animations given an "TDB" status
        res.json(status_completed);
    } catch (err) {
        // print out errors, error code, error message
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - GET COMPLETED Status"});
    }
});

/* UPDATE (.put() method works too!)*/
// access an existing animation by their :id & update their underlying info 
router.patch('/:id', async (req, res) => {
    try {
        /* Note: To use ANY Mongoose's methods, Mongoose must be connected to MongoDB which is here in "server.mjs" (connectDB() function invoked)
        this is because Mongoose is an Object Data Modeling (ODM) library for MongoDB */
        // utilize .findByIdAndUpdate() Mongoose method to 1) look for :id in req.params.id, 2) update data in req.body, 3) return updated data {new: true}
        let updatedAnimation = await Animation.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
        // spew back results to client (view via Thunder-Client) as JSON string
        res.json(updatedAnimation);

    } catch (err) {
        // display any error message onto CLI
        console.error(err);
        
        // catch throw out custom error code & error message
        res.status(500).json({msg: "Internal Server Error - PATCH"});
    }
});

/* DELETE */
// access an animation by their request parameters :id & permanently remove animation from MongoDB database
router.delete('/:id', async (req, res) => {
    try {
        // find Animation by requested :id, delete & cache it to variable "deletedAnimation"
        let deletedAnimation = await Animation.findByIdAndDelete(req.params.id);

        // call forth the deleted Animation from the database -- do not need to return if not wanted
        res.json(deletedAnimation);
        
    } catch (err) {
        // throw custom status with custom message if encounter an error
        console.error(err);
        res.status(500).json({msg: "Internal Server Error - DELETE"});
    }
});

export default router;