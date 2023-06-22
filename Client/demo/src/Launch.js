import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Link, Switch } from "react-router-dom/cjs/react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import AddQuotePage from "./AddQuotePage";
import EditMyQuote from "./EditMyQuote";
import ProtectedRoute from "./ProtectedRoute";
import './commom.css';
import FavouriteQuotesReact from "./FavouriteQuotesReact";
import MyProfile from "./MyProfile";
import LogOut from "./LogOut";



function Launch()
{
   const [userName,setuserName]=useState("User");

   const showButton=()=>
   {
     if(userName=="User")
     {
        return <button className="btn btn-success">Sign In</button>
     }
     else
     {

     }
   }

   useEffect(()=>{

    if(sessionStorage.getItem("username")=="User")
    {

    }
    else
    {

    }
    

   },[]);






    return (<>
             <div className="heading topic">Awesome Quotes</div>
            <div className="myDiv">
                
                <div className="navbarDiv">
                    <Link to="/home">Home</Link>
                    {" | "}
                    <Link to="/login">Login</Link>
                    {" | "}
                    <Link to="/register">Register</Link>
                    {" | "}
                    <Link to="/myprofile">My Profile</Link>
                    {" | "}
                 </div>
                     <div>   
                    <Link to="/logout">LogOut</Link>
                    </div>
                </div> 
                    <div>
                {/* Welcome {userName}{" "}{showButton()} */}
                    </div>       
                    <Switch>
                        <ProtectedRoute path="/home" exact component={Home}></ProtectedRoute>
                        <Route path="/login" exact component={Login} setuserName={setuserName}></Route>
                        <Route path="/register" exact component={Register}></Route>
                        <Route path="/addquote" exact component={AddQuotePage}></Route>
                        <Route path="/editmyquote/:quoteid" exact component={EditMyQuote}></Route>
                        <Route path="/favouritequotes" exact component={FavouriteQuotesReact}></Route>
                        <Route path="/myprofile" exact component={MyProfile}></Route>
                        <Route path="/logout" exact component={LogOut}></Route>
                    </Switch>
            <div className="myfooter">
                        This is Footer
            </div>
           </>
    );

}


export default Launch;