import React, { Component } from "react";
import "./App.css";
import MyHeader from "./component/MyHeader";
import MyFoot from "./component/MyFoot";
import StopWatch from "./component/StopWatch/StopWatch";
import ExportExcel from "./component/exportExcel";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <ExportExcel />
        </div>
      </div>
    );
  }
}

export default App;
