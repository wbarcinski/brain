import React from 'react';
// import './App.css';

const FaceRecognition = ({imageUrl}) => {
	return(
		<div className = 'center ma'>
			<div className=' mt2'>
				<img  
					alt='' 
					src={imageUrl}
					width='500px'
					height='auto'
				/>
			</div>
		</div>
	);
}
export default FaceRecognition;
