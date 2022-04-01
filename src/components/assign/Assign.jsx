import { useState,useContext } from 'react'
import style from './assign.module.css'
import { userContext } from '../context/Context';
import { VscTrash } from "react-icons/vsc";
import { BiEditAlt } from "react-icons/bi";

export default function Assign({tag,deleteTag,i,isMenuOpen,selectedPhoto}) {

    const { tags,setTags,setSelectedTag } = useContext(userContext);

    const [toEdit,setToEdit] = useState(null);

    const updateTagName = ()=>{
      const copyTags = [...tags];
      copyTags[i].name = toEdit;
      setTags(copyTags)
      setToEdit(null)
    }

  return (
    <div
    onClick={()=>setSelectedTag(tag.name)}
    className={style.assign}
    style={{backgroundColor:i == "albums"?tag?.color:null}}>
        {!toEdit?<p>{tag?.name}</p>:
        <>
          <input className={style.inputEdit} type="text" value={toEdit} onChange={(e)=>setToEdit(e.target.value)}/>
          <button className={style.btnEdit} onClick={updateTagName}>Edit</button>
        </>
        }
        { !selectedPhoto?.isActive && !isMenuOpen && !toEdit?<div>
          <BiEditAlt onClick={()=>setToEdit(tag?.name)}/>
          <VscTrash onClick={()=>deleteTag(i)}/>
          </div>:""}
    </div>
  )
}
