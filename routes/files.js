const 
    express = require( 'express' ),
    router = express .Router(),
    fileController = require( '../controllers/file.controller' ),
    auth = require( '../middlewares/auth' );

router .post( 
    '/', 
    fileController .upload 
);

router .delete( '/:id', fileController .delete );

module .exports = router;