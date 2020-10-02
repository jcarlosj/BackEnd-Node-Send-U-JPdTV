const jwt = require( 'jsonwebtoken' );

require( 'dotenv' ) .config({
    path: './variables.env'
});

module .exports = ( request, response, next ) => {
    console .log( 'Authentication middleware' );

    const authHeader = request .get( 'Authorization' );   // Get Token
    
    if( authHeader ) {      //  Verify that the authorization header exists to extract the data

        try {
            const 
                token = authHeader .split( ' ' )[ 1 ],
                user = jwt .verify( token, process .env .SECRET );
            
            // console .log( user );            
            request .user = user;       //  Assigns user obtained from token to request

        } 
        catch( error ) {
            console .error( error );

            response .status( 400 ) .json({
                msg: 'Invalid JSON Web Token'
            });
        }

    }

    return next();          // Next Middleware
}