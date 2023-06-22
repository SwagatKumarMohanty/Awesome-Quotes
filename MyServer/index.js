//Building My Server for Content Management System.

const express=require('express');
const registerRelatedRoutes=require('./routes/Register');
const insertRegisterRoutes=require('./routes/Insert');
const loginRelatedRoutes=require('./routes/Login');
const displayAllQuotesRoutes=require('./routes/AllQuotes');
const displaySpecificQuotes=require('./routes/SpecificQuote');
const editCodeValidate=require('./routes/EditQuoteValidate');
const addToFavouriteQuote=require('./routes/FavouriteQuote');
const editProfileRoute=require('./routes/EditProfile');



const app=express();



app.use((request,response,next)=>
{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods', "*");
    next();
});




app.use(express.json());

app.use('/Register',registerRelatedRoutes);
app.use('/Insert',insertRegisterRoutes);
app.use('/Login',loginRelatedRoutes);
app.use('/AllQuotes',displayAllQuotesRoutes);
app.use('/SpecificQuote',displaySpecificQuotes);
app.use('/EditQuoteValidate',editCodeValidate);
app.use('/FavouriteQuote',addToFavouriteQuote);
app.use('/EditProfile',editProfileRoute);





app.listen(9696,()=>{console.log("You are connected to Server 9696")});