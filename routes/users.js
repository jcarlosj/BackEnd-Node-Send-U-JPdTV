const 
    express = require( 'express' ),
    router = express .Router(),
    userController = require( '../controllers/user.controller' ),
    { check } = require( 'express-validator' );
    
router .get( '/', () => {
    console .log( 'GET /api/users' );
});
router .post( 
    '/',                    //  Route
    [                       //  Define verification for each field
        check( 'name', 'The name is required' ) .not() .isEmpty(),
        check( 'email', 'Add a valid email' ) .isEmail(),
        check( 'password', 'The password must be at least 6 characters long' ) .isLength({ min: 6 })
    ],
    userController .new     // Run controller
);

module .exports = router;