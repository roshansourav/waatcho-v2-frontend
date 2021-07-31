import React from 'react';
import axios from 'axios';
import './GetAllVideoList.css';

export default class GetAllVideoList extends React.Component {
    state = {
        videos: []
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/getAllVideoList`)
            .then(res => {
                const videos = res.data;
                this.setState({ videos });
            })
    }

    //   deleteRow(id, e){  
    //     axios.delete(`http://localhost:8080/delete/${id}`)  
    //       .then(res => {  
    //         window.alert("Deleted Successfully");  

    //         const videos = this.state.videos.filter(item => item.id !== id);  
    //         this.setState({ videos });  
    //       })  

    //   }  

    render() {
        return (
            <div>
                {/* <div id="stars"></div> */}
                <table className="table table-bordered">
                    <thead>
                        <tr className="text-center">
                            <td><b>File Name</b></td>
                            <td><b>File Type</b></td>
                            <td><b>File Size</b></td>
                            <td><b>Upload Date</b></td>
                            <td><b>Uploaded By</b></td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.videos.map(
                                video =>
                                    <tr key={video.id} className="text-center">
                                        <td>{video.file_name}</td>
                                        <td>{video.file_type}</td>
                                        <td>{video.file_size}</td>
                                        <td>{video.file_date_time}</td>
                                        <td>{video.uploaded_by_id}</td>

                                        {/* <td>
                                            <button className="btn btn-danger" onClick={(e) => this.deleteRow(video.id, e)}>Delete</button>
                                        </td> */}
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}