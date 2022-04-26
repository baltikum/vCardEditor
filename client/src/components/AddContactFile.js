import React from 'react'

function AddContactFile( { onFileAdded, onUploadFile } ) {
    
    function handleUploadFile(event) {
        onUploadFile(event)
    }

    function handleFileAdded(event) {
        onFileAdded(event)
    }

    return (
        <>
            <input type="file" onChange={handleFileAdded} />
            <button onClick={handleUploadFile}>Upload</button>
        </>
    )
}
export default AddContactFile;
