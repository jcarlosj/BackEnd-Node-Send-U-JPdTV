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
        { original_name, name } = request .body,
        link = new Link();
    
    /** Create object with link data */
    link .url = shortid .generate();
    link .name = name;
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
            url: link .url
        });

        next();
    } 
    catch( error ) {
        console .error( error );
    }
    
}

exports .getLink = async ( request, response, next ) => {
    const link = await Link .findOne({ url: request .params .url });    //  Check if the link is registered in the database

    // console .log( 'Link', link );

    if( ! link ) {      //  Verify that the link exists
        response .status( 404 ) .json({
            msg: 'Link does not exist'
        });
        return next();
    }

    response .status( 200 ) .json({
        link
    });

    next();     //  Next Middleware
}

exports .getAllLinks = async ( request, response ) => {
    try {
        const links = await Link .find({}) .select( 'url -_id' );
        
        response .json({ links });
    } 
    catch( error ) {
        console .error( error );
    }
}