import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return(
		<div className ='ma4 mt0'>
			<Tilt className='Tilt br3 ba border-width:2px shadow-2' options={{ max : 65, transition:true, reverse:false }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa3">
 					<img style={{paddingTop: '20px'}}alt='logo' src={brain}/> 
 				</div>
			</Tilt>
			
		</div>
		


	);
}
export default Logo;
