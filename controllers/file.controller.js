const { request } = require('express');

const
    shortid = require( 'shortid' ),
    multer = require( 'multer' ),
    fs = require( 'fs' ),
    Link = require( '../models/Link' );

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

exports .download = async ( request, response, next ) => {

    /**  */
    const 
        { file, } = request .params;                    //  Destructuring of parameters
        link = await Link .findOne({ name: file }),     //  Query to get download link
        { downloads, name } = link,                     //  Response Destructuring
        filePath = __dirname + '/../uploads/' + file;   //  File Path  
    
    console .log( 'Downloading ...' );
    response .download( filePath );                     //  Transfiere el archivo en la ruta como un "archivo adjunto". Agregando el Content-Disposition a la cabecera

    if( downloads === 1 ) {       //  Check if download is the last one allowed i.e. downloads = 1, delete the file.
        request .file = name;     //  Assign file name to request

        await Link .findOneAndRemove( link .id ); //  Delete the link record in the database

        next(); //  Exits the Current Controller and goes to the next action listed in the Router, in our case it executes the File Controller
    }
    else {      //  Verify that downloads are still allowed, subtract one from the number of downloads allowed
        link .downloads --; 
        await link .save();
    }
    
}