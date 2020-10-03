const 
    mongoose = require( 'mongoose' ),
    linkSchema = mongoose .Schema({
        url: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        original_name: {
            type: String,
            required: true,
            trim: true
        },
        downloads: {
            type: Number
        },
        author: {
            type: mongoose .Schema .Types .ObjectId,
            ref: 'Users',
            default: null
        },
        password: {
            type: String,
            required: false,
            trim: true
        },
        created: {
            type: Date,
            default: Date .now()
        }
    });

linkle .exports = mongoose .model( 'Links', userSchema );