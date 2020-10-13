const 
    express = require( 'express' ),
    router = express .Router(),
    fileController = require( '../controllers/file.controller' ),
    auth = require( '../middlewares/auth' );

router .post( 
    '/', 
    auth,
    fileController .upload 
);

router .get(
    '/:file',
    fileController .download
);

router .delete( '/:id', fileController .delete );
module .exports = router;