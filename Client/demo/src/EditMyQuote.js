import { useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



function EditMyQuote()
{

    var changeAuthor=sessionStorage.getItem("editauthor");
    var changeText=sessionStorage.getItem("edittext");
    const [editQuote,setQuote]=useState({author:changeAuthor,text:changeText});
    const history=useHistory();
    var QuoteID=sessionStorage.getItem("quoteID");


    const update=()=>
    {
        var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responseReceived=JSON.parse(helper.responseText);
                sessionStorage.removeItem("editauthor");
                sessionStorage.removeItem("edittext");
                history.push('/home');
            }
            
        }
        helper.open("PUT","http://127.0.0.1:9696/AllQuotes/"+QuoteID);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(editQuote));

    }

    const OnTextChange=(args)=>
    {
        var copyData={...editQuote};
        copyData[args.target.name]=args.target.value;
        setQuote(copyData);
    }

    return(
        <>
          <table className="table table-bordered">
            <tbody>
                <tr>
                    <td>Author:</td>
                    <td>
                        <input type="text" name='author' value={editQuote.author} id="author" onChange={OnTextChange}></input>
                    </td>
                </tr>
                <hr></hr>
                <tr>
                    <td>
                        Quote:
                    </td>
                    <td>
                        <input type="text" name='text' value={editQuote.text} id="text" onChange={OnTextChange}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="btn btn-warning" onClick={update}>UPDATE</button>
                    </td>
                </tr>
            </tbody>

          </table>
        
        </>
    );


}

export default EditMyQuote;