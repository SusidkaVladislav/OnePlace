import React,{ Component } from "react";
//import Header from "./components/admin/Header";
import "./App.css";
import MyRoutes from "./Routes/MyRoutes";
import { Helmet } from 'react-helmet';

class App extends Component {
  
  render()
  {
    return (
      <div className="body-div">
         <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Helmet>
        <div>
            <MyRoutes/>
        </div>
      </div>
      
    );

  }
}

export default App;
