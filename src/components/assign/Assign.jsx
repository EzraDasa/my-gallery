import { useState,useContext } from 'react'
import style from './assign.module.css'
import { userContext } from '../context/Context';
import { VscTrash } from "react-icons/vsc";
import { BiEditAlt } from "react-icons/bi";

export default function Assign({tag,deleteTag,id,isMenuOpen,selectedPhoto}) {

    const { tags,setTags,setSelectedTag } = useContext(userContext);

    const [editTag,setEditTag] = useState(null);

    const updateTagName = ()=>{
      const copyTags = [...tags];
      copyTags[id].name = editTag;
      setTags(copyTags)
      setEditTag(null)
    }

  return (
    <div
    onClick={()=>setSelectedTag(tag.name)}
    className={style.assign}
    style={{backgroundColor:id == "album"?tag?.color:null}}>
        {
        !editTag
        ?
        <p className={style.fontTags}>{tag?.name}</p>
        :
        <>
          <input className={style.inputEdit} type="text" value={editTag} onChange={(e)=>setEditTag(e.target.value)}/>
          <button className={style.btnEdit} onClick={updateTagName}>Edit</button>
        </>
        }
        { !selectedPhoto?.isActive && !isMenuOpen && !editTag?<div>
          <BiEditAlt onClick={()=>setEditTag(tag?.name)}/>
          <VscTrash onClick={()=>deleteTag(id)}/>
          </div>:""}
    </div>
  )
}
