import React from 'react';
import axios from 'axios';
import "./videoframe.css";
import PlayVideo from "./PlayVideo";


export default class VideoFrame extends React.Component {

    state = {
        videos: [],
        currentTrackIndex: 0
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/ListURL`)
            .then(res => {
                const videos = res.data;
                this.setState({ videos });
                console.log(videos.length);
            })
    }

    constructor() {
        super();
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handlePrev() {
        if(this.state.currentTrackIndex === 0){
            this.setState({currentTrackIndex : this.state.videos.length -1});
        }
        else{
            this.setState({currentTrackIndex : this.state.currentTrackIndex -1});
        }
    }

    handleNext() {
        if(this.state.currentTrackIndex === this.state.videos.length -1){
            this.setState({currentTrackIndex : 0});
        }
        else{
            this.setState({currentTrackIndex : this.state.currentTrackIndex + 1});
        }
    }


    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="d-flex">
                        <div className="p-2">
                            <button className="btn btn-primary custom" onClick={this.handlePrev} type="button">Prev</button>
                        </div>
                        <div className="ms-auto p-2">
                            <button className="btn btn-primary custom" onClick={this.handleNext} type="button">Next</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                    <PlayVideo videoURL={this.state.videos[this.state.currentTrackIndex]} />
                    </div>
                </div>
            </div>
            
        )
    }

}
