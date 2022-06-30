import React from 'react';
import axios from 'axios';
import './App.css';
import Webcam from "react-webcam";
import {useEffect} from "react"
function App() {
  const [file, setFile] = React.useState(null);
  const [data, setData] = React.useState({});
  const [stream, setStream] = React.useState(null);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        setStream(stream);
    })
    }, [])

  const fileChangedHandler = event => setFile(event.target.files[0]);

  const uploadHandler = () => {
    axios.post('https://aq9mlslujf.execute-api.us-east-1.amazonaws.com/FaceSimilarityPOC', file)
      .then((res) => console.log('check response :', setData(res.data[0])))
      .catch((e) => console.log('check error :', e))
  }
  
  return (
    <div className= 'body App'>
	  <h1 className= 'Mpp'>Face Similarity Score</h1>
      <input type="file" onChange={fileChangedHandler} />
      <button onClick={uploadHandler}>Upload</button>
      {Object.entries(data).length > 0 && <div>{ JSON.stringify(data)}</div>}
      <video
      src={stream}
      width="620">
</video>
    </div>
  );
}

export default App;
