import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function MyProfile()
{
    var userid=sessionStorage.getItem("id"); 
    const history=useHistory();
    const [editprofile,seteditprofile]=useState({first_name:"",last_name:"",email:"",mobile:""});
    const [message,setMessage]=useState("");

    useEffect(()=>{
        setTimeout(()=>{
            setMessage("")
        },3000)
    },[message]);

    useEffect(()=>{
        select();
    },[]);



    


    const select=()=>
    {
        var userLogin=sessionStorage.getItem("isloggedin");
        if(userLogin=='true')
        {
            var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responseReceived=JSON.parse(helper.responseText);
                console.log(responseReceived);
                var temp=new Array();
                temp=responseReceived;
                editprofile.first_name=temp[0].first_name;
                editprofile.last_name=temp[0].last_name;
                editprofile.email=temp[0].email;
                editprofile.mobile=temp[0].mobile;
                setMessage("Data Loading");
            }
            

        }
        helper.open("GET","http://127.0.0.1:9696/EditProfile/"+userid);
        helper.send();

        }
        else
        {
            history.push('/login');
        }
        
        

    }

    const update=()=>
    {
        var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responseReceived=JSON.parse(helper.responseText);
                seteditprofile({first_name:"",last_name:"",email:"",mobile:""});
                setMessage("Entry Updated");
                history.push('/home');

            }
            

        }
        helper.open("PUT","http://127.0.0.1:9696/EditProfile/"+userid);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(editprofile));

    }
    const OnTextChange=(args)=>
    {
        var copyData={...editprofile};
        copyData[args.target.name]=args.target.value;
        seteditprofile(copyData);
    }



    return(
        <>
          <div className='container'>
        <br/>
                <center>
                    <h1>My Profile</h1>
                    <hr></hr>
                    <table className="table table-bordered table-hover loginTable">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>
                     <input type="text"
                        placeholder="Enter FirstName"
                        value={editprofile.first_name} 
                        name='first_name'
                        onChange={OnTextChange} required/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Last Name
                                </td>
                                <td>
                                    <input type="text" placeholder="Enter LastName" value={editprofile.last_name} name="last_name" onChange={OnTextChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input type="text" placeholder="Enter Email" value={editprofile.email} name="email" onChange={OnTextChange} required></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Mobile:</td>
                                <td>
                                    <input type="text" placeholder="Enter Mobile Number" value={editprofile.mobile} name='mobile' onChange={OnTextChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={"4"}>
                                   <button onClick={update} className="btn btn-primary">
                                     Save
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
export default MyProfile;