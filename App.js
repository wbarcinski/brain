import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
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
      imageUrl:''

    }
  }

  handleKeyPress = (event) =>{
    if (event.key === 'Enter') {
      console.log('do validate');
    }
      
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
    .then(
    function(response) {
      // do something with response
      console.log(response)
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );


  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
         params={particlesOptions}
        />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
          imageUrl = {this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
