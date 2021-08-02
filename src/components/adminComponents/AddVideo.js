import React from 'react';
import { uploadFile } from 'react-s3';
import axios from 'axios';
import "./addvideo.css";
import progress_img from "../../assets/progressIMG.gif";

const S3_BUCKET = '';
const REGION = '';
const ACCESS_KEY = '';
const SECRET_ACCESS_KEY = '';

class AddVideo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            progressState : 'none'
        }

        this.fileData = this.fileData.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.fileSizeConverter = this.fileSizeConverter.bind(this);
    }

    config = {
        bucketName: S3_BUCKET,
        region: REGION,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    }

    handleFileInput = (e) => {
        // setSelectedFile(e.target.files[0]);
        this.setState({ selectedFile: e.target.files[0] })
    }
    fileSizeConverter(sizeInBytes) {
        return (sizeInBytes / 1048576).toFixed(2) + " MB";
    }

    handleUpload = async (file) => {
        this.setState({progressState : 'block'});
        uploadFile(file, this.config)
            .then(data => {
                this.setState({progressState : 'none'});
                console.log(data);

                //axios started here
                const fileDetails = {
                    "file_url": data.location,
                    "file_name": data.key,
                    "file_type": file.type,
                    "file_date_time": new Date().toISOString(),
                    "file_size": this.fileSizeConverter(file.size),
                    "uploaded_by_id": "admin_hard_coded" //later I will add admin_id here
                }

                axios.post("http://localhost:8080/addVideo", fileDetails).then(() => {
                    window.alert("Uploaded Successfully");
                    window.location.reload();
                });//axios ended here

            })
            .catch(err => console.error(err))
    }

    fileData(selectedFile) {
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
    


    render() {

        return (
            <div>
                <div id="stars"></div>
                <div class="card text-center border border-warning">
                    <div class="card-header bg-warning text-dark">
                        Upload
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Upload New Video File Here</h5>
                        <input className="form-control" type="file" onChange={this.handleFileInput} />
                        <br />
                        <div className="myProgress" style={{display : this.state.progressState}}>
                            <img src={progress_img} alt="progress-img" width="150" height="150" />
                        </div>
                        <button class="btn btn-success btn-width" onClick={() => this.handleUpload(this.state.selectedFile)}>
                            Upload!
                        </button>
                    </div>
                    <div class="card-footer bg-warning text-dark">
                        {this.fileData(this.state.selectedFile)}
                    </div>
                </div>
            </div>
        )
    }
}

export default AddVideo;