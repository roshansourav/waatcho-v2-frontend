import React from 'react';
import './App.css';
import Welcome from './components/welcome/Welcome';
import VideoFrame from './components/userComponents/VideoFrame';
import AddVideo from './components/adminComponents/AddVideo';
import logo_waatcho from "./assets/logo_waatcho.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import GetAllVideoList from './components/userComponents/GetAllVideoList';
import { HouseFill, CloudPlusFill, CollectionPlayFill, CameraReelsFill } from 'react-bootstrap-icons';


function App() {
  return (
    <div className="App">
      <Router>
        
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link class="navbar-brand custom-animation" to="/">
                        &nbsp; &nbsp;
                        <img src={logo_waatcho} alt="logo_waatcho" width="30" height="30" />
                        &nbsp;
                        Waatcho</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item active">
                                <Link class="nav-link" to="/">{<HouseFill />} Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/AddVideo">{<CloudPlusFill />} Add New</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/VideoFrame">{<CollectionPlayFill />} Play Video</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/getAllVideoList">{<CameraReelsFill />} Videos List</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                <Route path="/getAllVideoList">
                        <GetAllVideoList />
                    </Route>
                    <Route path="/AddVideo">
                        <AddVideo />
                    </Route>
                    <Route path="/VideoFrame">
                        <VideoFrame />
                    </Route>
                    <Route path="/">
                        <Welcome />
                    </Route>
                </Switch>

            </Router>
    </div>
  );
}

export default App;
