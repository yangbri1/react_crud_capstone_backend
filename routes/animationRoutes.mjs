// import relevant modules to be used
import express from 'express';
import Animation from '../models/animationSchema.mjs';

// initialize Express' Router instance
const router = express.Router();

// testing route
router.get('/', (req, res) => {
    res.send(`Testing animation routes`);
});

// 1. specify collection
// 2. specify action
// 3. return results
// 4. wrap in try-catch to handle any extraneous errors

/* CREATE */
/* READ */
/* UPDATE */
/* DELETE */

export default router;