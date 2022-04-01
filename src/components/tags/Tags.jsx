import { useContext } from 'react';
import { userContext } from '../context/Context';
import style from './tags.module.css';
import Tag from '../tag/Tag';

export default function Tags({ isMenuOpen }) {
  const { tags, setTags, selectedPhoto, selectedTag } = useContext(userContext)

  const deleteTag = (index) => {
    const copyTags = [...tags]
    copyTags.splice(index, 1)
    setTags(copyTags)
  }

  const handleApply = () => {
    const copyTags = [...tags]
    copyTags.find((tag,i) => {
      if (tag.name === selectedTag) {
        copyTags[i].photos.push(selectedPhoto.photo)
      }
    })
    setTags(copyTags)
    localStorage.setItem("tagsData",JSON.stringify(copyTags))
  }

  return (
    <div className={style.containerTags}>
      {tags.length ? (
        <ul>
          {isMenuOpen ? (
            ''
          ) : (
            <li>
              {selectedPhoto?.isActive
                ? `${selectedPhoto.photo.author}- Assign `
                : 'Available '}
              tags
            </li>
          )}
          {tags.map((tag, i) => {
            return (
              <Tag key={i} tag={tag} i={i} isMenuOpen={isMenuOpen} deleteTag={deleteTag}/>
            )
          })}
          {isMenuOpen ? <button onClick={handleApply}>Apply</button> : ''}
          {selectedPhoto?.isActive 
          ? 
          <button onClick={handleApply}>Apply</button>
          : 
            null
          }
        </ul>
      ) : (
        <p>Create tag</p>
      )}
    </div>
  )
}
