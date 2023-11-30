import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CheckAdminLogin from "../../components/CheckAdminLogin";
import Swal from "sweetalert2";

const AddProducts = () => {
    let {authTokens,serverUrl}=useContext(AuthContext)

    let addProduct=async(e)=>{
        const formData = new FormData(e.target)
        const config = {
            headers: {
              'Authorization': 'JWT '+authTokens.access,
              'Content-Type': 'application/json',
            },
          };
        e.preventDefault()
        try{
            console.log(config)
            console.log(formData)
            let response = await axios.post(serverUrl+"/products/crud_products/",formData,config)
            console.log(response.data)
            Swal.fire({
                icon:'success',
                title:'Added Successfully',
                text:"Product Added Successfully"
            })
        }catch(error){
            console.log(error.response.data)
            console.log(error.message)
        }
    }
    return (
        <>
            <section>
                <h2>AddProducts</h2>
                <form class="form" onSubmit={addProduct} >
                    <div class="form-group">
                        <label for="username">ProductName:</label>
                        <input type="text" id="productname" name="product_name"placeholder="Enter your productname" required/>
                    </div>
                    <div class="form-group">
                        <label for="password">Price:</label>
                        <input type="number" id="password" name="product_price"placeholder="Enter your productPrice" required/>
                    </div>
                    <div class="form-group">
                        <label for="password">Category:</label>
                        <input type="text" id="category" name="product_category"placeholder="Enter your productCategory" required/>
                    </div>

                    <div class="form-group">
                        <label for="register-btn"></label>
                        <button type="submit" class="register-btn">Add</button>
                    </div>

                </form>
            </section>
        </>
      
    );
  };
  
  export default AddProducts;