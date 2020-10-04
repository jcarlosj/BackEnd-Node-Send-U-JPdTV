const
    shortid = require( 'shortid' ),
    multer = require( 'multer' ),
    configMulter = {
        limits: { fileSize: 1048576 },                              //  File size limit 1MB
        storage: fileStorage = multer .diskStorage({
            destination: ( request, file, cb ) => {
                cb( null,  __dirname + '/../uploads' );             //  File destination
            },
            filename: ( request, file, cb ) => {
                const extension = file .mimetype .split( '/' )[ 1 ];
                cb( null, `${ shortid .generate() }.${ extension }`);
            },
            fileFilter: ( request, file , cb ) => {
                
                if( file .mimetype === "application/bat" ) {        //  Verify that the file is not a bat file
                    return cb( null, true );                        //  Returns an error message
                }

            }  
        })
    },
    upload = multer( configMulter ) .single( 'file' );              //  Upload a file with file name   

exports .upload = async ( request, response, next ) => {
    
    upload( request, response, async( error ) => {
        console. log( `upload fileController`, request .file );

        if( ! error ) {
            response .json({ 
                file: request .file .filename
            });
        }
        else {
            console .log( error );
            return next();
        }

    });


}

exports .delete = async ( request, response ) => {
    console. log( `delete fileController` );
}