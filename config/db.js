const mongoose = require( 'mongoose' );

require( 'dotenv' ) .config({
    path: 'variables.env'
});

/** Connect Database */
const ConnectDatabase = async() => {
    
    try {
        await mongoose .connect( 
            process .env .DB_URL, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            }
        ); 
        console .log( 'Successful Database Connection' );  
    } 
    catch( error ) {
        handleError( error );
    }
        
    await mongoose .connection .on( 'error', ( error ) => {
        console .log( error );
    });

}

module .exports = ConnectDatabase;