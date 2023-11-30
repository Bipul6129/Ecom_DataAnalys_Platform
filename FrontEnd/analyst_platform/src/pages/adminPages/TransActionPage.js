import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import ListButton from "../../components/ListButton";

const TransActionPage=()=>{
    let[transData,setTransData]=useState(null)
    let {authTokens,serverUrl} = useContext(AuthContext)
    let getTransRes = async()=>{
        const config = {
            headers: {
              'Authorization': 'JWT '+authTokens.access,
              'Content-Type': 'application/json',
            },
        };
        try{
            let response = await axios.get(serverUrl+"/products/allTransaction/",config)
            setTransData(response.data)
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getTransRes()
    },[])

    return(
        <>
            <section>
            <table className="product-table">
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>User Name</th>
                    <th>Products</th>
                    <th>Time</th>
                </tr>
                </thead>

                <tbody>
                    {transData && transData.map((trans,index)=>(
                        
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{trans.username}</td>
                            <td><ListButton products={trans.products}/></td>
                            <td>{new Date(trans.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </section>
        </>
    )
}

export default TransActionPage;