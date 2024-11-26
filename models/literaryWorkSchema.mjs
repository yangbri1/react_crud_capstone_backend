// import Mongoose library for creating schema
import mongoose from 'mongoose';

// generate a paper schema
const literaryWorkSchema = new mongoose.Schema({
    // schema fields
    title: {
        // schema property types
        type: String,
        required: true,
        unique: true        // unique property added so no duplicate titles 
    },
    // field "type" is required and has properties of ...
    type: {
        // array of string to choose from, if input property is invalid -- message would be prompted, defaults to "undefined" & convert to lowercase before output
        type: String,
        // Aside: Since we employed Mongoose's schema type String property 'uppercase', the enclosed array of strings in 'enum' must be all lowercase
        enum: ["manga", "one-shot", "doujinshi", "light novel", "novel", "manhwa", "manhua"],
        message: `{VALUE} is not a valid type of literary works ...`,
        default: "undefined", // no need for 'default' property when 'required: true' -- field needed
        lowercase: true,
        required: true
    },
    ratings: {
        type: Number,
        min: 1,
        max: 10,
        // Aside: {VALUE} in Mongoose will yield validated & failing value
        message: "Rating must be between [1 - 10], received {VALUE}"
    },
    // schema field "status" of type "String" in array of Strings is required
    status: {
        type: String,
        // enumeration showing possible publishing releases status values
        enum: {
            values: ['TBD', 'ONGOING', 'COMPLETED', 'ON HIATUS', 'DISCONTINUED'],
            message: `{VALUE} is unsupported`
        },
        default: 'tbd',
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
    // schema field "synopsis" of type "String" with a "required" innate property
    synopsis: {
        type: String,
        required: [true, 'Please give a brief description of the piece']
    },
    // themes: {
    //     // type of array of Strings (multiple themes may be presented)
    //     // type: [String]  // come back later -- Array of Strings DN seem to be working
    //     type: [String]
    // },
    // schema field "serialized" showing if the piece is picked up by a publisher (under guise of editors)
    serialized: {
        type: Boolean,
        default: false
    }
});

// index literary works schema by "title" in ascending order
literaryWorkSchema.index({title: 1});

// static method for finding "manga" type literary work to model
literaryWorkSchema.statics.typeManga = function(){
    // return the "manga" property in the schema field "type" (not property "type" within each field)
    return mongoose.model("Literary_Work").find({ type: "manga" });
}

// static method for finding "manhwa" type literary work to model
literaryWorkSchema.statics.typeManhwa = function(){
    // return the "manhwa" property in the schema field "type" (not property "type" within each field)
    return mongoose.model("Literary_Work").find({ type: "manhwa" });
}

// static method for finding "manhua" type literary work to model
literaryWorkSchema.statics.typeManhua = function(){
    // return the "manhua" property in the schema field "type" (not property "type" within each field)
    return mongoose.model("Literary_Work").find({ type: "manhua" });
}

// defining schema static method of "statusAll" to Mongoose model
literaryWorkSchema.statics.statusAll = function(){
    // look for all literary works with a viable status presented using .find() method with $ne operator to make sure "status" field is null (no String)
    // return mongoose.model("Literary_Work").find({ status: { $ne: null } }); // "" as value still shows all statuses
    return mongoose.model("Literary_Work").find({ status: { $ne: "TBD" } });    // find all literary works with a defined status
}

// defining schema static method of "serializedYes" to Mongoose model
literaryWorkSchema.statics.serializedYes = function(){
    // look for all literary works that are serialized using .find() method 
    return mongoose.model("Literary_Work").find({ serialized: { $eq: true }}); 
}

// defining schema static method of "serializedNo" to Mongoose model
literaryWorkSchema.statics.serializedNo = function(){
    // look for all literary works that are NOT serialized 
    return mongoose.model("Literary_Work").find({ serialized: { $ne: true } });     // negating the negated works?
}

// use mongoose.model() method in Mongoose module to generate a collection of a MongoDB database
// compile literary work schema into the model for later use and export to "literaryWorkRoutes.mjs"
// hereafter the "literayWorkSchema" is known by "Literary_Work"
export default mongoose.model("Literary_Work", literaryWorkSchema);