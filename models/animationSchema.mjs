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
        default: 1917,      // Fun Fact: coined as start of anime
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
    // schema field "ratings" must be of non-negative "Number" type ranging from [1-10] 
    ratings: {
        type: Number,
        min: 1,
        max: 10,
        // Aside: {VALUE} in Mongoose will yield validated & failing value
        message: "Rating must be between [1 - 10], received {VALUE}" // setting custom validator error message using object syntax
    },
    // schema field "status" of type "String" in array of Strings is required
    status: {
        type: String,
        // enumeration showing possible airing status values
        enum: {
            values: ['TBD', 'ONGOING', 'COMPLETE'],
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
    },
    // schema field "original" of type "Boolean" shows whether or not an animation was derived from any source material
    original: {
        type: Boolean,
        default: false
    }
    // live adaptation field?
});

// schema indexing by "ratings" field in descending order (largest to smallest
animationSchema.index({ratings: -1});

// adding "score" static method to model -- every animation will have this feature available
animationSchema.statics.score = function(){
    // check if the animation has score (non-zero)
    return mongoose.model("Animation").find({ratings: { $gt: 0 }});
}

// defining schema static method of "original" to Mongoose model
animationSchema.statics.original = function(){
    // look for all animations not originated from any previous source materials
    return mongoose.model("Animation").find({ original: { $eq: true } }); 
}

// defining schema static method of "unoriginal" to Mongoose model
animationSchema.statics.unoriginal = function(){
    // look for all animations INDEED sourced from any materials
    return mongoose.model("Animation").find({ original: { $ne: true } }); 
}

// schema static method of "statusTBD" to Mongoose model
animationSchema.statics.statusTBD = function(){
    // look for all animations with a status of "TBD" using .find() method 
    return mongoose.model("Character").find({ status: "TBD" }); 
}

// schema static method of "statusOngoing" to Mongoose model
animationSchema.statics.statusOngoing = function(){
    // look for all animations with a status of "ONGOING" using .find() method 
    return mongoose.model("Character").find({ status: "ONGOING" }); 
}

// schema static method of "statusComplete" to Mongoose model
animationSchema.statics.statusComplete = function(){
    // look for all characters with a wanted "DEAD" status presented using .find() method 
    return mongoose.model("Animation").find({ status: { $eq: "COMPLETE" } }); // different syntax but same as above (rarely use $eq operator)
}

// calling mongoose.model() function makes a copy on "animationSchema" & Mongoose compiles it
// export Mongoose model of key-value pair such that "Animation" refers to "animationSchema" 
// Note: Elsewhere calling on "Animation" allows access to its fields with properties
export default mongoose.model("Animation", characterSchema);