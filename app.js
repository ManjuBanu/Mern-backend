const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-route'); //middleware
const userRoutes = require('./routes/users-route');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json())

app.use('/api/places',placesRoutes); //it will pass exact path
app.use('/api/users', userRoutes);

app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route.', 404)
    throw error;
});

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500); //500 something went wrong in server
    res.json({message: error.message || 'An unknown error occured!'});
})

mongoose
.connect('mongodb+srv://manju:r0P8OcEsYKOrAe2H@cluster0.865to.mongodb.net/places?retryWrites=true&w=majority')
.then(()=>{
    app.listen(5000);
})
.catch(err =>{
    console.log(err);
});
 