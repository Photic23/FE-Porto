import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage';

function App(){

  // const [apiResponse, setApiResponse] = React.useState("")
  
  // function callAPI() {
  //   fetch("https://be-porto-gsya6f5yh-photic23s-projects.vercel.app/testAPI/")
  //       .then(res => res.json())
  //       .then(res => setApiResponse(res));
       
  // }

  // callAPI();

  // let textRes = apiResponse;
  // let textArray = []
  // for(let i in textRes){
  //   textArray.push(textRes[i])
  // }

    return(
      <>
        <HomePage></HomePage>
      </>
    )
  }



export default App;
