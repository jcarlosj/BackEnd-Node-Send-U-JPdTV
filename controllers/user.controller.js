const 
    { request } = require( 'express' ),
    User = require( '../models/User' ),
    bcrypt = require( 'bcrypt' ),
    { validationResult } = require( 'express-validator' );

exports .new = async ( request, response ) => {

    const errors = validationResult( request );
    
    if( ! errors .isEmpty() ) {         //  Check for field validation error messages
        return response .status( 400 ) .json({
            errors: errors .array()
        });
    }
    
    const 
        { email, password } = request .body,
        salt = await bcrypt .genSalt( 10 );

    let user = await User .findOne({ email });  //  User query by email in the Database
    
    if( user ) {                                //  Check if the user is registered
        return response .status( 400 ) .json({
            msg: 'Registered user'
        });
    }

    user = new User( request .body );
    user .password = await bcrypt .hash( password, salt );      //  Convert password to hash

    try {
        user .save();                            //  Insert a new user to the Database

        response .json({
            msg: 'User created successfully!'
        });
    }
    catch( error ) {
        console .error( error );
    }
    

}