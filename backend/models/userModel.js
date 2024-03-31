const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    userProfile:{
        type: String
    },
    userPoster: {
        type: String
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default: ""
    },
    location:{
        type: String,
        default: ""
    },
    registered:{
        type: Number,
        default: 0
    }
})

//static signup method
userSchema.statics.signup = async function(username, email, password, userType, secretKey,){

    //validation
    if(!username || !email || !password || !userType )
    {
        throw Error('All fields must be filled!!')
    }
    
    //email validation
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    //password validation
    if(!validator.isStrongPassword(password))
    {
        throw Error('Password is not strong enough')
    }

    //check if email already exists
    const exists = await this.findOne({email})  
    if(exists){
        throw Error('Email already in use')
    }

    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        username: username,
        email: email,
        password: hash,
        userType: userType,
        secretKey: secretKey
    })

    return user

}



//static login method
userSchema.statics.loginUser = async function(email, password){
    //validation
    if(!email || !password)
    {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user)
    {
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match)
    {
        throw Error("Incorrect password")
    }

    return user
}

//static login method
userSchema.statics.loginCollege = async function(email, password, secretKey){
    //validation
    if(!email || !password || !secretKey)
    {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email, secretKey})

    if(!user)
    {
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match)
    {
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)