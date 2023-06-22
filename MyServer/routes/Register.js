
const express=require('express');
const { request } = require('http');
const apptoRegister=express.Router();
const mysql=require('mysql');
const connection=mysql.createConnection(
   {
    host:'localhost',
    database:'content_mgmt',
    password:'manager',
    user:'root'
   }
);

apptoRegister.post("/",(request,response)=>{

    var str=`${request.body.first_name}`+`${request.body.last_name}`;
    console.log(str);
    var query=`select * from( select * from(select concat(first_name,last_name)username from users_tbl) mytable)bro where username='${str}'`;

    connection.query(query,(error,result)=>
    {
        if(error==null)
        {
            //   var data=JSON.stringify(result);
            //   console.log(data);
            var a=JSON.stringify(result);
            if(a=="[]")
            {
                response.setHeader("Content-Type","application/json");
                var data={"isvalid":"true"};
                response.write(JSON.stringify(data));

            }
            else
            {
                response.setHeader("Content-Type","application/json");
                var data={"isvalid":"falseInner"};
                response.write(JSON.stringify(data));

            }

        }
        else
        {
            response.setHeader("Content-Type","application/json");
            var data={"isvalid":"falseOuter"};
            response.write(JSON.stringify(data));

        }
        response.end();
    });
    
});

// apptoRegister.get("/",(request,response)=>
// {
                
//     var query=`insert into users_tbl(first_name,last_name,email,password) values('${request.body.first_name}','${request.body.last_name}','${request.body.email}','${request.body.password}')`;
//      connection.query(query,(error,result)=>
//      {
//         if(error==null)
//         {
//             console.log("Passed");
//         }
//         else
//         {
//             console.log("Failed");

//         }
//         response.end();
//      })
// });

module.exports=apptoRegister;