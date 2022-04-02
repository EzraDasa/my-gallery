import {useContext} from 'react';
import Photo from '../photo/Photo';
import Tag from '../assign/Assign';
import styles from './album.module.css';
import {useDrop} from 'react-dnd';
import { userContext } from '../context/Context';

export default function Album({album,index}) {

  const {tags,setTags} = useContext(userContext);

  const addPhotoToAlbum = (id)=>{
    const copyTags = [...tags];
    copyTags[index].photos.unshift(id)
    setTags(copyTags)
    localStorage.setItem("tagsData",JSON.stringify(copyTags))
  }

  const [{isOver},drop] = useDrop(()=>({
    accept:"image",
    drop: (item)=> addPhotoToAlbum(item.photo),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
    }))

  return (
    <div ref={drop} id={index} className={album?styles.album:null} >
        <Tag tag={album} isMenuOpen={true} id={"album"}/>
        <div className={album?.photos?.length?styles.orderPhoto:null}>
          {album?.photos?.length ?
          album.photos.map((photo,i)=>{
              return <Photo index={i} key={i} photo={photo} tag={album}/>
          }):null
          }
        </div>
    </div>
  )
}
