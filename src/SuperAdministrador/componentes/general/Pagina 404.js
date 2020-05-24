import React from 'react';

import Foto from '../../imagenes/404.png';

class PaginaNotFound extends React.Component {
	render() {
		return (
			<div style={{ background: "white", height: '100vh' }}>
				<div style={{ paddingTop: '9.375rem', paddingLeft: '30.25rem' }}>
					<img src={Foto} alt="" width="300px" height="300px" />
					<br />
					<div style={{paddingLeft:'5.938rem'}}>
						<a href='/' className='center'>Ir al inicio</a>
					</div>
				</div>
			</div>
		);
	}
}

export default PaginaNotFound;