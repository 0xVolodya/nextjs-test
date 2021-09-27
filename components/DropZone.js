import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function MyDropzone(props) {
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const onDrop = useCallback(async acceptedFiles => {
    const converted = await Promise.all(acceptedFiles.map(async file => {
      const base64 = await toBase64(file)
      return base64
    }))
    props.uploadData(converted)
  }, [props.data])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="drop-zone">
      <div {...getRootProps()} className="drop-zone--inside">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag photos here</p>
        }
      </div>
    </div>
  )
}

