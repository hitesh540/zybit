const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv/config');







app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('public'));
app.use(upload.single('file'));


const userRouter = require('./routes/User');
app.use('/user',userRouter);



app.use(bodyParser.json());
app.use(morgan('tiny'));


// mongoose.connect( process.env.CONNECTION_STRING,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// },
// ()=>{
//     console.log('successfully connected to database');
// });



//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    console.log('Database connection is ready..');
})
.catch((err) => {
    console.log(err);
})


//Server
app.listen(5001,()=>{
    console.log('express server started');
});