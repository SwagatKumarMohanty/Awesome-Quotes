import { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './commom.css';

function FavouriteQuotesReact()
{

    var idref=sessionStorage.getItem("id");
    var [quotes,setquotes]=useState([]);
    var [eachquote,seteachquote]=useState({})
    const history=useHistory();

    useEffect(()=>{
        select();
    },[])

     const select=()=>
     {
        var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {

                var responseReceived=JSON.parse(helper.responseText);
                setquotes(responseReceived);
                console.log(responseReceived);

            }


        }
        helper.open("POST","http://127.0.0.1:9696/FavouriteQuote/"+idref);
        helper.send();

     }

     const removeFav=(quoteid)=>
     {
        var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {

                var responseReceived=JSON.parse(helper.responseText);
                //setquotes(responseReceived);
                select();
                console.log(responseReceived);

            }


        }
        helper.open("DELETE","http://127.0.0.1:9696/FavouriteQuote/"+quoteid);
        helper.send();

     }

     const backToHome=()=>
     {
        history.push('/home');
     }
   


    return(
        <>
        <center>
            <h1 className="heading">Your Favourite Quotes</h1>
            <button className="btn btn-success" onClick={backToHome}>Back</button>
            <table className="table table-bordered">
                <tbody>
                    {
                        quotes.map((val)=>{

                            return(
                                <tr>
                                    <td className="quotes">
                                    {/* <h1>{val.id}</h1> */}
                                    <h1>{val.text}</h1>
                                    <h2>-{val.author}</h2>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={()=>{removeFav(val.id)}}>DISLIKE</button>

                                    </td>
                                </tr>
                            );
                        })
                        
                    }
                    
                </tbody>

            </table>
        </center>

        
        </>
    );



}
export default FavouriteQuotesReact;