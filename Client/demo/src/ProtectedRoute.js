import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./Login";
import Register from "./Register";

function ProtectedRoute(props)
{
    var isloggedin;

    var isUserLoggedIn=sessionStorage.getItem("isloggedin");

    if(isUserLoggedIn!=null && isUserLoggedIn=='true')
    {
         isloggedin=true;
    }
    else
    {
       isloggedin=false;
    }
    if(isloggedin)
    {
        return <Route path={props.path} exact component={props.component}></Route>;
    }
    else
    {
        return <Login></Login>;
    }


}
export default ProtectedRoute;