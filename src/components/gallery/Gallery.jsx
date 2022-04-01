import {useContext} from 'react';
import {userContext} from '../context/Context';
import style from './gallery.module.css';
import Photo from '../photo/Photo';

export default function Gallery() {

  const {photos} = useContext(userContext);

  return (
    <div className={style.container}>
        <p>Unassigned</p>
        <div className={style.containerPhotos}>
            {photos.map((photo,i)=>{
                return(
                <Photo index={i} photo={photo} key={photo.id}/>
                )
            })}
        </div>
    </div>
  )
}
