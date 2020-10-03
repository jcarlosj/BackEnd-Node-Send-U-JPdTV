const  
    Link = require( '../models/Link' ),
    bcrypt = require( 'bcrypt' ),
    shortid = require( 'shortid' ),
    { validationResult } = require( 'express-validator' );

exports .new = async ( request, response, next ) => {

    /** Check for errors */
    const errors = validationResult( request );
    
    if( ! errors .isEmpty() ) {         //  Check for field validation error messages
        return response .status( 400 ) .json({
            errors: errors .array()
        });
    }

    const 
        { original_name } = request .body,
        link = new Link();
    
    /** Create object with link data */
    link .url = shortid .generate();
    link .name = shortid .generate();
    link .original_name = original_name;

    /** Check if the user is authenticated */
    if( request .user ) {
        const 
            { password, downloads } = request .body,
            user = request .user;

        if( downloads ) {            //  If the value has been passed, assign number of downloads
            link .downloads = downloads;
        }
        if( password ) {            //  If the value has been passed, assign password
            const salt = await bcrypt .genSalt( 10 );
            link .password = await bcrypt .hash( password, salt );
        }
        
        link .author = user .id;    //  Assign author

    }

    try {
        /** Store link in Database */
        await link .save();

        return response .json({
            msg: link .url
        });

        next();
    } 
    catch( error ) {
        console .error( error );
    }
    
}