import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './pages/Register';
import './styles/main_style.css';
import Login from './pages/Login';
import AdminLanding from './pages/AdminLanding';
import Header from './components/Header';
import AdminRoute from './utils/AdminRoute';
import AuthContext, { AuthProvider } from './context/AuthContext';
import { Fragment } from 'react';
import AnalystRoute from './utils/AnalystRoute';
import AnalystLanding from './pages/AnalystLanding';
import AddProducts from './pages/adminPages/AddProducts';
import ViewProducts from './pages/adminPages/ViewProducts';
import PopularProducts from './pages/analystPages/PopularProduct';
import UserAnalysis from './pages/analystPages/UserAnalysis';
import UpdateProduct from './pages/adminPages/UpdateProduct';
import TransActionPage from './pages/adminPages/TransActionPage';

function App() {

  return (
    <>
    
    <Router>
      <Fragment>
        <AuthProvider>
          <Header/>
          <Routes>
            {/* <Route path="/" element={<Register/>}></Route> */}
            <Route path="/" element={<Login/>}></Route>
            <Route path='/admin/landing' element={(
              <AdminRoute>
                <AdminLanding/>
              </AdminRoute>
            )}/>
            <Route path='/admin/addProduct' element={(
              <AdminRoute>
                <AddProducts/>
              </AdminRoute>
            )}/>
            <Route path='/admin/viewProduct' element={(
              <AdminRoute>
                <ViewProducts/>
              </AdminRoute>
            )}/>
            <Route path='/admin/updateProduct' element={(
              <AdminRoute>
                <UpdateProduct/>
              </AdminRoute>
            )}/>
            <Route path='/admin/transPage' element={(
              <AdminRoute>
                <TransActionPage/>
              </AdminRoute>
            )}/>
            <Route path="/analyst/landing" element={(
              <AnalystRoute>
                <AnalystLanding/>
              </AnalystRoute>
            )}/>
            <Route path="/analyst/popularProduct" element={(
              <AnalystRoute>
                <PopularProducts/>
              </AnalystRoute>
            )}/>
            <Route path="/analyst/userAnalysis" element={(
              <AnalystRoute>
                <UserAnalysis/>
              </AnalystRoute>
            )}/>



          </Routes>
        </AuthProvider>
      </Fragment>
    </Router>
    </>
  );
}

export default App;
