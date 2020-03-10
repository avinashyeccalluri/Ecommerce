const express= require("express");
const app=express();

const port = 8000;

app.get('/',(req,res)=>{
    return res.send('this is avinash testing the node trial 1');
});

app.listen(port);


// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))