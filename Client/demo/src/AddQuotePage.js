import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddQuotePage()
{
    var userid=sessionStorage.getItem("id");
    const [addQuote,setaddQuote]=useState({user_id:userid,author:"",text:""});
    const history=useHistory();
    


    const insert=()=>
    {
        var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responseReceived=JSON.parse(helper.responseText);
                console.log(responseReceived);
                // setQuote(responseReceived);
                // console.log(editQuote.author);
                history.push('/home');


            }
            
        }
        helper.open("POST","http://127.0.0.1:9696/AllQuotes");
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(addQuote));
    }

    const OnTextChange=(args)=>
    {
        var copy={...addQuote};
        copy[args.target.name]=args.target.value;
        setaddQuote(copy);
    }






    
    
    return(<>
             <h1>Add Quote</h1>

             <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <input type="text" name='author' value={addQuote.author} onChange={OnTextChange} placeholder="Enter Author"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <input type="text" name='text' value={addQuote.text} onChange={OnTextChange} placeholder="Enter Quote"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className="btn btn-success" onClick={insert}>Insert</button>
                        </td>
                    </tr>
                </tbody>


             </table>

          </>
        
    );


}
export default AddQuotePage;