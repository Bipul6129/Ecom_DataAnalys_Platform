import Swal from "sweetalert2"

const ListButton=({products})=>{

    let showProducts=()=>{
        console.log(products)
        let productList = ""
        products.map((product,index)=>(
            productList=productList+"<br>"+product.product_name
        ))
        console.log(productList)
        Swal.fire("Product List",productList)

    }


    return(
        <>
        <button onClick={showProducts}>Show Products</button>
        
        </>
    )
}

export default ListButton