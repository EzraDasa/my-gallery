import {useState,useRef,useContext, useEffect} from 'react';
import { userContext } from '../context/Context';
import style from './albums.module.css';
import Album from '../album/Album';

export default function Albums() {

  const { tags} = useContext(userContext)
  const searchAlbumRef = useRef("")
  
  const [albums,setAlbums] = useState(tags); 
  
  useEffect(()=>{
    setAlbums(tags)
  },[tags])

  const filterAlbum =()=>{
    const filterAlbums = tags.filter((album)=>album.name.indexOf(searchAlbumRef.current.value) >  -1)
    if(searchAlbumRef.current.value == "") return setAlbums(tags);
    setAlbums(filterAlbums)
  }

  return (
    <>
      <input type="text" ref={searchAlbumRef} onChange={filterAlbum}/>
    {albums?.length?
      <div className={style.albums}>
        {albums.map((album,i)=>{
          return(
            <Album key={i} album={album} index={i} />
          )
        })}
      </div>
      :null}
    </>
  )
}
