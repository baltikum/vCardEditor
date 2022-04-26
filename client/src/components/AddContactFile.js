import React, { useState } from 'react'
import axios from 'axios'

function AddContactFile() {
    const [file,setFile] = useState([])

    function handleUploadFile(event) {

        const formData = new FormData();

        formData.append('contacts',{file});

        console.log({file});

        axios.post('/load', formData);

    }
    function onFileAdded(event) {
        setFile({selectedFile:event.target.files[0]})
    }
    return (
        <>
            <input type="file" onChange={onFileAdded} />
            <button onClick={handleUploadFile}>Upload</button>



        </>
    )
}
export default AddContactFile;
