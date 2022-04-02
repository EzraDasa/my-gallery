import { useContext } from 'react'
import { userContext } from '../context/Context'
import style from './tags.module.css'
import Tag from '../tag/Tag'

export default function Tags({ isMenuOpen }) {
  const { tags, setTags, selectedPhoto,setSelectedPhoto, selectedTag,setSelectedTag } = useContext(userContext)

  const deleteTag = (index) => {
    const copyTags = [...tags]
    copyTags.splice(index, 1)
    setTags(copyTags)
    localStorage.setItem('tagsData', JSON.stringify(copyTags))
  }

  const addingPhoto = () => {
    const copyTags = [...tags]
    copyTags.find((tag, i) => {
      if (tag.name === selectedTag) {
        copyTags[i].photos.push(selectedPhoto.photo)
      }
    })
    setTags(copyTags)
    localStorage.setItem('tagsData', JSON.stringify(copyTags))
    setSelectedPhoto(null)
    setSelectedTag(null)
  }

  return (
    <div className={style.containerTags}>
      {tags.length ? (
        <ul>
          {!isMenuOpen ? (
            <li>
              {selectedPhoto?.isActive
                ? `${selectedPhoto.photo.author}- Assign `
                : 'Available '}
              tags
            </li>
          ) : null}
          {tags.map((tag, i) => {
            return (
              <Tag
                key={i}
                tag={tag}
                id={i}
                isMenuOpen={isMenuOpen}
                deleteTag={deleteTag}
              />
            )
          })}
          {isMenuOpen ? <button onClick={addingPhoto}>Apply</button> : null}
          {selectedPhoto?.isActive ? (
            <button onClick={addingPhoto}>Apply</button>
          ) : null}
        </ul>
      ) : (
        <p>Create tag</p>
      )}
    </div>
  )
}
