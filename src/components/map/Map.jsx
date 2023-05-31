import { useState, useRef, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { mapDataAtom } from '../../atoms/mapDataAtom';
import { defaultValuesAtom } from '../../atoms/defaultValuesAtom';

export default function Map() {
	const [coordinates, setCoordinates] = useState({x: 0, y: 0});
	const [centerPointCoordinates, setCenterPointCoordinates] = useState({x: 0, y: 0});
	const [relativeCoordinates, setRelativeCoordinates] = useState({x: 0, y: 0});
	const [direction, setDirection] = useState(null);
	const [hypotenuse, setHypotenuse] = useState(null);
	
	const [mapData, setMapData] = useRecoilState(mapDataAtom);
	const defaultValues = useRecoilValue(defaultValuesAtom);
	
	const centerPointRef = useRef();
	
	function getTanFromDegrees(degrees) {
		return Math.tan(degrees * Math.PI / 180);
	}
	
	useEffect(() => {
		const centerPoint = centerPointRef.current;
		setCenterPointCoordinates({
			x: centerPoint.offsetLeft + (centerPoint.offsetWidth / 2),
			y: centerPoint.offsetTop + (centerPoint.offsetHeight / 2)
		});
	}, []);
	
	useEffect(() => {
		if (direction !== null) {
			setMapData({
				x: relativeCoordinates.x,
				y: relativeCoordinates.y,
				direction: direction,
				distance: hypotenuse,
				defaultDistance: null
			});
		}
	}, [relativeCoordinates]);
	
	function handleMouseMove(e) {
		// Offset to center of point
		const centerPoint = centerPointRef.current;
		//console.dir(centerPoint.offsetLeft + (centerPoint.offsetWidth / 2));
		//console.dir(centerPoint.offsetTop + (centerPoint.offsetHeight / 2));
		setCoordinates({x: e.clientX, y: e.clientY});
		
		const relativeX = e.clientX - centerPointCoordinates.x;
		const relativeY = centerPointCoordinates.y - e.clientY;
		setRelativeCoordinates({x: relativeX, y: relativeY});
		setHypotenuse(Math.floor(Math.hypot(relativeX, relativeY)));
		
		const currentSlope = relativeY / relativeX;
		
		if (0 < relativeX && getTanFromDegrees(45 / 2) <= currentSlope && currentSlope < getTanFromDegrees((45 / 2) + 45)) {
			setDirection("1")
		} else if (0 < relativeX && ( 0 <= currentSlope && currentSlope < getTanFromDegrees(45 / 2) || getTanFromDegrees(-45 / 2) <= currentSlope && currentSlope < 0)) {
			setDirection("2")
		} else if (0 < relativeX && currentSlope < getTanFromDegrees(-45 / 2) && getTanFromDegrees(-((45 / 2) + 45)) <= currentSlope)  {
			setDirection("3")
		} else if ((relativeY < 0 && relativeX === 0) || relativeY < 0  && ( currentSlope < getTanFromDegrees(-((45 / 2) + 45)) && getTanFromDegrees(-90) <= currentSlope || getTanFromDegrees((45 / 2) + 45) <= currentSlope && currentSlope <= getTanFromDegrees(90))) {
			setDirection("4")
		} else if (getTanFromDegrees(45 / 2) <= currentSlope && currentSlope < getTanFromDegrees((45 / 2) + 45)) {
			setDirection("5")
		} else if (0 <= currentSlope && currentSlope < getTanFromDegrees(45 / 2) || getTanFromDegrees(-45 / 2) <= currentSlope && currentSlope < 0) {
			setDirection("6")
		} else if (currentSlope < getTanFromDegrees(-45 / 2) && getTanFromDegrees(-((45 / 2) + 45)) <= currentSlope) {
			setDirection("7")
		} else if (currentSlope < getTanFromDegrees(-((45 / 2) + 45)) && getTanFromDegrees(-90) < currentSlope || getTanFromDegrees((45 / 2) + 45) <= currentSlope) {
			setDirection("8")
		} else {
			setDirection("---")
		}
		
		/*if (0 < relativeY) {
			if (0 < relativeX) {
				setDirection("DOWN LEFT")
			} else {
				setDirection("DOWN")
			}
			if (getTanFromDegrees(45 / 2) < slope && slope < getTanFromDegrees((45 / 2) + 45)) {
				setDirection("VERY COOL")
			}
		} else {
			setDirection("UP")
		}*/
	}
	
	function handleMouseEnter() {
		console.log("MOUSE ENTER")
	}
	
	function handleMouseLeave() {
		console.log("MOUSE LEAVE")
		setMapData(null)
		setCoordinates({x: 0, y: 0})
		setRelativeCoordinates({x: 0, y: 0})
		setHypotenuse(0)
		setDirection(0)
	}
	
	return (
		<div style={{marginTop: "280px"}}>
			{/*<p style={{color: "white", zIndex: 100}}>
				x:{coordinates.x} - y:{coordinates.y} - Center X:{centerPointCoordinates.x} - Center Y: {centerPointCoordinates.y}
			</p>
			<p>
				Relative X: {relativeCoordinates.x} - Relative Y: {relativeCoordinates.y}
			</p>
			<p>
				Hypotenuse: {hypotenuse ? hypotenuse : "NO HYPETUNUSE SET"}
			</p>
			<p>
				Current default distance: {defaultValues ? defaultValues.distance : "NO DEFAULT"}
			</p>
			<p>{!direction ? "NO DIRECTION SET":  direction}</p>
			*/}
			<p>Moving on map simulation</p>
			<div
				onMouseMove={(e) => handleMouseMove(e)}
				onMouseEnter={() => handleMouseEnter()}
				onMouseLeave={() => handleMouseLeave()}
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
				<div
					ref={centerPointRef}
					style={{
						width: "16px",
						height: "16px",
						backgroundColor: "red",
						border: "3px solid pink",
						borderRadius: "50%"
					}}
				>
				</div>
			</div>
		</div>
	);
}