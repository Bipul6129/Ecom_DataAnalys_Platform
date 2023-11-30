import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import AddProducts from "../pages/adminPages/AddProducts";

const Header = ()=>{
    let {user,logoutUser}=useContext(AuthContext)
    return (
        <header>
            <div class="container">
                <div class="d-flex align-items-center justify-content-between"> 
                    <div class="d-flex align-items-center">
                        <h1>E-Commerce Analytics Platform </h1>
                        
                    </div>
                    <div class="menu-toggle" id="mobile-menu">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-around"}}>
                        {user?(<>
                            
                            {user.role=="admin"?(
                                <>
                                <Link to="admin/addProduct" className="nav-link">AddProduct</Link>
                                <Link to="admin/viewProduct" className="nav-link">ViewProducts</Link>
                                <Link to="admin/transPage" className="nav-link">ViewTransactions</Link>
                                </>
                            ):user.role=="analyst"?(
                                <>
                                <Link to="analyst/popularProduct" className="nav-link">PopularProducts</Link>
                                <Link to="analyst/userAnalysis" className="nav-link">UserAnalysis</Link>
                                </>
                                

                            ):null}
                            <Link onClick={logoutUser} className="nav-link">Logout</Link>
                            </>
                            

                        ):(
                            <>
                            </>
                        )}

                        {/* <a href="signup.html" class="nav-link">Home</a>
                        <a href="https://github.com/Bipul6129" class="nav-link">Github</a>
                        <a href="profile.html" class="nav-link">Profile</a> */}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;