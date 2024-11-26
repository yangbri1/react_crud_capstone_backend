// // import dataset of documents to be populated
// import animation from '../data/animation_data.mjs';

// // import animationSchema (referred by Animation outside)
// import Animation from '../models/animationSchema.mjs';

// // need to use a seed function to populate MongoDB database's collections (animations, literary_works) otherwise it won't show outside of local machine
// // anything with database needs "async" function to enable "await" (COnvert Promise to useable JSON) & why not try-catch too
// async function seedDB(req, res){
//     try {
//         // delete all previous documents in "animation" collection
//         await Animation.deleteMany({});
//         // start populating empty "animation" collection with sample dataset
//         await Animation.create(animation);
//     } catch (err) {
//         console.error(err);
//         // send custom error code with a custom JSON message (can be viewed via Thunder-Bird)
//         res.status(500).json({ msg: 'Apologies -- Server-Side Error'});
        
//     }
// }

// // export seed function into respective routes module
// export default { seedDB };