const { request } = require("express");

const User = require( '../models/User' );

exports .new = async ( request, response ) => {
    // console .log( 'Controller: New User', request .body );

    const user = await new User( request .body );
    user .save();

    response .json({
        msg: 'User created successfully!'
    });

}