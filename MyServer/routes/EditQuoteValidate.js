const express=require('express');
const { request } = require('http');
const apptoeditvalidate=express.Router();
const mysql=require('mysql');
const connection=mysql.createConnection(
   {
    host:'localhost',
    database:'aws_quotes',
    password:'manager',
    user:'root'
   }
);

apptoeditvalidate.get("/:quoteid",(request,response)=>{

    var query=`select user_id from quotes where id=${request.params.quoteid}`;
    connection.query(query,(error,result)=>{

        if(error==null)
        {

            var temp=new Array();
            var data=JSON.stringify(result);
              temp=JSON.parse(data);
              var t={"validate":temp[0].user_id};
              console.log(t);
            response.setHeader("Content-Type","application/json");
            response.write(JSON.stringify(t));

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

apptoeditvalidate.delete("/:quoteid",(request,response)=>{

    var query=`delete from quotes where id=${request.params.quoteid}`;
    connection.query(query,(error,result)=>{

        if(error==null)
        {

            //var temp=new Array();
            var data=JSON.stringify(result);
              //temp=JSON.parse(data);
              //var t={"validate":temp[0].user_id};
              //console.log(t);
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




module.exports=apptoeditvalidate;
