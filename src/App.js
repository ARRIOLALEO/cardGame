import axios from 'axios';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react'
import './App.css';
const mainURL = "https://api.unsplash.com/photos/?client_id="
function App() {

  const [photos, seTphotos] = useState([])
  const [selected,setSelected] = useState(null)
  const [isBloked,setisBloked] = useState(false)

  async function callToApi(){
    const page1 = `${mainURL}${process.env.REACT_APP_API_KEY}&page=${3}`
    const page2 = `${mainURL}${process.env.REACT_APP_API_KEY}&page=${7}`

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
    
    const shuffle = (arr) =>{
      for(let index = 0 ; index < arr.length ; index++){
        const positionRandom = Math.floor(Math.random() * arr.length)
        let temp  = arr[index]
        arr[index]= arr[positionRandom]
        arr[positionRandom] = temp
      }
    }
    shuffle(images)
    seTphotos(images)
  }

  useEffect(()=>{
    callToApi()
  },[])

  const handlerClick = (index) =>{

    if((selected !== null && selected === index) || isBloked){
      return
    }
    
    let copyPhotos = [...photos];
    copyPhotos[index].liked_by_user = true
    // here i will update my state
    // lets check if i alredy selected one card
    if(selected === null){
      setSelected(index)
      seTphotos(copyPhotos)
    }else{
      setisBloked(true)
      if(copyPhotos[index].id !== copyPhotos[selected].id){
        console.log("this dont mach ", copyPhotos[index].id, selected)
        // firt im showing the images 
        seTphotos(copyPhotos)
        // because they dont mach im hidding them after 1 second 
        setTimeout(()=>{
          copyPhotos[selected].liked_by_user = false
          copyPhotos[index].liked_by_user = false
          setSelected(null)
          seTphotos(copyPhotos)
          setisBloked(false)
        },1000)
    }else{
      // if the images mach i dont have set hide them
      seTphotos(copyPhotos)
      setisBloked(false)
      // why i need to set this selected to null
      setSelected(null)
    }
  }
  }
  console.log("--- get rendered again -----")
  return (
    <div className="App"> 
          {
        photos.map((photo,index)=>{
          return(
            <div className='single__card' key={photo.unique} onClick={()=>{
              handlerClick(index)
            }}>
              <img src={photo.urls.thumb} alt={photo.description} className={photo.liked_by_user?"show":null}/>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;