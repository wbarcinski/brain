import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
	return(
		<div>

			<p className ='f3'>
				{'This Magic Brain will detect faces in your pictures.'}
			</p>
			<div className='ma2 ph4 pv4 shadow-2 form center '>
				<div className=' center '>
					<input 
						className ='f4  fl w-70 center '
						type='text' 
						onChange={onInputChange}
					/>
					
					<button 
						className ='w-30 grow f4 link center dib white bg-light-purple'
						onClick = {onButtonSubmit}
						>Detect</button>
				</div>
			</div>
			
			
		</div>
		


	);
}
export default ImageLinkForm;
