import axios from 'axios';
import { useEffect } from 'react'
import './App.css';
const mainURL = "https://api.unsplash.com/photos/?client_id="
function App() {
  async function callToApi(){
    const {data} = await axios.get(mainURL+process.env.REACT_APP_API_KEY)
    console.log(data)
  }

 
  useEffect(()=>{
    callToApi()
  },[])

  return (
    <div className="App"> 
      <br/>
    </div>
  );
}

export default App;
