import axios from 'axios';
import { userContext } from '../context/Context';
import { useState, useEffect, useContext } from 'react';
import Tags from '../tags/Tags';
import style from './createTags.module.css';

export default function CreateTags() {
  const { tags, setTags } = useContext(userContext);
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
    let colorChoice = '/c_'

    if (tagName.lastIndexOf(colorChoice) > 0) {
      let color = tagName.lastIndexOf(colorChoice) + colorChoice.length
      color = tagName.substring(color)
      let copyTagName = tagName.substring(
        0,
        tagName.length - color.length - colorChoice.length,
      )
      setTagName(copyTagName)
      for (const key in colors) {
        if (key == color) {
          return (colorChoice = key)
        }
      }
      colorChoice = colors[Math.floor(Math.random() * colors.length)]
      return colorChoice
    } else {
      colorChoice = colors[Math.floor(Math.random() * colors.length)]
      return colorChoice
    }
  }

  const createTag = () => {
    if (!tagName) {
      return;
    }
    const copyTags = [...tags]
    const color = colorTag()
    let colorChoice = '/c_'
    const name =
      tagName.lastIndexOf(colorChoice) != -1
        ? tagName.substring(0, tagName.lastIndexOf(colorChoice))
        : tagName
    copyTags.push({ name, color, photos: [] })
    setTags(copyTags)
    localStorage.setItem("tagsData",JSON.stringify(copyTags))
  }

  return (
    <div className={style.containerTags}>
      <input
        type="text"
        className={style.inputTags}
        placeholder='exp:" tagName/c_color "'
        onBlur={(e) => {
          setTagName(e.target.value)
        }}
      />
      <button onClick={createTag}>New tag</button>
      <Tags />
    </div>
  )
}
