// import necessary modules/libarares for functioning server-side MongoDB database 
import express from 'express';
import dotenv from 'dotenv';
// body-parser middleware module to parse data from incoming HTTP request bodies
import bodyParser from 'body-parser';
// bring in connectDB functon module to esetablish connection to MongoDB
import connectDB from './db/conn.mjs';

// later will also bring routes to the brain "server.mjs" to be run 


/* setting up */
// unpack environmental variables from .env file here for later use
// Note: This should be before PORT (sequencing matters) otw PORT will direct to 3001
dotenv.config();    
// create an instance of Express
const app = express();
// declare PORT to either be from environmental variable or default to 3001 -- dynamically adapt to different environments (ports too)
let PORT = process.env.PORT || 3001;

/* DB connection */
// invoke imported connectDB() function to connect to MongoDB
connectDB();
// Aside: This one-liner works as well but will NOT disclose whenever connection fails
// await mongoose.connect(process.env.mongoURI); 

/* middleware functions */
app.use(bodyParser.urlencoded({ extended: true }));     // parse out URL-encoded data from path URL to access data in req.body
app.use(bodyParser.json({ extended: true }));           // parse out JSON data to req.body

/* routes */




// Express' app.listen() method starts server & tells app to listen on PORT for any incoming traffic
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});