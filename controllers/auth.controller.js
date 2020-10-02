const 
    User = require( '../models/User' ),
    bcrypt = require( 'bcrypt' ),
    jwt = require( 'jsonwebtoken' );

require( 'dotenv' ) .config({
    path: './variables.env'
});

exports .authenticateUser = async ( request, response, next ) => {
    console. log( `authenticateUser` );

    /** Check for errors */

    /** Search for a user and check if he is registered */
    const 
        { email, password } = request .body,
        user = await User .findOne({ email });      //  User query by email in the Database

        if( ! user ) {                                //  Check if the user is not registered
            response .status( 401 ) .json({
                msg: 'Username does not exist'
            });
            return next();
        }

    /** Verify the password and authenticate the user */
    if( bcrypt .compareSync( password, user .password ) ) {
        /** Create JWT */
        const token = jwt .sign({   
                id: user ._id,
                name: user .name,
                email: user .email
            }, process .env .SECRET , {
                expiresIn: '5h'
            });

        response .json({ token });

    }
    else {
        response .status( 401 ) .json({
            msg: 'Password is incorrect'
        });
        return next();
    }

    response .status( 200 ) .json({
        msg: 'authenticateUser'
    });
}

exports .authenticatedUser = async ( request, response ) => {
    console. log( `authenticatedUser` );
    response .json({
        msg: 'authenticatedUser'
    });
}