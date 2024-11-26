// import necessary modules/libarares for functioning server-side MongoDB database 
import express from 'express';
import dotenv from 'dotenv';
// body-parser middleware module to parse data from incoming HTTP request bodies
import bodyParser from 'body-parser';
// bring in connectDB functon module to esetablish connection to MongoDB
import connectDB from './db/conn.mjs';

// later will also bring routes to the brain "server.mjs" to be run 
import animationRoutes from './routes/animationRoutes.mjs';
import literaryWorkRoutes from './routes/literaryWorkRoutes.mjs';
import forumRoutes from './routes/forumRoutes.mjs';

// import morgan 3rd party middleware
import morgan from 'morgan';

/* IMPORTANT: Need this library in order to connection front-end (React) to back-end (here) */
import cors from 'cors';

// using Cloudinary cloud services to store images --- MongoDB & Mongoose technically does not store image directly -- need to reference or embed
import {v2 as cloudinary } from 'cloudinary';

/* setting up */
// unpack environmental variables from .env file here for later use
// Note: This should be before PORT (sequencing matters) otw PORT will direct to 3001
dotenv.config();    
// create an instance of Express
const app = express();
// declare PORT to either be from environmental variable or default to 3001 -- dynamically adapt to different environments (ports too)
let PORT = process.env.PORT || 3001;

/* configure Cloudinary for use */
cloudinary.config({
    cloud_name: 'derpkk9is',
    // accessing env variables Cloudinary's api_key & api_secret
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

(async function () {
    const results = await cloudinary.uploader.upload()
})

/* DB connection */
// invoke imported connectDB() function to connect to MongoDB
connectDB();
// Aside: This one-liner works as well but will NOT disclose whenever connection fails
// await mongoose.connect(process.env.mongoURI); 

/* middleware functions */
app.use(bodyParser.urlencoded({ extended: true }));     // parse out URL-encoded data from path URL to access data in req.body
app.use(bodyParser.json({ extended: true }));           // parse out JSON data to req.body

/* Morgan middleware built on top of Node.js (like Express), console.log() out HTTP requests onto terminal in the selected 
"tiny" format: : 1) HTTP Request Method, 2) Path URL, 3) Response's Content Length, 4) Response Time */
// Aside: Some people also use Winston alongside Morgan to logs into a file  -- placed before any custom error handlers
app.use(morgan('tiny'));

// connecting FE to BE
app.use(cors());

/* routes */
/* order routes in most specific to least specific */
app.use('/animations', animationRoutes);        // incorporate animationRoutes into server
app.use('/literary_works', literaryWorkRoutes); // literary_works endpoint for all literaryWorkRoutes
app.use('/forums', forumRoutes);                // set up forumRoutes to /forums endpoint

// include a catch all * route at the bottom -- sequencing matters (so it will NOT interfere with other path's ...)
app.get('/*', (req, res) => {
    res.send("You've done goof -- there ain't anything here 404 (client-side error)");
});

// app.get('/', (req, res) => {
//     // to see Express' req.params properties
//     // console.log(req.params.name);
//     // res.json(req.params.name);
//     res.send(`hello from the other side`);
//     // res.send(req.params); // returns an empty obj {}
// });


// Express' app.listen() method starts server & tells app to listen on PORT for any incoming traffic
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});