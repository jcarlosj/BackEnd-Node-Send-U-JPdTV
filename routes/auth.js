const 
    express = require( 'express' ),
    router = express .Router(),
    authController = require( '../controllers/auth.controller' ),
    { check } = require( 'express-validator' );

router .get( '/', authController .authenticatedUser );

router .post(     
    '/', 
    [
        check( 'email', 'Add a valid email' ) .isEmail(),
        check( 'password', 'The password is required' ) .not() .isEmpty()
    ], 
    authController .authenticateUser  
);

module .exports = router;