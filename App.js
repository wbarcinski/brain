import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'c775b8e9fa9d4bd18c9197f9c5412617'
});

const particlesOptions = {
  particles: {
    number: {
      value:  50,
      density: {
        enable: true,
        value_area: 800
     }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin'

    }
  }

  // handleKeyPress = (event) =>{
  //   if (event.key === 'Enter') {
  //     console.log('do validate');
  //     }
      
  //  }

  calculateFaceLocation = (data) =>{

    // console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // console.log(clarifaiFace);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    console.log(clarifaiFace.bottom_row);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }


  onInputChange = (event) =>{
    console.log(event.target.value);
    this.setState({input: event.target.value})    
  }

  onButtonSubmit =() => {
    this.setState({imageUrl: this.state.input })
    console.log('click');
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", 
      this.state.input)
    .then(response => this.displayFaceBox (this.calculateFaceLocation(response)))
    .catch(error => console.log(error))  
    // function(response) {
      // do something with response
      // console.log(response)
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
       // this.calculateFaceLocation(response);
    
    // function(err) {
      // there was an error
  }
  
  onRouteChange = (route) => {
    this.setState({route: route});      
  }

  

  render() {
    return (
      <div className="App">
        <Particles className="particles"
         params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange}/>
        {this.state.route === 'signin'
        ? <Signin onRouteChange={this.onRouteChange}/>
        : <div> <Logo/>
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
          box={this.state.box}
          imageUrl = {this.state.imageUrl}
        />
        </div>
      }
      </div>
    );
  }
}

export default App;
