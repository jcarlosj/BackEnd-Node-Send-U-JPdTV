const 
    express = require( 'express' ),
    router = express .Router(),
    linkController = require( '../controllers/link.controller' ),
    { check } = require( 'express-validator' ),
    auth = require( '../middlewares/auth' );

router .post( 
    '/', 
    auth,       // Authentication middleware 
    linkController .new 
);

module .exports = router;