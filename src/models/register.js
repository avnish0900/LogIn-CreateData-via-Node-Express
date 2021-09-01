const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mySchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String, 
        required: true
    }
})

mySchema.pre("save", async function (next){
    if(this.isModified("password")){
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);
    }
    next();
})

const Register = new mongoose.model("Register", mySchema);
module.exports = Register;