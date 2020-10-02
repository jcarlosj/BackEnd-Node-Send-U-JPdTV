const 
    express = require( 'express' ),
    router = express .Router(),
    authController = require( '../controllers/auth.controller' ),
    { check } = require( 'express-validator' );

router .get( '/', authController .authenticatedUser );

router .post( '/', authController .authenticateUser );

module .exports = router;