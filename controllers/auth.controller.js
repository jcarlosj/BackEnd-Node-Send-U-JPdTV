exports .authenticateUser = async ( request, response, next ) => {
    console. log( `authenticateUser` );

    /** Check for errors */

    /** Search for a user and check if he is registered */
    console .log( 'request' , request .body );

    /** Verify the password and authenticate the user */

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