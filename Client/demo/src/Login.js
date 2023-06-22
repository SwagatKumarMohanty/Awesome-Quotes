import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login()
{
     const [loginData,setloginData]=useState({username:"",password:""});

     const [message,setMessage]=useState("");

     const history=useHistory();

     useEffect(()=>{
        setTimeout(()=>{
            setMessage("")
        },3000);
     },[message]);

    const OnTextChange=(args)=>
    {
        var copyOfCredentials={...loginData};
        copyOfCredentials[args.target.name]=args.target.value;
        setloginData(copyOfCredentials);
    }

    const SignIn=()=>
    {
        const helper= new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responeReceived=JSON.parse(helper.responseText);
                if(responeReceived.isvalid!='false')
                {
                    setMessage("Login Successful");
                    console.log(responeReceived.isvalid);
                    sessionStorage.setItem("id",responeReceived.isvalid);
                    sessionStorage.setItem("isloggedin","true");
                    setloginData({username:"",password:""});
                    history.push('/home');
                }
                else
                {
                    setMessage("Login Failed");
                    setloginData({username:"",password:""});

                }
            }

        }

        helper.open("POST","http://127.0.0.1:9696/Login");
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(loginData));

    }
    

   

    return (
        <>
        <div className='container'>
        <br/>
                <center>
                    <h1> PLEASE LOG IN</h1>
                    <hr></hr>
                    <table className="table table-bordered table-hover loginTable">
                        <tbody>
                            <tr>
                                <td>User Name</td>
                                <td>
                     <input type="text"
                        placeholder="Enter UserName"
                        value={loginData.username} 
                        name='username'
                        onChange={OnTextChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                            <input type="password"
                            placeholder="Enter Password" 
                            value={loginData.password}
                            name='password'
                            onChange={OnTextChange}
                            />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={"2"}>
                                   <button onClick={SignIn} className="btn btn-primary">
                                     Login In
                                   </button>
                                   <hr></hr>
                                   {message}
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </center>
        </div>
        </>
    );

}

export default Login;