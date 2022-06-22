import {useContext,useEffect,useState} from 'react';
import Photo from '../photo/Photo';
import Tag from '../assign/Assign';
import styles from './album.module.css';
import {useDrop} from 'react-dnd';
import { userContext } from '../context/Context';

export default function Album({album,index}) {

  const {tags,setTags} = useContext(userContext);
  const [listPhoto,setListPhoto] = useState(album)

  useEffect(()=>{
    const copyTags = [...tags]
    copyTags[index] = listPhoto;
    setTags(copyTags)
    localStorage.setItem("tagsData",JSON.stringify(copyTags))
  },[listPhoto])

  const addPhotoToAlbum = (id)=>{
    const copyTags = {...listPhoto};
    copyTags.photos.unshift(id)
    setListPhoto(copyTags)
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
          {listPhoto?.photos?.length ?
          listPhoto.photos.map((photo,i)=>{
              return <Photo index={i} key={i} photo={photo} tag={listPhoto}/>
          }):null
          }
        </div>
    </div>
  )
}
