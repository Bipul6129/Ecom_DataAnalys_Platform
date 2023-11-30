import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { product } = location.state || {};
  let {authTokens,serverUrl} = useContext(AuthContext)
  console.log(product)
  
  const [formData, setFormData] = useState({
    product_name: "",
    product_price: "",
    product_category: "",
  });

  useEffect(() => {
    
    if(!product){
        navigate('/admin/viewProduct')
    }else{
        setFormData({
            product_name: product.product_name || "",
            product_price: product.product_price || "",
            product_category: product.product_category || "",
          });
    }
    
    
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    // Handle the form submission, you can use formData to get the updated values
    console.log("Updated Form Data:", formData);
    const config={
        headers: {
            'Authorization': 'JWT '+authTokens.access,
            'Content-Type': 'application/json',
        },
    }
    try{
        await axios.put(serverUrl+'/products/update_products/'+product.product_id+'/update/',formData,config)
        Swal.fire("Upated","Your data hase been updated","success")
    }catch(error){
        Swal.fire("Filed!","Your data failed to have been updated","error")
    }
  };

  return (
    <>
      <section>
        <h2>UpdateProduct</h2>
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="productname">ProductName:</label>
            <input
              type="text"
              id="productname"
              name="product_name"
              value={formData.product_name}
              placeholder="Enter your productname"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Price:</label>
            <input
              type="number"
              id="password"
              name="product_price"
              placeholder="Enter your productPrice"
              value={formData.product_price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="product_category"
              value={formData.product_category}
              placeholder="Enter your productCategory"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="register-btn">
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UpdateProduct;
