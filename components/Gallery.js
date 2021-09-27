import React, {useEffect, useState} from "react";

import DropZone from './DropZone'
import Home from './icons/Home'
import ArrowLeft from './icons/ArrowLeft'
import ArrowRight from './icons/ArrowRight'
import Eye from './icons/Eye'

export default function Gallery(props) {
  const [data, setData] = useState({})
  const [page, setPage] = useState(0)
  const [hoverStyle, setHoverStyle] = useState({display: 'none'});

  useEffect(async () => {
    const res = await fetch('/api/images')
    let result = await res.json()
    setData(result)
  }, [])

  const onTitleChange = async (e) => {
    const copy = Object.assign({}, data)
    copy.title = e.target.value
    setData(copy)
    await fetch(
      `/api/images`,
      {
        body: JSON.stringify(copy),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }
    )
  }

  const onDescriptionChange = async (e) => {
    const copy = Object.assign({}, data)
    copy.description = e.target.value
    setData(copy)
    await fetch(
      `/api/images`,
      {
        body: JSON.stringify(copy),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }
    )

  }

  const uploadData = async (images) => {
    const copy = Object.assign({}, data)
    copy.images = images
    setData(copy)

    await fetch(
      `/api/images`,
      {
        body: JSON.stringify(copy),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }
    )
  }

  const deleteData = async () => {
    data.images = []
    setData(data)
    await fetch(
      `/api/images`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE'
      }
    )
  }

  const images = (data.images || []).map((image64, i) => {
    return (
      <div className="image-wrapper" key={i}
           onMouseEnter={e => {
             const object = {}
             object[i] = {display: 'flex'}
             setHoverStyle(object);
           }}
           onMouseLeave={e => {
             const object = {}
             object[i] = {display: 'none'}
             setHoverStyle(object);
           }}
      >
        <div className="hover-image" style={hoverStyle[i] ? hoverStyle[i] : {display: 'none'}}><Eye/></div>
        <img src={image64} alt=""/>
      </div>
    )
  })

  const changeImagePage = (number) => {
    const length = images.length
    const ceil = Math.floor(length / 9)
    if (number === -1) {
      return setPage(ceil)
    }

    if (number === ceil + 1) {
      return setPage(0)
    }

    setPage(number)
  }

  return (
    <div className="main-wrapper">
      <div className="setting">
        <input className="setting--title" defaultValue={data.title} onChange={onTitleChange} placeholder="Title"/>
        <textarea rows={3} className="setting--title" value={data.description} onChange={onDescriptionChange}
                  placeholder="Description"/>
        <DropZone uploadData={uploadData} data={data}/>
        <button className="button-delete" onClick={deleteData}>Delete ALL photos</button>
      </div>

      <div className="gallery-wrapper">
        <div className="gallery-wrapper--title">{data.title}</div>
        <div className="gallery-wrapper--description">{data.description}</div>
        <div className="gallery">{getPaginatedImaged(images, page)}</div>

        <div className="navigation">
          <div className="navigation--icon" onClick={() => changeImagePage(page - 1)}><ArrowLeft/></div>
          <div className="navigation--icon" onClick={() => changeImagePage(0)}><Home/></div>
          <div className="navigation--icon" onClick={() => changeImagePage(page + 1)}><ArrowRight/></div>
        </div>
      </div>
    </div>)
}

const getPaginatedImaged = (images, page) => {
  return images.slice(page * 9, page * 9 + 9)
}

