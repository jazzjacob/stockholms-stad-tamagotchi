import { useState } from 'react';

export default function Map() {
	const [coordinates, setCoordinates] = useState({x: 0, y: 0});
	
	function handleMouseMove(e) {
		console.log(e.clientX, e.clientY)
		setCoordinates({x: e.clientX, y: e.clientY});
	}
	
	return (
		<div style={{marginTop: "280px"}}>
			<p style={{color: "white", zIndex: 100}}>
				x:{coordinates.x} - y:{coordinates.y}
			</p>
			<div
			onMouseMove={(e) => handleMouseMove(e)}
			style={{
				width: "400px",
				height: "400px",
				backgroundColor: "dodgerblue",
				border: "2px solid white",
				outline: "1px solid gray",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}>
				<div style={{
					width: "16px",
					height: "16px",
					backgroundColor: "red",
					border: "3px solid pink",
					borderRadius: "50%"
				}}>
				</div>
			</div>
		</div>
	);
}