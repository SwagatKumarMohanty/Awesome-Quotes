
import { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import RecordTable from "./RecordTable";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Admin()
{
    //creating topics now(add)
    //modifying topics(edit/delete)
    //view topics and there contents and comments
    //modify comments(hide/unhide/delete)

    //creating topics
    
    const [topiccollection,setTopics]=useState([]);
    const [topicsdata,setTopicsData]=useState({topic_id:0,topic_name:"",description:""});
    const [message,setMessage]=useState("");
    const history=useHistory();

    // const[topics,setTopic]=useState("");
    // const [description,setDescription]=useState("");

    useEffect(()=>
    {
        select();
    },[]);

    useEffect(()=>
    {
       setTimeout(()=>{
        setMessage("");
       },3000)

    },[message])
    
    const OnTextChange=(args)=>
    {
        var copyOfData={...topicsdata};
        copyOfData[args.target.name]=args.target.value;
        setTopicsData(copyOfData);
    }
    const Insert=()=>
    {
        if(sessionStorage.getItem("id")!=undefined)
        {
            var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responseReceived=JSON.parse(helper.responseText);
                if(responseReceived.affectedRows!=undefined && responseReceived.affectedRows>0)
                {
                    setMessage("Record inserted successfully");
                    select();
                    setTopicsData({topic_name:"",description:""});
                }
            }


        }
        helper.open("POST","http://127.0.0.1:9696/AdminInsertTopic");
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(topicsdata));

        }
        else
        {
            setMessage("Please Login First");
        }
        
    }
    const select=()=>
    {
        var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responeReceived=JSON.parse(helper.responseText);
                setTopics(responeReceived);
            }

        }
        helper.open("GET","http://127.0.0.1:9696/AdminInsertTopic");
        helper.send();

    }
    // const edit=(topicid)=>
    // {
    //     var helper=new XMLHttpRequest();
    //     helper.onreadystatechange=()=>
    //     {
    //         if(helper.readyState==4 && helper.status==200)
    //         {
    //             var responeReceived=JSON.parse(helper.responseText);
    //             console.log(responeReceived);
    //             setTopicsData(responeReceived);
    //         }

    //     }
    //     helper.open("GET","http://127.0.0.1:9696/AdminInsertTopic/"+topicid);
    //     helper.send();
    // }    
    const edit=(topicid)=>
    {
        topiccollection.map((data)=>{
            if(data.topic_id==topicid)
            {
                console.log(data);
                var copy={...data};
                setTopicsData(copy);
                return;
            }
        })
    }

    const deleteTopic=(topicid)=>
    {
        var helper =new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==200)
            {
                var responseReceived=JSON.parse(helper.responseText);
                if(responseReceived.affectedRows!=undefined && responseReceived.affectedRows>0)
                {
                    setMessage("Record Deleted successfully");
                    select();
                    //setTopicsData({topics:"",description:""});
                }

            }

        }
        helper.open("DELETE","http://127.0.0.1:9696/AdminInsertTopic/"+topicid);
        helper.send();
    }
    const Update=()=>
    {
        var helper =new XMLHttpRequest();
        helper.onreadystatechange=()=>
        {
            if(helper.readyState==4 && helper.status==500)
            {
                console.log("Inside bro");
                var responeReceived=JSON.parse(helper.responseText);
                if(responeReceived.affectedRows!=undefined && responeReceived.affectedRows>0)
                {
                    console.log("Updated");
                    setMessage("Record updated successfully");
                    select();
                    setTopicsData({topic_name:"",description:""});
                }
                
    
            }
        }
            helper.open("PUT","http://127.0.0.1:9696/AdminInsertTopic/"+topicsdata.topic_id);
            helper.setRequestHeader("Content-Type","application/json");
            helper.send(JSON.stringify(topicsdata));
    
    }

    const addTutorial=(topic_id,topic_name)=>
    {
        window.sessionStorage.setItem("topicId",topic_id);
        window.sessionStorage.setItem("topicName",topic_name);
        var temp=window.sessionStorage.getItem("topicId");
        history.push('/Tutorial/'+temp);
        
    }

    return(
        <div className="container">
        <table className="table table-borderd">
         <tr>    
             <td>Topic:</td>
             <td>
                 <input type="text" name="topic_name" placeholder="Enter Topic Name" value={topicsdata.topic_name} onChange={OnTextChange}>
                 </input>
             </td>
         </tr>
         <tr>
             <td>Description:</td>
             <td>
                 <input type="text" name="description" placeholder="Enter Description" value={topicsdata.description} onChange={OnTextChange}></input>
             </td>
         </tr>
         <tr>
             <td>
                 <button className="btn btn-primary" onClick={Insert}>Insert</button> 
             </td>
             <td>
             <button className="btn btn-warning" onClick={Update}>Update</button> 
             </td>
         </tr>
         <hr></hr>
         <tr>
             <td>{message}</td>
         </tr>
        </table>
        <br></br><br></br>

          <div className="yourDiv"><h1>Available Topics</h1></div>
         <table className="table table-bordered">
             <tr>
                 <th className="heading">TOPICS ID</th>
                 <th className="heading">TOPICS</th>
                 <th className="heading">DESCRIPTION</th>
                 <th className="heading">EDIT</th>
                 <th className="heading">DELETE</th>
             </tr>
             <tbody>
                 {
                     topiccollection.map((data)=>
                     {
                         return(
                             // <RecordTable></RecordTable>
                             <tr>
                                 <td>{data.topic_id}</td>
                                 <td>{data.topic_name}</td>
                                 <td>{data.description}</td>
                                 <td>
                                     <button className="btn btn-warning" onClick={()=>{edit(data.topic_id)}}>EDIT</button>
                                 </td>
                                 <td>
                                 <button className="btn btn-danger" onClick={()=>{deleteTopic(data.topic_id)}}>DELETE</button>
                                 </td>
                                 <td>
                                    <button className="btn btn-success" onClick={()=>{addTutorial(data.topic_id,data.topic_name)}}>Add Tutorials</button>
                                 </td>
                             </tr>
                         );
                     }
                     )
                 }
             </tbody>
         </table>
        </div>
 );

}
    

export default Admin;