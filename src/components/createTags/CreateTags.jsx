import axios from 'axios';
import { userContext } from '../context/Context';
import { useState, useEffect, useContext } from 'react';
import Tags from '../tags/Tags';
import style from './createTags.module.css';

export default function CreateTags() {
  const { tags, setTags,setSelectedPhoto } = useContext(userContext);
  const [tagName, setTagName] = useState('');
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios
      .get('colors.json')
      .then((res) => {
        setColors(res.data)
      })
      .catch((err) => {
        throw err
      })
  }, [])

  const colorTag = () => {
      const colorChoice = colors[Math.floor(Math.random() * colors.length)]
      return colorChoice;
  }

  const createTag = () => {
    if (!tagName) {
      return;
    }
    const copyTags = [...tags]
    const color = colorTag()
    copyTags.push({ name:tagName, color, photos: [] })
    setTags(copyTags)
    localStorage.setItem("tagsData",JSON.stringify(copyTags))
    setTagName("")
  }

  return (
    <div className={style.containerTags}>
      <input
        type="text"
        className={style.inputTags}
        placeholder=' Tag name... '
        onFocus={()=>setSelectedPhoto(null)}
        onChange={(e)=>setTagName(e.target.value)}
        value={tagName}
      />
      <button onClick={createTag}>New tag</button>
      <Tags />
    </div>
  )
}
