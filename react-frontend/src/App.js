import React,{ Component } from "react";
//import Header from "./components/admin/Header";
import "./App.css";
import MyRoutes from "./Routes/MyRoutes";

class App extends Component {
  
  render()
  {
    return (
      <div className="body-div">
        {/* <div>
          <Header/>
        </div> */}
        <div>
            <MyRoutes/>
        </div>
      </div>
      
    );

  }
}

export default App;
