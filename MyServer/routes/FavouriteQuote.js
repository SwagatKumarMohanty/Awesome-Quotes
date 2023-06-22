const express=require('express');
const { request } = require('http');
const apptoaddFavouriteQuote=express.Router();
const mysql=require('mysql');
const connection=mysql.createConnection(
   {
    host:'localhost',
    database:'aws_quotes',
    password:'manager',
    user:'root'
   }
);

apptoaddFavouriteQuote.get("/",(request,response)=>{
    var query=`select * from quotes left outer join (select quote_id,count(quote_id) total from favourite_quotes group by quote_id) mine on id=quote_id order by total desc`;
    connection.query(query,(error,result)=>{
        if(error==null)
        {
                var data=JSON.stringify(result);
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
    })
})



apptoaddFavouriteQuote.post("/",(request,response)=>{
    var query=`insert into favourite_quotes values(${request.body.user_id},${request.body.quote_id})`;

    connection.query(query,(error,result)=>{

        if(error==null)
        {
                // var temp=new Array();
                // temp=JSON.parse(data);
            
            var data=JSON.stringify(result);
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

    })

})

apptoaddFavouriteQuote.post("/:idref",(request,response)=>{
    var query=`select id,text,author from quotes where id in (select quote_id from favourite_quotes where user_id=${request.params.idref})`;

    connection.query(query,(error,result)=>{

        if(error==null)
        {
                // var temp=new Array();
                // temp=JSON.parse(data);
            
            var data=JSON.stringify(result);
            //console.log(data);
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

    })

})

apptoaddFavouriteQuote.delete("/:quoteid",(request,response)=>{
    var query=`delete from favourite_quotes where quote_id=${request.params.quoteid}`;

    connection.query(query,(error,result)=>{

        if(error==null)
        {
                // var temp=new Array();
                // temp=JSON.parse(data);
            
            var data=JSON.stringify(result);
            //console.log(data);
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

    })

})







module.exports=apptoaddFavouriteQuote;

