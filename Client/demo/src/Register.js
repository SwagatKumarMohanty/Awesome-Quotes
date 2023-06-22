import { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Register()
{
    const [registerData,setRegisterdata]=useState({first_name:"",last_name:"",email:"",password:"",mobile:""});
    const [message,setMessage]=useState("");
    const history=useHistory();

    useEffect(()=>
    {
        

        setTimeout(()=>{
            setMessage("");
            
        },3000)

    },[message]);
    
    
    const OnTextChange=(args)=>
    {
        var copyOfCredentials={...registerData};
        copyOfCredentials[args.target.name]=args.target.value;
        setRegisterdata(copyOfCredentials);
    }

    const Register=()=>
    {
        var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responeReceived=JSON.parse(helper.responseText);
                if(responeReceived.isvalid=='true')
                {
                    
                    // setRegisterdata({first_name:"",last_name:"",email:"",password:""});
                    insert();
                   
                }
                else
                {
                    setMessage("Already User Exists");
                    //setRegisterdata({first_name:"",last_name:"",email:"",password:""});
                }


            }

        }
        helper.open("POST","http://127.0.0.1:9696/Register");
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(registerData));

    }
    const insert=()=>
    {
        var helper=new XMLHttpRequest();

        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responeReceived=JSON.parse(helper.responseText);

                if(responeReceived.affectedRows!=undefined && responeReceived.affectedRows>0)
                {
                    setMessage("Registered Successfully");
                    setRegisterdata({first_name:"",last_name:"",email:"",password:"",mobile:""});

                    setTimeout(()=>{
                        history.push('/login');
                    },3000);
                      
                }
                else
                {
                    setMessage("Please enter different email or password!");
                    setRegisterdata({first_name:"",last_name:"",email:"",password:"",mobile:""});
                }
                
                
                
            }

        }

        helper.open("POST","http://127.0.0.1:9696/Insert");
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(registerData));
    }
    const msgDisplay=()=>
    {
        if(message=="")
        {
            //sessionStorage.setItem("isRegistered","false");
            return(
                <div></div>
            );
        }
        else
        {
            if(message=="Registered Successfully")
        {
            sessionStorage.setItem("isRegistered","true");
            return (
                       <div className="alert alert-success">
                    <strong>Success!</strong>Registration Completed
                </div>
            );
        }
        else
        {
            //sessionStorage.setItem("isRegistered","false");
            return(
                <div className="alert alert-danger">
                    <strong>Failed!</strong>Please change your Email or Password
                </div>
            );
        }
            
        }
        
    }
    
   


    return(
            <>
            <div className='container'>
        <br/>
                <center>
                    <h1>REGISTER YOURSELF</h1>
                    <hr></hr>
                    <table className="table table-bordered table-hover loginTable">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>
                     <input type="text"
                        placeholder="Enter FirstName"
                        value={registerData.first_name} 
                        name='first_name'
                        onChange={OnTextChange} required/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Last Name
                                </td>
                                <td>
                                    <input type="text" placeholder="Enter LastName" value={registerData.last_name} name="last_name" onChange={OnTextChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input type="text" placeholder="Enter Email" value={registerData.email} name="email" onChange={OnTextChange} required></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                            <input type="password"
                            placeholder="Enter Password" 
                            value={registerData.password}
                            name='password'
                            onChange={OnTextChange} required
                            />
                                </td>
                            </tr>
                            <tr>
                                <td>Mobile:</td>
                                <td>
                                    <input type="text" placeholder="Enter Mobile Number" value={registerData.mobile} name='mobile' onChange={OnTextChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={"4"}>
                                   <button onClick={insert} className="btn btn-primary">
                                     Register
                                   </button>
                                   <hr></hr>
                                   {msgDisplay()}
                                </td>
                            </tr>   
                        </tbody>
                    </table>
                </center>
        </div>
            </>
    );

}

export default Register;