import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";


function LogOut()
{
    const history=useHistory();
    
    sessionStorage.setItem("isloggedin","false");
    history.push('/home');
    
}
export default LogOut;