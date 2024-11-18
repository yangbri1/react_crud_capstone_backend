// import Mongoose to use built-in mogoose methods in creating animation schema
import mongoose from 'mongoose';

// crating a Mongoose schema for anime overview
const animationSchema = new mongoose.Schema({
    // defining schema fields with their respective properties
    title: {
        type: String,
        required: [true, 'Please give a title'],    // configuring custom error message using array syntax
        /* Note: MongoDB by default would create an unique ndex on "_id" field during collection creation
         "name" field is now an unique index alongside "_id" (Could be seen on MongoDB Compass) */
        unique: true     // setting "unique" property to true means there will be no duplicate names
    },
    // schema field "year" of schema type "Number", default to 1989 & required
    year: {
        type: Number,
        default: 1989,
        required: false     // test it out w/ "default"
    },
    // schema field "format" of "String" type, 
    format: {
        type: String,
        // enumeration property showing possible media formats
        enum: {
            values: ['TV', 'OVA', 'Movie', 'Special', 'ONA', 'Music', 'CM', 'PV', 'TV Special'],
            // Mongoose implicitly replaces {VALUE} with value of validated
            message: `{VALUE} is unsupported`
        }
    },
    // schema field "rating" must be of non-negative "Number" type ranging from [0-10] 
    rating: {
        type: Number,
        min: 0,
        max: 10,
        // Aside: {VALUE} in Mongoose will yield validated & failing value
        message: "Rating must be between [0 - 10], received {VALUE}" // setting custom validator error message using object syntax
    },
    // schema field "status" of type "String" in array of Strings is required
    status: {
        type: String,
        // enumeration showing possible airing status values
        enum: {
            values: ['TBD', 'ONGOING', 'FINISHED'],
            message: `{VALUE} is unsupported`
        },
        uppercase: true // schemaType option converting airing 'status' to uppercase before saving
    },
    // schema field "genre" of type "String" in array of Strings is required
    genre: {
        type: String,
        enum: {
            values: ['ACTION', 'ADVENTURE', 'AVANTE-GARDE', 'AWARD WINNING', 'BOYS LOVE', 'COMEDY', 'DRAMA', 'FANTASY', 'GIRLS LOVE',
                 'GOURMET', 'HORROR', 'MYSTERY', 'ROMANCE', 'SCI-FI', 'SLICE OF LIFE', 'SPORTS', 'SUPERNATURAL', 'SUSPENSE'],
            message: `{VALUE} is unsupported`
        },
        uppercase: true
    },
    // schema field "plot" of type "String" with a "required" innate property
    plot: {
        type: String,
        required: [true, 'Please give a brief description of the piece']
    }

});