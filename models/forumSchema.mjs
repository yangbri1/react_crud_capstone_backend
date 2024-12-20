import mongoose from 'mongoose';

const forumSchema = new mongoose.Schema({
    heading: {
        type: String,
        msg: 'Please give a heading',
        required: true,
        unique: true
    },
    urgency: {
        type: Number,
        msg: 'Rate the level of urgency from 1(not urgent) - 9000(earth-shatteringly so), received {VALUE}',
        min: 1,
        max: 9000,
        default: 1,
        required: true
    },
    message: {
        type: String,
        default: `You've come this far...describe your ailment!`,
        required: true
    },
    signed: {
        type: String,
        default: 'Beep Boop I A.M. a R.O.B.O.T',
        msg: "gimme your name"
    },
    human: {
        type: Boolean,
        default: false,
        msg: "Show me your true colors"
    }

});

// besides default indexing by unique "_id" on MongoDB, let's make a custom index by level of urgency (descending)
forumSchema.index({urgency: -1});

// include "urgencyHigh" static method to model -- each forum will be endowed with this feature
forumSchema.statics.urgencyHigh = function(){
    // look for dire straights, burning articles
    return mongoose.model("Forum").find({urgency: { $gte: 4500}});
}

// add "urgencyLow" static method to Mongoose model
forumSchema.statics.urgencyLow = function(){
    // this time look for low priority articles
    return mongoose.model("Forum").find({urgency: { $lt: 4500}});
}

// defining schema static method "humans" to Mongoose model
forumSchema.statics.humans = function(){
    // return all posts from verified, humane ones
    return mongoose.model("Forum").find({human: true });
}

// defining schema static method "robots" to Mongoose model
forumSchema.statics.robots = function(){
    // return all posts from unverified, Android botsss
    return mongoose.model("Forum").find({human: { $ne: true }});
}

// outside of this file, "forumSchema" is dubbed just as "Forum" for short w/ its listed static methods above (each forum will have)
export default mongoose.model("Forum", forumSchema);