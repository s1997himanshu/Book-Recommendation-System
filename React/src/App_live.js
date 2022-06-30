import React from 'react';
import axios from 'axios';
import './App.css';
import Webcam from "react-webcam";
function App() {
  const [file, setFile] = React.useState(null);
  const [data, setData] = React.useState({});

  const fileChangedHandler = event => setFile(event.target.files[0]);
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
  const uploadHandler = (img) => {
    axios.post('https://aq9mlslujf.execute-api.us-east-1.amazonaws.com/FaceSimilarityPOC', function(img))
      .then((res) => console.log('check response :', setData(res.data[0])))
      .catch((e) => console.log('check error :', e))
  }
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  }
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      uploadHandler(imageSrc)   // calling uploadHanlder fundction to trigger backend API
    },[webcamRef]);

  React.useEffect(() => {
    setInterval(() => {
      capture()
    }, 3000);   // 3000 means, capture function will be triggered after each 3 seconds
  });
  
  return (
    <div className= 'body App'>
	  <h1 className= 'Mpp'>Face Similarity Score</h1>
    {/* <input type="file" onChange={fileChangedHandler} /> */}
    <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
    <button onClick={capture}>Capture photo</button>
    {/* <button onClick={uploadHandler}>Upload</button> */}
      {Object.entries(data).length > 0 && <div>{ JSON.stringify(data)}</div>}
    </div>
  );
}

export default App;