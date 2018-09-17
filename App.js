import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
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
  constructor(props){
    super(props);
    this.state={
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }

    }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined

    }})

  }

  // componentDidMount(){
  //   fetch('http://localhost:3001/')
  //   .then(response => response.json())
  //   .then(console.log)

  // }

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

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input })
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
    
    .then(response => {

        if(response){
          fetch('http://localhost:3001/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id

            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            

        }

        this.displayFaceBox (this.calculateFaceLocation(response))
      })
    .catch(error => console.log(error))

    }  
    // function(response) {
      // do something with response
      // console.log(response)
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
       // this.calculateFaceLocation(response);
    
    // function(err) {
      // there was an error
  // }
  
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});      
  }

  

  render() {
    return (
      <div className="App">
        <Particles className="particles"
         params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>

        {this.state.route === 'home'
        ? <div> 
            <Logo/>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl = {this.state.imageUrl}
            />
          </div> 
        :(  
        this.state.route === 'signin'
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
         
      }
      </div>
    );
  }
}

export default App;
