import {useContext} from 'react';
import Assign from '../assign/Assign';
import style from './tag.module.css';
import { userContext } from '../context/Context';

export default function Tag({i,tag,isMenuOpen,deleteTag}) {

    const { selectedPhoto,selectedTag} = useContext(userContext);

  return (
    <li
        key={i}
        className={style.tag}
        style={{
            backgroundColor:
            (!selectedPhoto?.isActive && !isMenuOpen) ||
            selectedTag == tag.name
                ? tag.color
                : '',
            border: `${tag.color} 1px solid`
        }}
        >
        <Assign
            tag={tag}
            deleteTag={deleteTag}
            i={i}
            isMenuOpen={isMenuOpen}
            selectedPhoto={selectedPhoto}
        />
    </li>
  )
}
