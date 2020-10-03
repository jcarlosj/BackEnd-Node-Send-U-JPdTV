const  
    Link = require( '../models/Link' ),
    shortid = require( 'shortid' );

exports .new = async ( request, response, next ) => {

    /** Check for errors */

    const 
        { original_name, password } = request .body,
        link = new Link();
    
    /** Create object with link data */
    link .url = shortid .generate();
    link .name = shortid .generate();
    link .original_name = original_name;
    link .password = password;

    /** Check if the user is authenticated */

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