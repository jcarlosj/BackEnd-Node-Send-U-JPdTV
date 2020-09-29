const { request } = require( 'express' );

const User = require( '../models/User' );

exports .new = async ( request, response ) => {
    
    const { email } = request .body;

    let user = await User .findOne({ email });  //  User query by email in the Database
    
    if( user ) {                                //  Check if the user is registered
        return response .status( 400 ) .json({
            msg: 'Registered user'
        });
    }

    user = await new User( request .body );
    user .save();                               //  Insert a new user to the Database

    response .json({
        msg: 'User created successfully!'
    });

}