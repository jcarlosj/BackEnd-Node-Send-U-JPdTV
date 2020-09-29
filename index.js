const 
    express = require( 'express' ),
    ConnectDB = require( './config/db' ),
    app = express(),
    port = process .env .PORT || 4000; 

ConnectDB();
console .log( `Starting NodeSend` );

// Routes
app .use( '/api/users', require( './routes/users' ) );

// Launch Server
app .listen( port, '0.0.0.0', () => {
    console .log( `Server running on the port ${ port }` );
});