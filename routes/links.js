const 
    express = require( 'express' ),
    router = express .Router(),
    linkController = require( '../controllers/link.controller' ),
    { check } = require( 'express-validator' ),
    auth = require( '../middlewares/auth' );

router .get( 
    '/:url', 
    linkController .hasPassword,
    linkController .getLink
);

router .get(
    '/', 
    linkController .getAllLinks
);

router .post( 
    '/',        //  Route
    [           //  Define verification for each field
        check( 'name', 'Upload a file' ) .not() .isEmpty(),
        check( 'original_name', 'Upload a file' ) .not() .isEmpty()
    ],
    auth,       // Authentication middleware 
    linkController .new     // Run controller
);

module .exports = router;