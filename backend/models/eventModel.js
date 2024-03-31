const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    venue:{
        type: String,
        required: true
    },
    entryfees:{
        type: String,
        required: true
    },
    poster:{
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }],
    registered:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    },
    posts: [
        {
            type: String
        }
    ]
}, { timestamps: true })


// Method to check if a user has liked the blog
eventSchema.methods.hasLiked = function(userId) {
    return this.likes.some(like => like.equals(userId));
};

// Method to add a like
eventSchema.methods.addLike = function(userId) {
    if (!this.hasLiked(userId)) {
        this.likes.push(userId);
        return this.save();
    }
};

// Method to remove a like
eventSchema.methods.removeLike = function(userId) {
    if (this.hasLiked(userId)) {
        this.likes = this.likes.filter(like => !like.equals(userId));
        return this.save();
    }
};



// Method to check if a user has registered to the blog
eventSchema.methods.isRegistered = function(userId) {
    return this.registered.some(reg => reg.equals(userId));
};

// Method to add a like
eventSchema.methods.register = function(userId) {
    if (!this.isRegistered(userId)) {
        this.registered.push(userId);
        return this.save();
    }
};

// Method to remove a like
eventSchema.methods.cancelReg = function(userId) {
    if (this.isRegistered(userId)) {
        this.registered = this.registered.filter(like => !like.equals(userId));
        return this.save();
    }
};

module.exports = mongoose.model('Event', eventSchema)