import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/nav';
import TempPage from './components/tempPage';

class app extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("https://be-porto-gsya6f5yh-photic23s-projects.vercel.app/testAPI/")
        .then(res => res.json())
        .then(res => this.setState({ apiResponse: res }));
       
  }

  componentWillMount() {
    this.callAPI();
    
  }


  render(){
    let textRes = this.state.apiResponse;
    let textArray = []
    for(let i in textRes){
      textArray.push(textRes[i])
    }

    return(
      <>
        <div className="App">
          <header className="App-header">
            <TempPage className="typing-text" textArray={textArray}></TempPage>
            {/* <img src={logo} className="App-logo" alt="logo" />
            <p className="App-intro">{this.state.apiResponse}</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a> */}
          </header>
        </div>
      </>
    )
  }

}

export default app;
