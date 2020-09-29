const 
    mongoose = require( 'mongoose' ),
    userSchema = mongoose .Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    });

module .exports = mongoose .model( 'Users', userSchema );