const 
    express = require( 'express' ),
    router = express .Router(),
    fileController = require( '../controllers/file.controller' ),
    auth = require( '../middlewares/auth' ),
    multer = require( 'multer' ),
    upload = multer({
        dest: './uploads'
    });

router .post( 
    '/', 
    upload .single( 'file' ),
    fileController .upload 
);

router .delete( '/:id', fileController .delete );

module .exports = router;