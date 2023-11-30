import { useContext, useEffect, useState } from "react";
import CheckAdminLogin from "../../components/CheckAdminLogin";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ViewProducts =()=>{

    // CheckAdminLogin()
    let navigate = useNavigate()
    let {authTokens,serverUrl} = useContext(AuthContext)
    let [products,setProducts] = useState(null)

    let fetchProduct = async()=>{
        const config = {
            headers: {
              'Authorization': 'JWT '+authTokens.access,
              'Content-Type': 'application/json',
            },
        };
        try{
            let response = await axios.get(serverUrl+"/products/crud_products/",config)
            setProducts(response.data)
            console.log(response)
        }catch(error){
            console.log(error)
        }

    }

    let delProduct=async(productId)=>{
        const {isConfirmed}=await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if(isConfirmed){
            const config = {
                headers: {
                  'Authorization': 'JWT '+authTokens.access,
                  'Content-Type': 'application/json',
                },
            };

            try{
                await axios.delete(serverUrl+'/products/del_products/'+productId+'/delete/',config)
                fetchProduct()
                Swal.fire("Deleted!", "Your product has been deleted.", "success");
            }catch(error){
                Swal.fire("Error", "Failed to delete the product.", "error")
            }
        }
    }

    let updateProduct=async(product)=>{
        console.log(product)
        navigate('/admin/updateProduct/',{state:{product}})
    }

    useEffect(()=>{
        fetchProduct()
    },[])

    return (
        <>
        <section style={{width:'80%'}}>
        <table className="product-table">
            <thead>
            <tr>
                <th>S.No</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Category</th>
                <th>Delete</th>
                <th>Update</th>
            </tr>
            </thead>
            <tbody>
            {products && products.map((product, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.product_price}</td>
                <td>{product.product_category}</td>
                <td><button onClick={()=>delProduct(product.product_id)}>Delete</button></td>
                <td><button onClick={()=>updateProduct(product)} >ClickToUpdate</button></td>
                </tr>
            ))}
            </tbody>
        </table>

        </section>
        </>
    )
}

export default ViewProducts;