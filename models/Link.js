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
            type: Number,
            default: 1
        },
        author: {
            type: mongoose .Schema .Types .ObjectId,
            ref: 'Users',
            default: null
        },
        password: {
            type: String,
            required: false,
            trim: true,
            default: null
        },
        created: {
            type: Date,
            default: Date .now()
        }
    });

module .exports = mongoose .model( 'Links', linkSchema );