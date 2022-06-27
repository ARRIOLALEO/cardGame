import axios from 'axios';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react'
import './App.css';
const mainURL = "https://api.unsplash.com/photos/?client_id="
function App() {

  const [photos, seTphotos] = useState([])

  async function callToApi(){
    const page1 = `${mainURL}${process.env.REACT_APP_API_KEY}&page=${1}`
    const page2 = `${mainURL}${process.env.REACT_APP_API_KEY}&page=${2}`

    const [images1,images2]  = await axios.all([axios.get(page1),axios.get(page2)])
    let images  = [
      ...images1.data,
      ...images1.data,
      ...images2.data.slice(0,2),
      ...images2.data.slice(0,2)
    ]
    images = images.map(img => {
     return {...img,unique: nanoid()}
    })
    seTphotos(images)
  }

  useEffect(()=>{
    callToApi()
  },[])

  return (
    <div className="App"> 
          {
        photos.map(photo=>{
          return(
            <div className='single__card' key={photo.unique}>
              <img src={photo.urls.thumb} alt={photo.description}/>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
