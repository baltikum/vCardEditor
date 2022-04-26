import React from 'react'
import './container.css'
function AddContactFile( { onFileAdded, onUploadFile } ) {
    
    function handleUploadFile(event) {
        onUploadFile(event)
    }

    function handleFileAdded(event) {
        onFileAdded(event)
    }

    return (
        <>
            <input type="file" className="button" onChange={handleFileAdded} />
            <button onClick={handleUploadFile} className="button">Upload</button>
        </>
    )
}
export default AddContactFile;
