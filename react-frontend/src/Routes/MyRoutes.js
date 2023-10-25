import React,{Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/admin/enter/Login/Login';
import Register from '../components/admin/enter/Register/Register';
import Main from '../components/admin/main/Main';
import ChangePassword from '../components/admin/enter/ChangePassword/ChangePassword';
import AdminLogin from '../components/admin/enter/AdminLogin/AdminLogin';
import Header from '../components/user/main/Header';

class MyRoutes extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: true,
    };
  }

  componentDidMount() {
    this.setState({ shouldRedirect: false });
  }
  render(){
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/main" element={<Header/>}/>
            <Route path="/" element={<AdminLogin/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/admin/main" element={<Main/>}/>
            <Route path="/admin/login" element={<AdminLogin/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
};
  
  export default MyRoutes;