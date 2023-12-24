const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        require:[true,"Email is required"],
    },
    password:{
        type:String,
        requied:[true,"Password is mandatory"],
    },
    salt: String
})

// Hashing of password before saving to database

UserSchema.pre("save",async function(next){
    const user = this

    if(!user.isModified("password")) return;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.salt = salt
    this.password = hashedPassword
    next()
})

module.exports = mongoose.model("RegisterUser",UserSchema)