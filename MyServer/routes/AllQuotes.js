
const express=require('express');
const { request } = require('http');
const apptoDisplayAllQuotes=express.Router();
const mysql=require('mysql');
const connection=mysql.createConnection(
   {
    host:'localhost',
    database:'aws_quotes',
    password:'manager',
    user:'root'
   }
);

apptoDisplayAllQuotes.get("/",(request,response)=>{

    var query=`select * from quotes`;
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
    });
});

apptoDisplayAllQuotes.put("/:QuoteID",(request,response)=>{

    var query=`update quotes set author='${request.body.author}', text='${request.body.text}' where id=${request.params.QuoteID}`;

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
});

apptoDisplayAllQuotes.post("/",(request,response)=>{

    var query=`insert into quotes(text,author,user_id) values('${request.body.text}','${request.body.author}',${request.body.user_id})`;
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
    });
});

apptoDisplayAllQuotes.delete("/:quoteid",(request,response)=>{

    var query=`delete from quotes where id=${request.params.quoteid}`;
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

module.exports=apptoDisplayAllQuotes;



