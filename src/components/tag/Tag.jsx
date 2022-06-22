import {useContext} from 'react';
import Assign from '../assign/Assign';
import style from './tag.module.css';
import { userContext } from '../context/Context';

export default function Tag({id,tag,isMenuOpen,deleteTag}) {

    const { selectedPhoto,selectedTag} = useContext(userContext);

  return (
    <li
        className={style.tag}
        style={{
            backgroundColor:
            (!selectedPhoto?.isActive && !isMenuOpen) ||
            selectedTag == tag.name
                ? tag?.color
                : '',
            border: `${tag?.color} 1px solid`
        }}
        >
        <Assign
            tag={tag}
            deleteTag={deleteTag}
            id={id}
            isMenuOpen={isMenuOpen}
            selectedPhoto={selectedPhoto}
        />
    </li>
  )
}
