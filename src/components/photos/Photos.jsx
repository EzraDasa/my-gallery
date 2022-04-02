import {useContext} from 'react';
import {userContext} from '../context/Context';
import style from './photos.module.css';
import Photo from '../photo/Photo';

export default function Photos() {

  const {photos} = useContext(userContext);

  return (
    <div className={style.container}>
        <p>Unassigned</p>
        <div className={style.containerPhotos}>
            {photos.map((photo,i)=>{
                return(
                <Photo id={i} photo={photo} key={photo.id} isGallery={true}/>
                )
            })}
        </div>
    </div>
  )
}
