const express=require('express');
const { request } = require('http');
const apptoeditProfile=express.Router();
const mysql=require('mysql');
const connection=mysql.createConnection(
   {
    host:'localhost',
    database:'aws_quotes',
    password:'manager',
    user:'root'
   }
);

apptoeditProfile.get("/:userid",(request,response)=>{
    var query=`select * from users where id=${request.params.userid}`;
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

apptoeditProfile.put("/:userid",(request,response)=>{
    var query=`update users set first_name='${request.body.first_name}',last_name='${request.body.last_name}',email='${request.body.email}',mobile='${request.body.mobile}' where id=${request.params.userid}`;
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


module.exports=apptoeditProfile;