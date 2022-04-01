import './dragDrop.css';
import Gallery from '../gallery/Gallery';
import Albums from '../albums/Albums';
import CreateTags from '../createTags/CreateTags';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

export default function DragDrop() {
  return (
      <DndProvider backend={HTML5Backend}>
        <div className='dragDrop'>
            <CreateTags/>
            <div className="galleryAlbums">
            <Gallery />
            <Albums/>
            </div>
        </div>
      </DndProvider>
  )
}
