
const express=require('express');
const { request } = require('http');
const apptoLogin=express.Router();
const mysql=require('mysql');
const connection=mysql.createConnection(
   {
    host:'localhost',
    database:'aws_quotes',
    password:'manager',
    user:'root'
   }
);

apptoLogin.post("/",(request,response)=>
{
    var query=`select * from users where email= binary '${request.body.username}' and password= binary '${request.body.password}'`;

    connection.query(query,(error,result)=>{
         if(error==null)
         {
               var data=JSON.stringify(result);
               if(data!="[]")
               {
                
                var temp=new Array();
                temp=JSON.parse(data);
                //console.log(temp[0].user_id);
                var t={"isvalid":temp[0].id};
                 //var topicname=sessionStorage.getItem("topicName");
                //sessionStorage.setItem("id",temp[0].user_id);
                response.setHeader("Content-Type","appication/json");
                response.write(JSON.stringify(t));
    
               }
               else
               {
                var t={"isvalid":"false"};
                response.setHeader("Content-Type","appication/json");
                response.write(JSON.stringify(t));
                 
               }
               
         }  
         else
         {
            var t={"isvalid":"false"};
            response.setHeader("Content-Type","appication/json");
            response.write(JSON.stringify(t));
         }   
         response.end();
    });

})
module.exports=apptoLogin;