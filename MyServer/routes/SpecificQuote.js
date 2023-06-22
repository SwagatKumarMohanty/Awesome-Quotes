

const express=require('express');
const { request } = require('http');
const apptoDisplaySpecificQuotes=express.Router();
const mysql=require('mysql');
const connection=mysql.createConnection(
   {
    host:'localhost',
    database:'aws_quotes',
    password:'manager',
    user:'root'
   }
);


apptoDisplaySpecificQuotes.get("/:QuoteID",(request,response)=>{

    var query=`select * from quotes where id=${request.params.QuoteID}`;
    connection.query(query,(error,result)=>{

        if(error==null)
        {
                // var temp=new Array();
                // temp=JSON.parse(data);
            var data=JSON.stringify(result);
            console.log(data);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else
        {
            var data=JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        response.end();
    });
});

module.exports=apptoDisplaySpecificQuotes;

