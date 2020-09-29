const 
    express = require( 'express' ),
    router = express .Router();

router .get( '/', () => {
    console .log( 'GET /api/users' );
});

module .exports = router;