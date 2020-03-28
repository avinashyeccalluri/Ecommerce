    
    // it is written to use the env file in this file
    require('dotenv').config();

    //importing the required npm files
    const mongoose = require('mongoose');
    const express = require('express')

    //body parser is used to parse the http methods and read the requests
    const bodyParser =  require('body-parser')

    //used to place the datas into the cookie 
    const cookieParser = require('cookie-parser')

    //used to connect the data with backend and front end
    const cors = require('cors')

    // this is defined because the HTML methods will be sent using this app method
    const app =express();

    //importing the routes for the authentication files
    const authRoutes = require('./routes/auth.js')


    // My DB connection
    mongoose.connect(process.env.DATABASE,
 
    {
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex:true
    }).then(()=>{
        console.log('Database is connected');
        
    }).catch(
        console.log("Database connection is not established")
        
    )

    //My Middlewares
    //For using the middleware in the file we should use app.use()
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    app.use(express.json());

    //--------------------------------------------My Routes---------------------------------------------------------------------

    //trying routes
    app.get('/avinash',(req,res)=>{
        res.send('hello i am working')
    })

    app.use('/api',authRoutes)

    //Port Connections
    // process.env should be used by default to access the files in the .env file 
    const port= process.env.PORT || 8000;


    //Starting the server    
    // app.listen should be used to start  the server
    app.listen(port,()=>{
        console.log(`App is running at ${port}`);
        
    })