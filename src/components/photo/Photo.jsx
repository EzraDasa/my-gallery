import {useState,useRef,useContext ,useEffect} from 'react';
import {userContext} from '../context/Context';
import style from './photo.module.css'
import { BsTag } from "react-icons/bs";
import Tags from '../tags/Tags';
import { VscTrash } from "react-icons/vsc";
import {useDrag} from 'react-dnd';

export default function Photo({photo,tag,id,isGallery}) {

    const {tags,setTags,setSelectedPhoto,setSelectedTag} = useContext(userContext);

    const [isMenuOpen,setIsMenuOpen] = useState(false);

    const menuRef = useRef();
    
    useEffect(()=>{
        const checkIfClickOutside =(e)=>{
            if(isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)){
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("click",checkIfClickOutside)
        return()=>{document.removeEventListener("click",checkIfClickOutside)}
    },[isMenuOpen])
    
    const openMenuTags =()=>{
        setSelectedPhoto({photo,isActive:false});
        setSelectedTag(null)
        setIsMenuOpen(true);
    }
    
    const deletePhoto = ()=>{
        const copyTags = [...tags];
        const findTag = tags.findIndex((album)=>album.name == tag.name);
        copyTags[findTag].photos.splice(id,1)
        setTags(copyTags)
        setSelectedPhoto(null)
        localStorage.setItem("tagsData",JSON.stringify(copyTags))
    }
    
    const [{isDragging},drag] = useDrag(()=>({
        type: "image",
        item:{photo:photo},
        collect: (monitor)=>({
            isDragging: !!monitor.isDragging(),
        })
    }))

  return (
    <div
     className={isGallery ?style.gallery:style.tags} 
     key={photo?.id}>
        <img ref={isGallery?drag:null} className={!isGallery?style.photoInAlbum:null} src={photo?.download_url}
        style={{border:isDragging?"2px solid red":null}}
         onClick={
            ()=>{
            setSelectedPhoto({photo,isActive:true});
            setSelectedTag(null)}
            }/>
            <div ref={menuRef} className={style.listTags}>
                {isMenuOpen?<Tags isMenuOpen={isMenuOpen}/>:""}
            </div>
        <div className={style.photoNameAndIcon}>
            <p className={style.fontAuthor}>{photo?.author}</p>
            <div>
            {isGallery?<BsTag onClick={openMenuTags}/>:""}
            </div>
        </div>
            {!isGallery?<VscTrash onClick={deletePhoto}/>:""}
    </div>
  )
}
