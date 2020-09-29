const 
    express = require( 'express' ),
    router = express .Router(),
    userController = require( '../controllers/user.controller' );

router .get( '/', () => {
    console .log( 'GET /api/users' );
});
router .post( '/', userController .new );

module .exports = router;