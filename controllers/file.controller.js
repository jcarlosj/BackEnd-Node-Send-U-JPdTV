const { request } = require('express');

const
    shortid = require( 'shortid' ),
    multer = require( 'multer' ),
    fs = require( 'fs' );

exports .upload = async ( request, response, next ) => {
    
    const 
        configMulter = {
            limits: { 
                fileSize: request .user ? 1048576 * 10 : 1048576        //  File size limit 1 MB, for registered users 10 MB 
            },                              
            storage: fileStorage = multer .diskStorage({
                destination: ( request, file, cb ) => {
                    cb( null,  __dirname + '/../uploads' );             //  File destination
                },
                filename: ( request, file, cb ) => {
                    const extension = file .originalname .substring(
                        file .originalname .lastIndexOf( '.' ),
                        file .originalname .length
                    );
                    cb( null, `${ shortid .generate() }${ extension }`);
                },
                fileFilter: ( request, file , cb ) => {
                    
                    if( file .mimetype === "application/bat" ) {        //  Verify that the file is not a bat file
                        return cb( null, true );                        //  Returns an error message
                    }

                }  
            })
        },
        upload = multer( configMulter ) .single( 'file' );              //  Upload a file with file name   


    upload( request, response, async( error ) => {
        console. log( `upload fileController`, request .file );

        if( ! error ) {
            response .json({ 
                file: request .file .filename
            });
        }
        else {
            console .log( '>>>', error );
            return next();
        }

    });


}

exports .delete = async ( request, response ) => {
    console. log( `delete fileController`, request .file );

    try {
        fs .unlinkSync( __dirname + `/../uploads/${ request .file }` );       //  Delete the file
        console .log( 'File Deleted!' );
    } 
    catch( error ) {
        console .log( 'delete', error );
    }
}