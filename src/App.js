import './App.css';
import DragDrop from './components/dragDrop/DragDrop';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {userContext} from './components/context/Context';

function App() {
  const [photos,setPhotos]= useState([]);
  const [selectedPhoto,setSelectedPhoto] = useState(null);
  const [selectedTag,setSelectedTag] = useState(null);
  
  const [tags,setTags]= useState([]);
  
  useEffect(()=>{
     const photosData = JSON.parse(localStorage.getItem("photosData"))
     const tagsData =  JSON.parse(localStorage.getItem("tagsData"))
    if(!photosData){
      axios
      .get("https://picsum.photos/v2/list?page=2&limit=10")
      .then((res)=>{
        setPhotos(res.data);
        localStorage.setItem("photosData",JSON.stringify(res.data))
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else{
      setTags(tagsData)
      setPhotos(photosData);
    }
},[])

  return (
    <userContext.Provider value={{photos,setPhotos,tags,setTags,selectedPhoto,setSelectedPhoto,selectedTag,setSelectedTag}}>
      <div className="App">
        <DragDrop/>
      </div>
     </userContext.Provider>
  );
}

export default App;
