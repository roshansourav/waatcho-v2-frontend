import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import axios from 'axios';
import "./addvideo.css";


const S3_BUCKET = 'BUCKET_NAME';
const REGION = 'REGION';
const ACCESS_KEY = 'KEY_ID';
const SECRET_ACCESS_KEY = 'SECRET_ACCESS';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const AddVideo = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    function fileSizeConverter(sizeInBytes){
        return (sizeInBytes/1048576).toFixed(2) + " MB";
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => {
                console.log(data);
                // window.alert(fileSizeConverter(file.size));

                //axios started here
                const fileDetails = {
                    "file_url": data.location,
                    "file_name": data.key,
                    "file_type": file.type,
                    "file_date_time": new Date().toISOString(),
                    "file_size": fileSizeConverter(file.size),
                    "uploaded_by_id": "admin_hard_coded"
                }
                
                axios.post("http://localhost:8080/addVideo", fileDetails).then(() => {
                    window.alert("Uploaded Successfully");
                    window.location.reload();
                });//axios ended here

            })
            .catch(err => console.error(err))
    }

    function fileData(selectedFile){
            if (selectedFile) {
    
                return (
                    <div>
                        <h5>File Details:</h5>
                        <p className="card-text">File Name: {selectedFile.name}</p>
                        <p className="card-text">File Type: {selectedFile.type}</p>
                    </div>
                );
            } else {
                return (
                    <div>
                        <br />
                        <h4>Choose before Pressing the Upload button</h4>
                    </div>
                );
            } 
    }


    return (

        <div>
            <div id="stars"></div>
            <div class="card text-center border border-warning">
                <div class="card-header bg-warning text-dark">
                    Upload
                </div>
                <div class="card-body">
                    <h5 class="card-title">Upload New Video File Here</h5>
                    <input className="form-control" type="file" onChange={handleFileInput} />
                    <br />
                    <button class="btn btn-success btn-width" onClick={() => handleUpload(selectedFile)}>
                        Upload!
                    </button>
                </div>
                <div class="card-footer bg-warning text-dark">
                    {fileData(selectedFile)}
                </div>
            </div>
        </div>


    );
}

export default AddVideo;