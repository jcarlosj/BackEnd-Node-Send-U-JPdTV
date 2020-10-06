const 
    express = require( 'express' ),
    ConnectDB = require( './config/db' ),
    cors = require( 'cors' ),
    app = express(),
    port = process .env .PORT || 4000; 

/** Middlewares */
app .use( express .json() );    //  Enable JSON to send and receive data through the request body
app .use( cors() );             //  Enable CORS

ConnectDB();
console .log( `Starting NodeSend` );

// Routes
app .use( '/api/users', require( './routes/users' ) );
app .use( '/api/auth', require( './routes/auth' ) );
app .use( '/api/links', require( './routes/links' ) );
app .use( '/api/files', require( './routes/files' ) );

// Launch Server
app .listen( port, '0.0.0.0', () => {
    console .log( `Server running on the port ${ port }` );
});