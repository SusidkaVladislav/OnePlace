import React,{Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/admin/enter/Login/Login';
import Register from '../components/admin/enter/Register/Register';
import Main from '../components/admin/main/Main';
import ItemMain from '../components/admin/main/ItemMain/ItemMain';
import ItemSales from '../components/admin/main/ItemSales/ItemSales';

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
            {this.state.shouldRedirect && <Route path="/login" render={() => null} />}
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/admin/main" element={<Main/>}/>
            {/* <Route path="/admin/main-item/:body_count" element={<ItemMain/>}/>
            <Route path="/admin/sales-item/:body_count" element={<ItemSales/>}/> */}
        </Routes>
      </BrowserRouter>
    );
  }
};

  
  export default MyRoutes;